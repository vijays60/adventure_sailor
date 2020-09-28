const delay = require('../lib/utils');

class Ship{

    constructor(ship={}, level = {}) {
        this.id = ship.id ? ship.id : 0;
        this.fishname = ship.name ? ship.name : 'Some Fish';
        this.income = ship.income ? ship.income : 0;
        this.own = ship.own ? ship.own : 0;
        this.waitTime = ship.waitTime ? ship.waitTime : 1;
        this.buyin = ship.buyin ? ship.buyin : 0;
        this.manager = null;
        this.locked = ('locked' in ship) ? ship.locked : true;
        this.loading = '[' +  new Array(40).join(' ') + ']';
        this.level = level;
    }

    get loot(){
        return this.income;
    }

    get TravelTime(){
        return this.waitTime;
    }

    addCrewMember(levels){
        this.own += 1
        if( this.own > 1){
            this.income = this.newIncome();
            this.buyin = this.newBuyIn();
            this.waitTime = this.newWaitingTime();
        }

        if (this.own >= this.level.crewcount) {
            const newlevel = this.level.levelNo+1;
            this.level = levels[newlevel] ? levels[newlevel] : this.level;
        }

        this.locked = false;
    }

    get loot(){
        // calculate the new income based on the captlist formula
        return this.income;
    }

    newIncome(){
        return Math.ceil(this.income * this.level.incomerate);
    }

    newWaitingTime(){
        return this.waitTime;
    }

    newBuyIn(){
        return Math.ceil(this.buyin * this.level.buyinRate);
    }

    assignMangaer(manager){
        this.manager = manager;
    }

    fish(updateAccount){
        Promise.resolve()
            .then(()=> delay(this.waitTime))
            .then(()=> updateAccount(this.income));
    }

}
module.exports = Ship;
