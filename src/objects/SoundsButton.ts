import { Button } from "./Button";

export class SoundsButton extends Button {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, '')
        this.setMuteStyle(this.scene.game.sound.mute)
        this.setOrigin(0.5, 0.5)
        .setDepth(2)
        .on('pointerdown', () => {
            this.setMuteStyle(!this.scene.game.sound.mute)
            this.scene.game.sound.mute = !this.scene.game.sound.mute
        })
    }

    private setMuteStyle(mute: boolean) {
        if (!mute) {
            this.setStyle({
                backgroundColor: '#999'
            })
            this.setText('Sound: on')
        } else {
            this.setStyle({
                backgroundColor: '#777'
            })
            this.setText('Sound: off')
        }
    }
}