import { config } from "../config"
import { scoreToText } from "../../utils"
import { Button } from "../objects/Button"
import { Mask } from "../objects/Mask"
import gameOver from 'url:../assets/sounds/game_over.mp3'
import { SoundsButton } from "../objects/SoundsButton"

type TProps = {
    score: number
}

class GameOver extends Phaser.Scene {
    score: number = 0
    gameOver?: Phaser.Sound.BaseSound

    constructor() {
        super('GameOver')
    }
    init({score}: TProps) {
        this.score = score
    }

    preload() {
        this.load.audio('gameOver', gameOver)

    }

    create() {
        const {width, height} = config.game.computedSize
        new Mask(this)
        let title = this.add.text(0, (height / 10) * 3, "Game Over", {
            font: "bold 50px Arial",
            align: 'center',
            fixedWidth: width
        })

        let score = this.add.text(0, (height / 10) * 4.5, `Score: ${scoreToText(this.score)}`, {
            font:  "bold 40px Arial",
            align: 'center',
            fixedWidth: width
        })

        let restart = new Button(this, width / 2, (height / 10) * 7, 'RESTART')
        restart.setOrigin(0.5, 0.5)
        restart.on('pointerdown', () => {
            this.scene.start('SpaceScene')
        })

        let sounds = new SoundsButton(this, width / 2, (height / 10) * 8.5)

        this.gameOver = this.sound.add('gameOver')
        this.gameOver.play()
    }
}

export {
    GameOver
}