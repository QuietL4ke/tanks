import { ObjectOnMap } from "./ObjectOnMap.js";

const DIRECTION = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
}

export class Tank extends ObjectOnMap {
    constructor(x, y, gameMap, field) {
        super(x, y, gameMap);
        this.field = field
        this.direction = DIRECTION.NORTH;
    }

    drive() {
        switch (this.direction) {
            case DIRECTION.NORTH:
                break;
            case DIRECTION.EAST:
                break;
            case DIRECTION.SOUTH:
                break;
            case DIRECTION.WEST:
                break;
        }
    }
}
