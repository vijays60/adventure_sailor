const { createInterface }  = require('readline');
const EventEmitter = require('events').EventEmitter;

const Logger = require('./lib/logger');
const User = require('./gameobjects/user');
const Ship = require('./gameobjects/ship');
const sailor = require('./gameobjects/sailor');


const {myEmitter} = require('./lib/utils');


function GameEngine(gameConfig={ names:[], products:[] }){
    rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // const myEmitter = new EventEmitter();
    const user = new User(gameConfig);
    const logger = new Logger();
    let levels = gameConfig.levels;
    if (levels.length <= 0){
        levels["1"] = {
            "crewcount" : 10,
            "incomerate": 1.1,
            "buyin": 1.1
        };
    } 

    const ships = [];

    for(let product of gameConfig.products){
        ships.push(new Ship(product, levels["1"]));
    }
    
    myEmitter.on('updategamescreen', () => displayUpdates());
    
    function displayUpdates(){
        // process.stdout.write('\033c');
        console.clear();
        logger.screen({
            goldCoins: user.goldCoins,
            ships,
        });
    }

    function findShip(shipId) {
        let ship = null;
        const filteredShip = ships.filter(
            s => s.id.toString() === shipId);
        if (filteredShip && filteredShip.length > 0){
            ship = filteredShip[0];
        }
        return ship;
    }

    return function(){
        console.clear();
        myEmitter.emit('updategamescreen');
        rl.prompt();
        rl.on('line', input => {
            var [ commandText, ...remaining ] = input.split(' ');
            var ship;
            process.stdout.clearLine(); 
            process.stdout.cursorTo(0);
            switch(commandText){
                case 'exit':
                    console.log("Bye");
                    process.exit(0);
                case 'sail':
                case 'crew':
                    if(remaining && remaining.length > 0){
                        ship = findShip(remaining[0]);
                        if (ship && ship !== null ){
                            if (user.goldCoins >= ship.buyin) {
                                user.debitcoins(ship.buyin);
                                ship.addCrewMember(levels);
                            } else {
                                console.log("Shiver me timbers!, Not enough Gold coins!");
                            }
                        } else {
                            console.log("Speak the ship name, Savvy!");
                        }
                    }
                    displayUpdates();
                    break;
                // case 'loot':
                //     if(remaining && remaining.length > 0){
                //         ship = findShip(remaining[0]);
                //         if (ship && ship !== null){
                //             ship.buy();
                //         }
                //     }
                //     break;
                case 'captain':
                    if(remaining && remaining.length > 0){
                        ship = findShip(remaining[0]);
                        sailor.assignCaptain(ship, displayUpdates);
                    }
                    displayUpdates();
                    break;
                default:
                    ship = findShip(commandText);
                    if (ship && ship !== null){
                        if(!ship.locked){
                            // console.log(`Getting ${ship.fishname}`);
                            sailor.sail(ship, user);
                            // sailor.sail(ship, user);
                        } else {
                            console.log('Unlock before you sail!')
                        }
                    } else {
                        console.log("dead men tell no tales");
                    }
                    break;
            }
            // displayUpdates();
        });
    }

}

module.exports = GameEngine;