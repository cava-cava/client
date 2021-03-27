"use strict";
exports.__esModule = true;
exports.initIdOMG = void 0;
var getRandomInt_1 = require("../../mixins/getRandomInt");
/**
 * Initialize and generate next id OMG for the game
 * @param room
 */
function initIdOMG(room) {
    return room.game.round + getRandomInt_1.getRandomInt(room.users.length, room.users.length * 2);
}
exports.initIdOMG = initIdOMG;
