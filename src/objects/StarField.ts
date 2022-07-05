import * as Phaser from 'phaser'
import { randomDataGenerator } from '../../utils';
import { config } from '../config';

class Star extends Phaser.GameObjects.Ellipse {}

class StarField extends Phaser.GameObjects.Layer {
    constructor(scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[]) {
        super(scene, children)
    }
    generateField(width: number, height: number, density: number) {
        let step = 1 / density;
        for(let i = 0; i < width; i += step) {
            for (let j = 0; j < height; j += step) {
                const star = new Star(this.scene, 100, 100, 10, 10)
                configureStar(star)
                star.setDepth(2)
                star.setRandomPosition(i, j, step, step)
                this.add(star)
            }
        }
    }
}

function configureStar(star: Star) {
    let w = randomDataGenerator.between(config.star.sizeFrom, config.star.sizeTo)
    star.setDisplaySize(w, w)
    star.setFillStyle(config.star.colors[randomDataGenerator.between(0, config.star.colors.length)], Math.random())
}

function spawnStars(scene: Phaser.Scene) {
    const {width, height} = config.game.computedSize
    const stars = new StarField(scene)
    stars.generateField(width, height, 0.05)
    scene.add.existing(stars)
    return stars
}

export {
    spawnStars,
    Star,
    StarField
}