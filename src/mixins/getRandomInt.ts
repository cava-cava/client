/**
 * get random integer enter min number and max max
 * @param min number
 * @param max number
 */
export function getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * Math.floor((max - min)) + min);
}
