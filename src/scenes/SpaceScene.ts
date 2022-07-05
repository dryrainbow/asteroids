import * as Phaser from 'phaser'
import spaceShip from '../assets/spaceShip.png'
import asteroid from '../assets/asteroid.png'
import shot from 'url:../assets/sounds/shot.mp3'
import explosion from 'url:../assets/sounds/explosion.mp3'
import hit1 from 'url:../assets/sounds/hit_1.mp3'
import hit2 from 'url:../assets/sounds/hit_2.mp3'
import hit3 from 'url:../assets/sounds/hit_3.mp3'

import bullet from '../assets/bullet.png'
import { Asteroid, AsteroidField } from '../objects/AsteroidField';
import { ShipEvents, SpaceShip } from '../objects/SpaceShip';
import { spawnStars, StarField } from '../objects/StarField';
import { BaseScene } from './BaseScene';
import { Bullet, BulletLayer } from '../objects/Bullet';
import { HealthBar } from '../objects/HealthBar';
import { config } from '../config';
import { Score } from '../objects/Score';
import { randomDataGenerator } from '../../utils'

class SpaceScene extends BaseScene {
    spaceShip?: SpaceShip;
    stars?: StarField;
    asteroids?: AsteroidField
    bullets?: BulletLayer
    healthbar?: HealthBar
    score?: Score
    spawnInterval: number= -1;

    shotSound?: Phaser.Sound.BaseSound
    explosion?: Phaser.Sound.BaseSound
    hits: Phaser.Sound.BaseSound[] = []

    constructor() {
        super('SpaceScene')
    }
    
    create() {
        this.spaceShip = new SpaceShip(this, 200, 200, 'spaceShip', config.ship.health)
        this.stars = spawnStars(this)
        this.asteroids = new AsteroidField(this)
        this.bullets = new BulletLayer(this)
        this.healthbar = new HealthBar(this, 30, 15, this.spaceShip.health)
        this.score = new Score(this, config.game.computedSize.width - 60, 15)
        this.shotSound = this.sound.add('shot')
        this.explosion = this.sound.add('explosion')
        this.hits.push(
            this.sound.add('hit1'),
            this.sound.add('hit2'),
            this.sound.add('hit3'),
        )
        this.initEvents()
        this.initPhisycs()
    }

    update(time: number, delta: number): void {
        super.update(time, delta)
        if (this.spawnInterval === -1) {
            this.spawnInterval = setTimeout(()=>{
                this.asteroids?.spawnAsteroids(2, new Phaser.Math.Vector2(this.spaceShip?.x, this.spaceShip?.y))
                this.spawnInterval = -1
            }, this.asteroids?.spawnIntervalTime || 1000)
        }
    }

    preload() {
        this.load.image('spaceShip', spaceShip)
        this.load.image('asteroid', asteroid)
        this.load.image('bullet', bullet)
        this.load.audio('shot', shot)
        this.load.audio('explosion', explosion)
        this.load.audio('hit1', hit1)
        this.load.audio('hit2', hit2)
        this.load.audio('hit3', hit3)
    }

    initEvents() {
        this.spaceShip?.on(ShipEvents.shot, (ship: SpaceShip)=>{
            this.bullets?.spawnBullet(ship)
            if (this.shotSound) {
                this.shotSound.play()
            }
        })

        this.spaceShip?.on(ShipEvents.reduceHealth, (ship: SpaceShip)=> {
            this.healthbar?.updateHealth(ship.health)
        })

        this.spaceShip?.on(ShipEvents.destroyed, ()=> {
            this.scene.pause(this)
            this.scene.run('GameOver', {score: this.score?.currentScore})
        })
    }

    initPhisycs() {
        if (!this.asteroids || !this.bullets || !this.spaceShip) return;
        this.physics.add.collider(this.asteroids, this.bullets, (asteroid, bullet)=>{
            this.handleAsteroidExplosion(asteroid as Asteroid, bullet as Bullet)
        })
        this.physics.add.collider(this.spaceShip, this.asteroids, (spaceShip, asteroid)=>{
            this.spaceShip?.hit(asteroid as Asteroid)
            this.hits[randomDataGenerator.between(0, 2)]?.play()
        })
        this.physics.add.collider(this.asteroids, this.asteroids)
    }

    private handleAsteroidExplosion(asteroid: Asteroid, bullet: Bullet) {
        asteroid.destroy()
        bullet.destroy()
        this.score?.addScore(1)
        this.explosion?.play()
        this.asteroids?.setScore(this.score?.currentScore || 0)
    }
}

export { SpaceScene }