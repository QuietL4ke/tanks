import { Tank } from "./Tank.js";
import { DIRECTION } from "../map.js";

export class PlayerTank extends Tank {
    constructor(x, y, width, height, gameMap, speed) {
        super(x, y, width, height, gameMap, speed);
        this.direction = DIRECTION.EAST;
        this.div.classList.add('game-object__player-tank');
    }
}
