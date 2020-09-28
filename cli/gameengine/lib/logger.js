var logUpdate = require('log-update');
const chalk = require('chalk');
const gradient = require('gradient-string');

var figlet = require('figlet');

class Logger {
    constructor(){
    }
    screen({
        goldCoins,
        ships
    }){
        figlet('Adventure Sailor', (err, data) => {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            let coolGradient = gradient(['#FF0000', '#00FF00', '#0000FF']);
            this.gameTitle = coolGradient(data);
            logUpdate(this.templater = `
                        ${this.gameTitle}
                Treasure Chest:  ${chalk.yellow(goldCoins)} Gold Coin(s)
                Select the ship by no.
                ${chalk.cyan('To New Crew Member : crew <ship no>')}
                ${chalk.green('to unlock ship : sail <ship no>')}

            ${ships.map((s) => this.shipdetails(s, goldCoins)).join('')}
        `);
        });
        
    }


    shipdetails(s, userCoins){
        let shipNo = s.id + ")" + new Array(5 - (s.id.toString().length + 1) ).join(' ');
        let fishname = s.fishname + new Array(15 - s.fishname.length ).join(' ');

        // let progress = '[' +  new Array(40).join(' ') + ']';


        let level = '( 0 )';
        if(!s.locked){
            level = '(' + s.own + '/' + s.level.crewcount + ')';
        }

        level = level + new Array(10 - level.length ).join(' ')

        return `
        ${shipNo}| ${chalk.blue(fishname)} ${level} ${chalk.magenta(s.loading)} | (${s.waitTime} second(s)) | (Loot: ${s.income} coin(s)) ${this.getCrewText(s,userCoins)}
        `;
    }

    getCrewText(s, userCoins){
        if (s.locked){
            if (userCoins >= s.buyin){
                return chalk.bgYellow.bold(`(Unlock: ${s.buyin} coin(s))`)
            } else {
                return chalk.bgGrey.bold(`(Unlock: ${s.buyin} coin(s))`)
            }
        } else if (userCoins >= s.buyin){
            return chalk.bgYellow.bold(`(New Crew: ${s.buyin} coin(s))`);
        }else {
            return chalk.bgGrey.bold(`(New Crew: ${s.buyin} coin(s))`);
        }
    }


}

module.exports = Logger;