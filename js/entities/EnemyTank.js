import { Tank } from "./Tank.js";
import { DELAY, DIRECTION } from "../map.js";

export class EnemyTank extends Tank {
    constructor(x, y, width, height, gameMap, speed) {
        super(x, y, width, height, gameMap, speed);
        this.div.classList.add('game-object__enemy-tank');
    }
}
