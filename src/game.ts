import * as Phaser from 'phaser'
import { config } from './config'
import { GameOver } from './scenes/GameOver'
import { SpaceScene } from './scenes/SpaceScene'
import { StartGame } from './scenes/StartGame'



class BootGame extends Phaser.Scene {
    constructor() {
        super("BootGame")
    }


    preload() {

    }

    create() {
        this.scene.start("SpaceScene")
    }
}



const gameConfig: Phaser.Types.Core.GameConfig = {
    ...config.game,
    backgroundColor: '#252850',
    scene: [StartGame, SpaceScene, GameOver],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

window.addEventListener('load', ()=>{
    const game = new Phaser.Game(gameConfig)
    window.focus()
    const canvas = document.querySelector('canvas')
    if (!canvas) return;
    initResizeObserver(canvas)
})

const initResizeObserver = (canvas: HTMLElement) => {
    const obs = new ResizeObserver((elements) => {
        if (!elements[0]) return
        const {width, height} = elements[0].contentRect
        const windowRatio = width / height
        const canvasRatio =  config.game.computedSize.width / config.game.computedSize.height
        if (windowRatio < canvasRatio) {
            canvas.style.width = `${width}px`
            canvas.style.height = `${width / canvasRatio}px`
        } else {
            canvas.style.height = `${height}px`
            canvas.style.width = `${height * canvasRatio}px`
        }
    })
    obs.observe(document.documentElement)
    return obs
}
