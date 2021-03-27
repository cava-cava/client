"use strict";
exports.__esModule = true;
exports.getRandomInt = void 0;
/**
 * get random integer enter min number and max max
 * @param min number
 * @param max number
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * Math.floor((max - min)) + min);
}
exports.getRandomInt = getRandomInt;
