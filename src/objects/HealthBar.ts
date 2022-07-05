import { config } from "../config";

class HealthBar extends Phaser.GameObjects.Rectangle {
    healthLine: Phaser.GameObjects.Rectangle
    maxHealth: number
    currentHealth: number
    constructor(scene: Phaser.Scene, x: number, y: number, maxHealth: number) {
        super(scene, x, y, config.healthBar.width, config.healthBar.height)
        this.setOrigin(0, 0)
        this.setStrokeStyle(1, config.healthBar.borderColor)
        this.healthLine = new Phaser.GameObjects.Rectangle(scene, x, y, this.width, this.height)
        this.healthLine.setOrigin(0, 0)
        this.healthLine.setFillStyle(config.healthBar.colors[0])
        this.scene.add.existing(this)
        this.scene.add.existing(this.healthLine)
        this.maxHealth = maxHealth
        this.currentHealth = maxHealth
    }

    updateHealth(health: number) {
        this.currentHealth = health
        this.healthLine.width = Math.floor(config.healthBar.width * (this.currentHealth / this.maxHealth))
        const healthColorIndex = Math.min(Math.floor(this.maxHealth / this.currentHealth), 3)
        console.log(healthColorIndex - 1)
        this.healthLine.setFillStyle(config.healthBar.colors[healthColorIndex - 1])
    }
}

export {
    HealthBar
}