import * as Phaser from 'phaser'
import { getRandomOutsidePosition, isOutsideOfView, randomDataGenerator, Side } from '../../utils'
import { config } from '../config'

class Asteroid extends Phaser.Physics.Arcade.Sprite {
    private direction?: Phaser.Math.Vector2;
    readonly damage: number;

    constructor(scene: Phaser.Scene, x: number, y: number, image: string) {
        super(scene, x, y, image)
        let w = randomDataGenerator.between(config.asteroid.sizeFrom, config.asteroid.sizeTo)
        this.setDisplaySize(w, w)
        this.scene.physics.add.existing(this)
        this.scene.add.existing(this)
        this.setCircle(this.width / 2)
        this.setBounce(1, 1)
        this.damage = config.asteroid.damage * w
    }

    update(_: number, dt: number): void {
        this.handleMovement(dt)
        this.handleApearence()
        this.rotate(dt)
    }

    setRandomPositionOutside(playerPosition: Phaser.Math.Vector2) {
        const {position, side} = getRandomOutsidePosition(this.displayWidth)
        this.setPosition(position.x, position.y)
        let angle = Phaser.Math.Angle.BetweenPoints(position, playerPosition)
        this.direction = position.clone().rotate(angle).normalize()
    }

    private handleApearence() {
        if (isOutsideOfView(this, this.displayHeight)) {
            this.destroy()
        }
    }
    private handleMovement(dt: number) {
        if (this.direction) {
            let dX = this.direction?.x * (config.asteroid.speed * dt)
            let dY = this.direction?.y * (config.asteroid.speed * dt)
            this.setAcceleration(dX, dY)
        }
    }
    private rotate(dt: number) {
        const {rotationSpeedFrom, rotationSpeedTo} = config.asteroid
        this.setRotation(this.rotation + (randomDataGenerator.between(rotationSpeedFrom, rotationSpeedTo) / 1000) * dt)
    }
}

function spawnAsteroid(scene: Phaser.Scene, playerPosition: Phaser.Math.Vector2) {
    const asteroid = new Asteroid(scene, 200, 200, 'asteroid')
    asteroid.setDepth(2)
    asteroid.setRandomPositionOutside(playerPosition)
    scene.add.existing(asteroid)
    return asteroid
}

class AsteroidField extends Phaser.GameObjects.Group {
    private score: number = 0;

    constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, children)
        scene.add.existing(this)
    }

    get spawnIntervalTime() {
        return Math.min(1000 - this.score * 10 * config.asteroid.spawnSpeed, 300)
    }

    spawnAsteroids(count: number = 1, playerPosition: Phaser.Math.Vector2) {
        for (let i = 0; i < count; i ++) {
            const asteroid = spawnAsteroid(this.scene, playerPosition)
            this.add(asteroid)
        }
    }
    update(...args: any[]): void {
        this.children.getArray().forEach(child=>child.update(...args))
    }

    setScore(score: number) {
        this.score = score
    }
}

export{ 
    Asteroid,
    spawnAsteroid,
    AsteroidField
}