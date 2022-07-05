import { config } from "./src/config"

function isOutsideOfView(obj: {x: number, y: number}, moreThan: number = 0) {
    const {width, height} = config.game.computedSize
    if (obj.x > width + moreThan || obj.x < 0 - moreThan || obj.y > height + moreThan || obj.y < 0 - moreThan) {
        return true
    }
    return false
}

function getRandomOutsidePosition(size: number) {
    const {width, height} = config.game.computedSize
    const side: Side = randomDataGenerator.integerInRange(0, 3)
    const position = new Phaser.Math.Vector2();
    switch (side) {
        case Side.top:
            position.x = randomDataGenerator.integerInRange(0, width)
            position.y = -size
            break
        case Side.left:
            position.y = randomDataGenerator.integerInRange(0, height)
            position.x = width + size
            break
        case Side.bottom:
            position.x = randomDataGenerator.integerInRange(0, width)
            position.y = height + size
            break
        case Side.right:
            position.y = randomDataGenerator.integerInRange(0, height)
            position.x = -size
            break
    }
    return {position, side}
}

function scoreToText(score: number = 0, length = 4): string {
    let str = score.toString()
    let zeroCount = length - str.length
    let result = ''
    for (let i = 0; i < zeroCount; i ++) {
        result += '0'
    }
    return result + str.toString()
}

enum Side {
    top,
    left,
    bottom,
    right
}

const randomDataGenerator = (()=>new Phaser.Math.RandomDataGenerator)()


export {
    isOutsideOfView,
    randomDataGenerator,
    getRandomOutsidePosition,
    Side,
    scoreToText
}