import * as Phaser from "phaser";
import { config } from "../config";
import type { Asteroid } from "./AsteroidField";
import throttle from 'lodash.throttle'

const { Vector2 } = Phaser.Math


export enum ShipEvents {
    shot = 'shot',
    reduceHealth = 'reduceHealth',
    destroyed = 'destroyed'
}
export class SpaceShip extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    health: number
    nearlyHitedAstoroids: Asteroid[] = []

    customState = {
        curVel: 0,
        velDelta: 0.001,
        maxVel: config.ship.velocity,
        maxRotationVel: config.ship.rotationVelocity,
        curRotationVel: 0,
        shotLock: false
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, health: number) {
        super(scene, x, y, texture)
        this.setDisplaySize(config.ship.size, config.ship.size)
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setDepth(1)
        this.addEvents()
        this.setCollideWorldBounds(true, 0.5, 0.5)
        this.setCircle(this.width / 2)
        this.health = health
    }

    update(_: number, dt: number) {
        this.handleInput()
        this.handleMovement(dt)
    }

    hit(asteroid: Asteroid) {
        if (this.nearlyHitedAstoroids.includes(asteroid)) return;
        this.health -= asteroid.damage
        this.emit(ShipEvents.reduceHealth, this)
        if (this.health <= 0) {
            this.emit(ShipEvents.destroyed)
            this.destroy()
            return
        }
        this.nearlyHitedAstoroids.push(asteroid)
        setTimeout(() => {
            let i = this.nearlyHitedAstoroids.indexOf(asteroid)
            this.nearlyHitedAstoroids.splice(i, 1)
        }, 1000)
    }

    private addEvents() {
        this.cursors.space.on('down', throttle(this.shot.bind(this), 1000, {trailing: false}))
    }

    private handleInput() {
        if (this.cursors.up.isDown) {
            this.customState.curVel = this.customState.curVel >= this.customState.maxVel ? this.customState.maxVel : this.customState.curVel + this.customState.velDelta
        } else {
            this.customState.curVel = this.customState.curVel <= 0 ? 0 : this.customState.curVel - this.customState.velDelta
        }

        if (this.cursors.left.isDown) {
            this.customState.curRotationVel = -this.customState.maxRotationVel
        } else if (this.cursors.right.isDown) {
            this.customState.curRotationVel = this.customState.maxRotationVel
        } else {
            this.customState.curRotationVel = 0
        }
    }

    private handleMovement(dt: number) {
        const { curRotationVel, curVel } = this.customState
        let rot = this.rotation
        let curVec = new Vector2(Math.sin(rot), Math.cos(rot))
        curVec = curVec.multiply(new Vector2(curVel * dt, -curVel * dt))
        this.x = this.x + curVec.x
        this.y = this.y + curVec.y
        this.setRotation(this.rotation + curRotationVel * dt)
    }

    private shot(): void {
        this.emit(ShipEvents.shot, this)
    }
}