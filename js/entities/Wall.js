import { ObjectOnMap } from "./ObjectOnMap.js";

export class Wall extends ObjectOnMap {
    constructor(x, y, gameMap) {
        super(x, y, gameMap);
        this.div.classList.add('game-object__wall');
    }
}
