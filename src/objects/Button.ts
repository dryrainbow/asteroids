
class Button extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
        super(scene, x, y, text, {
            color: '#fff',
            font: "bold 20px Arial"
        })

        this.setPadding(10)
        .setStyle({ backgroundColor: '#999' })
        .setInteractive({ useHandCursor: true })
        this.scene.add.existing(this)
    }
}

export {
    Button
}
