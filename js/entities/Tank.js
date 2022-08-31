import { ObjectMove } from "./ObjectMove.js";
import { Bullet } from "./Bullet.js";
import { DIMENSIONS, BULLET_DIMENSIONS, SPEED, DIRECTION } from "../map.js";

export class Tank extends ObjectMove {
    constructor(x, y, width, height, gameMap, speed) {
        super(x, y, width, height, gameMap, speed);
        this.changingDir = false;
        this.shooting = false;
        this.setRandomDirection();
    }

    shoot() {
        if (this.canShoot()) {
            let bulletWHalf = BULLET_DIMENSIONS.WIDTH / 2;
            let bulletHHalf = BULLET_DIMENSIONS.HEIGHT / 2;
            let tankWHalf = DIMENSIONS.CELL_WIDTH / 2;
            let tankHHalf = DIMENSIONS.CELL_HEIGHT / 2;
            this.bullet = new Bullet(this.x + tankWHalf - bulletWHalf, this.y + tankHHalf - bulletHHalf,
                BULLET_DIMENSIONS.WIDTH, BULLET_DIMENSIONS.HEIGHT, this.gameMap, SPEED.BULLET, this.direction);
            return this.bullet;
        }
    }

    isEnemyBullet(bullet) {
        return bullet !== this.bullet;
    }

    canShoot() {
        return !this.bullet || this.bullet.isDestroyed();
    }

    setRandomDirection() {
        const randomDir = Math.floor(Math.random() * 4);
        this.direction = this.directions[randomDir];
    }

    setPixelBefore() {
        switch (this.direction) {
            case DIRECTION.NORTH:
                this.setY(this.y + 1);
                break;
            case DIRECTION.EAST:
                this.setX(this.x - 1);
                break;
            case DIRECTION.SOUTH:
                this.setY(this.y - 1);
                break;
            case DIRECTION.WEST:
                this.setX(this.x + 1);
                break;
        }
    }
}
