const delay = (seconds) => new Promise((resolves) => {
    setTimeout(resolves, seconds*1000);
});

//common.js
var EventEmitter = require('events').EventEmitter;
var myEmitter = new EventEmitter();

module.exports = {delay, myEmitter}