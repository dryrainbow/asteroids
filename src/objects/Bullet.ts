import Phaser from 'phaser'
import { isOutsideOfView } from '../../utils'
import { config } from '../config'
import type { SpaceShip } from './SpaceShip'


class Bullet extends Phaser.Physics.Arcade.Sprite {
    direction: Phaser.Math.Vector2 = new Phaser.Math.Vector2()
    speed: number = 0

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setDisplaySize(config.bullet.size, config.bullet.size)
        this.setCircle((this.width / 2) * config.bullet.hitbox)
    }

    setSpeed(speed: number) {
        this.speed = speed
    }
    setDirection(dir: Phaser.Math.Vector2) {
        this.direction = dir.normalize()
    }
    update(_: number, dt: number) {
        const speedVec = new Phaser.Math.Vector2(this.speed, this.speed).multiply(this.direction)
        this.setVelocity(speedVec.x, speedVec.y)

        if (isOutsideOfView(this)) {
            this.destroy()
        }
    }
}

function spawnBullet(scene: Phaser.Scene, position: Phaser.Math.Vector2, direction: Phaser.Math.Vector2, speed: number) {
    const bullet = new Bullet(scene, position.x, position.y, 'bullet')
    bullet.setSpeed(speed)
    bullet.setDirection(direction)
    scene.add.existing(bullet)
    return bullet
}

class BulletLayer extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, children)
        this.scene.add.existing(this)
    }
    update(...args: any[]): void {
        this.children.getArray().forEach(child=>child.update(...args))
    }
    spawnBullet(ship: SpaceShip){
        const rot = ship.rotation
        let direction = new Phaser.Math.Vector2(Math.sin(rot), -Math.cos(rot))
        this.add(spawnBullet(this.scene, new Phaser.Math.Vector2(ship.x, ship.y), direction, config.bullet.speed))
    }
}

export {
    BulletLayer,
    spawnBullet,
    Bullet
}