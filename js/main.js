import { MAP, MAP_LEGEND, DIMENSIONS, SPEED, DIRECTION, DELAY } from "./map.js";
import { Wall } from "./entities/Wall.js";
import { PlayerTank } from "./entities/PlayerTank.js";
import { EnemyTank } from "./entities/EnemyTank.js";
import { PlayerTankController } from "./controller/PlayerTankController.js";
import { ObjectOnMap } from "./entities/ObjectOnMap.js";

const ONE_SECOND = 1000;
const FPS = 60;
const ONE_FRAME_TIME = ONE_SECOND / FPS;
const PLAYER_LIFE_COUNT = 3;
var ENEMY_TANKS_COUNT = 21;
var ENEMY_TANKS_ON_MAP = 3;

function copyMap(map) {
    let newMap = [];
    map.forEach(line => {
        newMap.push(line.slice());
    });
    return newMap;
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

class Game {
    constructor(map) {
        this.isGameOver = false;
        this.walls = [];
        this.enemyTanks = [];
        this.bullets = [];
        this.parentMap = map;
        this.mapWidth = DIMENSIONS.WIDHT_AMOUNT * DIMENSIONS.CELL_WIDTH;
        this.mapHeight = DIMENSIONS.HEIGHT_AMOUNT * DIMENSIONS.CELL_HEIGHT;
        this.map = copyMap(map)
        this.gameMap = document.getElementById('game-map');
        this.enemyTanksCreated = 0;
        this.isEnemyTankCreating = false;
        this.enemyBases = [];
    }

    startGame() {
        this.gameInitialization();
        this.gameLoop();
    }

    gameInitialization() {
        this.parentMap.forEach((line, y) => {
            line.forEach((item, x) => {
                switch (item) {
                    case MAP_LEGEND.WALL:
                        this.walls.push(new Wall(x * DIMENSIONS.CELL_WIDTH, y * DIMENSIONS.CELL_HEIGHT,
                            DIMENSIONS.CELL_WIDTH, DIMENSIONS.CELL_HEIGHT, this.gameMap));
                        break;
                    case MAP_LEGEND.PLAYER_BASE:
                        this.playerTank = new PlayerTank(x * DIMENSIONS.CELL_WIDTH, y * DIMENSIONS.CELL_HEIGHT,
                            DIMENSIONS.CELL_WIDTH, DIMENSIONS.CELL_HEIGHT, this.gameMap, SPEED.TANK)
                        break;
                    case MAP_LEGEND.ENEMY_BASE:
                        this.enemyTanks.push(new EnemyTank(x * DIMENSIONS.CELL_WIDTH, y * DIMENSIONS.CELL_HEIGHT,
                            DIMENSIONS.CELL_WIDTH, DIMENSIONS.CELL_HEIGHT, this.gameMap, SPEED.TANK));
                        this.enemyTanksCreated += 1;
                        this.enemyBases.push(new ObjectOnMap(x * DIMENSIONS.CELL_WIDTH, y * DIMENSIONS.CELL_HEIGHT,
                            DIMENSIONS.CELL_WIDTH, DIMENSIONS.CELL_HEIGHT, this.gameMap))
                        break;
                }
            });
        })
        this.playerController = new PlayerTankController(this.playerTank, this.gameMap,
            ['w', 'd', 's', 'a', ' ']);
    }

    drawEntities() {
        this.gameMap.innerHTML = '';
        this.walls.forEach(wall => {
            if (!wall.isDestroyed()) wall.draw()
        })
        this.tanks.forEach(tank => {
            if (!tank.isDestroyed()) tank.draw()
        })
        this.bullets.forEach(bullet => {
            if (!bullet.isDestroyed()) bullet.draw()
        });
    }

    gameLoop() {
        if (this.isGameOver !== true) {
            this.gameStep();
            this.drawEntities()
            setTimeout(this.gameLoop.bind(this), ONE_FRAME_TIME);
        }
    }

    gameStep() {
        this.tanks = this.enemyTanks.slice()
        this.tanks.push(this.playerTank)
        this.analyzeHits();
        this.moveEntities();
        this.handlePlayerTank();
        this.respawnEntities();
    }

    analyzeHits() {
        this.bullets.forEach(this.isBulletInHitbox.bind(this))
        this.tanks = this.tanks.filter(tank => !tank.isDestroyed());
        this.enemyTanks = this.enemyTanks.filter(enemyTank => !enemyTank.isDestroyed())
        this.bullets = this.bullets.filter(bullets => !bullets.isDestroyed())
        this.walls = this.walls.filter(walls => !walls.isDestroyed())
    }

    respawnEnemyTank() {
        let canRespawn = true;
        let baseNumber = getRandomInt(0, this.enemyBases.length - 1);
        this.tanks.forEach(tank => {
            if (this.isSecondInFirst(tank.getCorners(), this.enemyBases[baseNumber].getCorners()) ||
                this.isSecondInFirst(this.enemyBases[baseNumber].getCorners(), tank.getCorners())) {
                canRespawn = false;
            }
        });
        if (canRespawn) {
            let x = this.enemyBases[baseNumber].getX();
            let y = this.enemyBases[baseNumber].getY();
            this.enemyTanks.push(new EnemyTank(x, y,
                DIMENSIONS.CELL_WIDTH, DIMENSIONS.CELL_HEIGHT, this.gameMap, SPEED.TANK));
            this.enemyTanksCreated += 1;
            this.isEnemyTankCreating = false;
        } else {
            setTimeout(this.respawnEnemyTank.bind(this), DELAY.RESPAWN);
        }
    }


    respawnEntities() {
        if (this.enemyTanksCreated <= ENEMY_TANKS_COUNT && this.enemyTanks.length < ENEMY_TANKS_ON_MAP &&
            !this.isEnemyTankCreating) {
            this.isEnemyTankCreating = true;
            setTimeout(this.respawnEnemyTank.bind(this), DELAY.RESPAWN);
        }
    }

    moveEntities() {
        this.enemyTanks.forEach(tank => {
            if (!tank.isDestroyed()) {
                if (this.canTankMove(tank)) {
                    tank.move();
                } else {
                    tank.setRandomDirection();
                }
                if (tank.canShoot() && !tank.isShooting) {
                    tank.isShooting = true;
                    setTimeout(() => {
                        if (!tank.isDestroyed()) {
                            const bullet = tank.shoot();
                            if (bullet) {
                                this.bullets.push(bullet);
                            }
                        }
                        tank.isShooting = false;
                    }, DELAY.SHOOT)
                }
                if (!tank.isDirChanging) {
                    tank.isDirChanging = true;
                    setTimeout(() => {
                        if (!tank.isDestroyed()) {
                            tank.setRandomDirection();
                        }
                        tank.isDirChanging = false;
                    }, getRandomInt(DELAY.DIRECTION_START, DELAY.DIRECTION_END))
                }
            }
        })
        this.bullets.forEach(bullet => {
            bullet.move();
        })
    }

    handlePlayerTank() {
        if (!this.playerTank.isDestroyed()) {

            if (this.playerTank.canShoot() && this.playerController.tankMustShoot()) {
                const bullet = this.playerTank.shoot();
                if (bullet) this.bullets.push(bullet);
            }

            const direction = this.playerController.tankMustMove();
            if (direction != undefined && this.canTankMove(this.playerTank)) {
                this.playerTank.move();
            }
        }
    }

    isBulletInHitbox(bullet) {
        if (!bullet.isDestroyed()) {
            const bulletCorners = bullet.getCorners();
            if (this.isOutsideOfMap(bulletCorners)) {
                bullet.destroy();
                return;
            }
            this.tanks.forEach(tank => {
                if (!tank.isDestroyed() && !bullet.isDestroyed()) {
                    const tankCorners = tank.getCorners()
                    if (this.isSecondInFirst(tankCorners, bulletCorners) && tank.isEnemyBullet(bullet)) {
                        tank.destroy();
                        bullet.destroy();
                    }
                }
            })
            this.walls.forEach(wall => {
                if (!wall.isDestroyed() && !bullet.isDestroyed()) {
                    const wallCorners = wall.getCorners()
                    if (this.isSecondInFirst(wallCorners, bulletCorners)) {
                        wall.destroy();
                        bullet.destroy();
                    }
                }
            })
            this.bullets.forEach(bullet2 => {
                if (!bullet.isDestroyed() && bullet !== bullet2 && !bullet2.isDestroyed()) {
                    const bullet2Corners = bullet2.getCorners()
                    switch (bullet.getDirection()) {
                        case DIRECTION.NORTH:
                            bulletCorners[0].y -= SPEED.BULLET;
                            bulletCorners[1].y -= SPEED.BULLET;
                            break;
                        case DIRECTION.EAST:
                            bulletCorners[1].x += SPEED.BULLET;
                            bulletCorners[2].x += SPEED.BULLET;
                            break;
                        case DIRECTION.SOUTH:
                            bulletCorners[2].y += SPEED.BULLET;
                            bulletCorners[3].y += SPEED.BULLET;
                            break;
                        case DIRECTION.WEST:
                            bulletCorners[0].x -= SPEED.BULLET;
                            bulletCorners[3].x -= SPEED.BULLET;
                            break;
                    }
                    if (this.isSecondInFirst(bulletCorners, bullet2Corners)) {
                        bullet.destroy();
                        bullet2.destroy();
                    }
                }
            })
        }
    }

    isInSquare(dot, rect) {
        return dot.x > rect[0].x && dot.x < rect[1].x &&
            dot.y > rect[0].y && dot.y < rect[3].y
    }

    isSecondInFirst(hitbox1, hitbox2) {
        let result = this.isInSquare(hitbox2[0], hitbox1) || this.isInSquare(hitbox2[1], hitbox1) ||
            this.isInSquare(hitbox2[2], hitbox1) || this.isInSquare(hitbox2[3], hitbox1) ||
            (hitbox1[0].x == hitbox2[0].x && hitbox1[0].y == hitbox2[0].y);
        if (!result) {
            const hitboxMiddle = []
            hitboxMiddle.push({ x: (hitbox2[0].x + hitbox2[1].x) / 2, y: hitbox2[0].y });
            hitboxMiddle.push({ x: (hitbox2[3].x + hitbox2[2].x) / 2, y: hitbox2[3].y });
            hitboxMiddle.push({ x: hitbox2[0].x, y: (hitbox2[0].y + hitbox2[3].y) / 2 });
            hitboxMiddle.push({ x: hitbox2[1].x, y: (hitbox2[1].y + hitbox2[2].y) / 2 });
            return this.isInSquare(hitboxMiddle[0], hitbox1) || this.isInSquare(hitboxMiddle[1], hitbox1) ||
                this.isInSquare(hitboxMiddle[2], hitbox1) || this.isInSquare(hitboxMiddle[3], hitbox1);
        }
        return result;
    }

    isOutsideOfMap(hitbox) {
        return hitbox[0].x < 0 || hitbox[2].x > this.mapWidth
            || hitbox[0].y < 0 || hitbox[2].y > this.mapHeight
    }


    canTankMove(tank) {
        const x = tank.getX();
        const y = tank.getY();
        let canMove = true;
        for (var i = 1; i <= SPEED.TANK; i++) {
            switch (tank.getDirection()) {
                case DIRECTION.NORTH:
                    tank.setY(y - i);
                    break;
                case DIRECTION.EAST:
                    tank.setX(x + i);
                    break;
                case DIRECTION.SOUTH:
                    tank.setY(y + i);
                    break;
                case DIRECTION.WEST:
                    tank.setX(x - i);
                    break;
            }
            const tankCorners = tank.getCorners();
            if (this.isOutsideOfMap(tankCorners)) {
                canMove = false;
            }
            this.walls.forEach(wall => {
                const wallCorners = wall.getCorners();
                if (this.isSecondInFirst(wallCorners, tankCorners)) {
                    canMove = false;
                }
            });
            this.tanks.forEach(enemyTank => {
                if (tank !== enemyTank) {
                    const enemyTankCorners = enemyTank.getCorners();
                    if (this.isSecondInFirst(enemyTankCorners, tankCorners)) {
                        canMove = false;
                    }
                }
            });
            if (!canMove) break;
        }
        if (!canMove && i > 1) {
            tank.setPixelBefore();
        } else {
            tank.setX(x);
            tank.setY(y);
        }
        return canMove;
    }

}

const game = new Game(MAP)
game.startGame()
