import { ObjectMove } from "./ObjectMove.js";

export class Bullet extends ObjectMove {
    constructor(x, y, width, height, gameMap, speed, direction) {
        super(x, y, width, height, gameMap, speed);
        this.div.classList.add('game-object__bullet');
        this.direction = direction;

    }
}
