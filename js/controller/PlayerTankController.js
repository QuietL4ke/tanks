import { Tank } from "../entities/Tank.js";
import { DIRECTION, MAP } from "../map.js";

export class PlayerTankController {
    constructor(tank, field, buttons) {
        this.tank = tank;
        this.field = field;
        this.buttons = buttons;
        this.buttonsDown = [];
        this.mustShoot = false;
        this.setupListeners();
        this.field.focus()
    }

    setupListeners() {
        this.field.addEventListener('keydown', event => {
            switch (event.key) {
                case this.buttons[0]:
                    this.tank.setDirection(DIRECTION.NORTH);
                    this.buttonsDown.push(DIRECTION.NORTH);
                    break;
                case this.buttons[1]:
                    this.tank.setDirection(DIRECTION.EAST);
                    this.buttonsDown.push(DIRECTION.EAST);
                    break;
                case this.buttons[2]:
                    this.tank.setDirection(DIRECTION.SOUTH);
                    this.buttonsDown.push(DIRECTION.SOUTH);
                    break;
                case this.buttons[3]:
                    this.tank.setDirection(DIRECTION.WEST);
                    this.buttonsDown.push(DIRECTION.WEST);
                    break;
                case this.buttons[4]:
                    this.mustShoot = true;
                    break;
            }
        });
        this.field.addEventListener('keyup', event => {
            switch (event.key) {
                case this.buttons[0]:
                    this.buttonsDown = this.buttonsDown.filter(direction => direction !== DIRECTION.NORTH);
                    break;
                case this.buttons[1]:
                    this.buttonsDown = this.buttonsDown.filter(direction => direction !== DIRECTION.EAST);
                    break;
                case this.buttons[2]:
                    this.buttonsDown = this.buttonsDown.filter(direction => direction !== DIRECTION.SOUTH);
                    break;
                case this.buttons[3]:
                    this.buttonsDown = this.buttonsDown.filter(direction => direction !== DIRECTION.WEST);
                    break;
                case this.buttons[4]:
                    this.mustShoot = false;
                    break;
            }
        });
        this.field.onblur = () => { this.field.focus() }
    }

    setTank(tank) {
        this.tank = tank;
    }

    tankMustShoot() {
        return this.mustShoot;
    }

    tankMustMove() {
        const direction = this.buttonsDown[this.buttonsDown.length - 1];
        if (direction !== undefined) this.tank.setDirection(direction);
        return direction;
    }
}
