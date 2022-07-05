import { config } from "../config";

class Mask extends Phaser.GameObjects.Rectangle{
    constructor(scene: Phaser.Scene) {
        super(scene,0, 0, config.game.computedSize.width, config.game.computedSize.height, 0x0, 0.4)
        this.setOrigin(0, 0)
        this.scene.add.existing(this)
    }
}

export {
    Mask
}