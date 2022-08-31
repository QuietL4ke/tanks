import { ObjectOnMap } from "./ObjectOnMap.js";

export class Wall extends ObjectOnMap {
    constructor(x, y, width, height, gameMap) {
        super(x, y, width, height, gameMap);
        this.div.classList.add('game-object__wall');
    }
}
