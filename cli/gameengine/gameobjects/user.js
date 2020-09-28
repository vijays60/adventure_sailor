
class User{
    goldCoins = 0;
    silverCoins = 0;
    priateNames = ['Pirate'];
    
    constructor(config={names:[]}) {
        this.name = config.names[Math.floor(Math.random() * config.names.length)];
    }

    addToChest(coins){
        this.goldCoins += coins;
    }

    debitcoins(coins){
        this.goldCoins -= coins;
    }

}

module.exports = User;
