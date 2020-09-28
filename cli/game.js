const gameConfig = require('./data/game-config.json');
const GameEngine = require('./gameengine/index');

GameEngine(gameConfig)();
