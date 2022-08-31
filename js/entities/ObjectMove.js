import { ObjectOnMap } from "./ObjectOnMap.js";
import { DIRECTION } from "../map.js";

export class ObjectMove extends ObjectOnMap {
    constructor(x, y, width, height, gameMap, speed) {
        super(x, y, width, height, gameMap);
        this.speed = speed;
        this.direction = DIRECTION.NORTH;
        this.destroyed = false
        this.directions = [DIRECTION.NORTH, DIRECTION.EAST, DIRECTION.SOUTH, DIRECTION.WEST];
    }

    setDirection(direction) {
        this.direction = direction;
    }

    getDirection() {
        return this.direction;
    }

    move() {
        switch (this.direction) {
            case DIRECTION.NORTH:
                this.y -= this.speed;
                break;
            case DIRECTION.EAST:
                this.x += this.speed;
                break;
            case DIRECTION.SOUTH:
                this.y += this.speed;
                break;
            case DIRECTION.WEST:
                this.x -= this.speed;
                break;
        }
    }


    draw() {
        this.div.style.transform = "rotate(" + this.direction + "deg)"
        super.draw()
    }
}
