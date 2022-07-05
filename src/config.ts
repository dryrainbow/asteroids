export const config = {
    game: {
        width: 800,
        height: 450,
        computedSize: {
            width: 800,
            height: 450
        },
        scale: {
            mode: Phaser.Scale.FIT
        }
    },
    ship: {
        velocity: 0.2,
        rotationVelocity: 0.005,
        size: 30,
        health: 200
    },
    bullet: {
        size: 6,
        hitbox: 1.5,
        speed: 800,
        color: 0xffffff
    },
    star: {
        sizeFrom: 2,
        sizeTo: 4,
        colors: [
            0xffffff,
            0xdabff5,
            0xfaf755
        ]
    },
    asteroid: {
        sizeFrom: 20,
        sizeTo: 30,
        speed: 6,
        rotationSpeedFrom: 1,
        rotationSpeedTo: 9,
        damage: 2,
        spawnSpeed: 10,
    },
    healthBar: {
        width: 150,
        height: 25,
        colors: [0x00c206, 0xffee00, 0xff0000],
        borderColor: 0xb3b3b3
    }
}