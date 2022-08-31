const MAP = [
    [2, 0, 0, 3, 0, 0, 2, 0, 0, 3, 0, 0, 2],
    [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 3, 3, 3, 0, 0],
    [0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 3, 0, 3, 0, 0, 0, 0, 0]
]

const MAP_LEGEND = {
    PLAYER_BASE: 1,
    ENEMY_BASE: 2,
    WALL: 3,
};

const DIMENSIONS = {
    CELL_WIDTH: 64,
    CELL_HEIGHT: 64,
    WIDHT_AMOUNT: MAP[0].length,
    HEIGHT_AMOUNT: MAP.length
}

const DIRECTION = {
    NORTH: 0,
    EAST: 90,
    SOUTH: 180,
    WEST: 270
}

const BULLET_DIMENSIONS = {
    WIDTH: 7,
    HEIGHT: 7
}

const SPEED = {
    TANK: 6,
    BULLET: 15
}

const DELAY = {
    SHOOT: 400,
    DIRECTION_START: 2000,
    DIRECTION_END: 4000
}

export {MAP, MAP_LEGEND, DIMENSIONS, DIRECTION, BULLET_DIMENSIONS, SPEED, DELAY};
