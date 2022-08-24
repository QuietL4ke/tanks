import { MAP, MAP_LEGEND, DIMENSIONS } from "./map.js";
import { Wall } from "./entities/Wall.js";

var GAME_TIMER_INTERVAL = 1000; // задаёт интервал времени, за который будет выполняться один шаг в игре
var PLAYER_LIFE_COUNT = 3;
var ENEMY_TANKS_COUNT = 21;

var IS_GAME_OVER = false;

/**
 * в этой функции можно выполнить весь тот код, который необходим для старта игры
 * например, именно в этом месте можно нарисовать блоки стен на карте и подписаться на события нажатия кнопок управления
 */
var walls = [];
const gameMap = document.getElementById('game-map');
gameInitialization();


/**
 * Жизненный цикл игры
 * вызывает функцию gameLoop каждые GAME_TIMER_INTERVAL до тех пор, пока игра не закончится
 * (чтобы закончить игру, установите занчение переменной IS_GAME_OVER в true)
*/
gameLoop();



function gameInitialization() {

    MAP.forEach((line, y) => {
        line.forEach((item, x) => {
            switch (item) {
                case MAP_LEGEND.WALL:
                    walls.push(new Wall( x * DIMENSIONS.CELL_WIDTH, y * DIMENSIONS.CELL_HEIGHT, gameMap));
                break;
            }
        });
    })

    walls.forEach(wall => {
        wall.draw(document.getElementById('game-map'))
    })
}

function gameLoop() {
    if (IS_GAME_OVER !== true) {

        /**
         * вот именно в функции gameStep стоит разместить код, который будет выполняться на каждом шаге игрового цикла
         */
        gameStep();


        setTimeout(function() {
            gameLoop()
        }, GAME_TIMER_INTERVAL);
    }
}

function gameStep() {
    /**
     * это то самое место, где стоит делать основные шаги игрового цикла
     * например, как нам кажется, можно было бы сделать следующее
     * 1. передвинуть пули
     * 2. рассчитать, где танки окажутся после этого шага
     * 3. проверить столкновения (пуль с танками, пуль со стенами, танков со стенами и танков с танками)
     * 4. убрать с поля мертвые танки и разрушенные стены
     * 5. проверить, не закончились ли жизни у игрока или не закончиличь ли танки противника
     * 6. создать новые танки на базах в случае, если кого-то убили на этом шаге
     */
}

