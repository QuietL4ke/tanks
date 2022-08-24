export class ObjectOnMap {
    constructor(x, y, gameMap) {
        this.x = x;
        this.y = y;
        this.div = document.createElement('div')
        this.div.classList.add('game-object');
        this.gameMap = gameMap;
    }

    setX (x) {
        this.x = x;
    }

    setY (y) {
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY () {
        return this.y;
    }

    draw() {
        this.div.style.top =  this.y + 'px';
        this.div.style.left = this.x + 'px';
        this.gameMap.append(this.div);
    }
}
