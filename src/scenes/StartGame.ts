import { config } from "../config"
import { Button } from "../objects/Button"
import { Mask } from "../objects/Mask"
import { SoundsButton } from "../objects/SoundsButton"
import { spawnStars } from "../objects/StarField"

class StartGame extends Phaser.Scene {

    constructor() {
        super('StartGame')
    }

    create() {
        const {width, height} = config.game.computedSize
        new Mask(this)
        let title = this.add.text(0, (height / 10) * 4, "Astoroids", {
            font: "bold 50px Arial",
            align: 'center',
            fixedWidth: width
        })
        let subtitle = this.add.text(0, (height / 10) * 9, "by @dryrainbow", {
            font: "bold 14px Arial",
            align: 'center',
            fixedWidth: width
        })


        let start = new Button(this, width / 2, (height / 10) * 6.5, 'START')
        start.setOrigin(0.5, 0.5)
            .on('pointerdown', () => {
                this.scene.start('SpaceScene')
            })
            .setDepth(2)
        let sound = new SoundsButton(this, width / 2, (height / 10) * 8,)
        spawnStars(this).setDepth(1)
    }
}

export {
    StartGame
}