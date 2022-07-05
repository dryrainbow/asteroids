import { scoreToText } from "../../utils"

class Score extends Phaser.GameObjects.Text {
    currentScore: number = 0
    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, '0000', {color: '#fff'})
        this.scene.add.existing(this)
    }

    get textScore(): string {
        return scoreToText(this.currentScore)
    }

    addScore(count: number = 1) {
        this.currentScore += count
        this.setText(this.textScore)
    }
}

export {Score}