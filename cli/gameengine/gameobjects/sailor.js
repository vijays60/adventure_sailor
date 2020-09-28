const {delay, myEmitter} = require('../lib/utils');


function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

class Sailor {

    runningShips = [];

    sail(ship, user) {

        // const loopcount = 40;
        // const delaytime = ( ship.TravelTime * 1000) / loopcount
        // for (let i = 0; i <= loopcount; i++) {
        //     const dots = ".".repeat(i)
        //     const left = loopcount - i
        //     const empty = " ".repeat(left)
        
        //     // process.stdout.write(`\r[${dots}${empty}] ${i * 5}%`)

        //     this.loading = `\r[${dots}${empty}] ${i * 5}%`
        //     myEmitter.emit('updategamescreen');
        //     await wait(delaytime)
        // }
        // user.addToChest(ship.loot)

        if (this.runningShips.indexOf(ship.id) < 0){
            console.log(`all hands hoay! ${ship.waitTime} seconds(s)`);
            this.runningShips.push(ship.id)
            Promise.resolve()
                .then(() => delay(ship.TravelTime))
                .then(() => user.addToChest(ship.loot) )
                .then(() => {
                    const index = this.runningShips.indexOf(ship.id);
                    if (index >= 0){
                        this.runningShips.splice(index, 1);
                    }
                    myEmitter.emit('updategamescreen') 
                });
        }
    }

    assignCaptain(){

    }

}

module.exports = new Sailor();
