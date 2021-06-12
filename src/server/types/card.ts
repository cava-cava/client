import {FileStrapi} from "./fileStrapi";

export interface Card {
    id: number
    Description: string
    Points: number,
    Alternative: Card[]
    animation?: FileStrapi,
    audio?: FileStrapi,
}

