class BaseScene extends Phaser.Scene {
    update(time: number, delta: number): void {
        this.children.list.forEach(child=>{
            if('update' in child && typeof child.update === 'function') {
                child.update(time, delta)
            } 
        })
    }
}

export {BaseScene}