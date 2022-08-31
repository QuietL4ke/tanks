export class ObjectOnMap {
    constructor(x, y, width, height, gameMap) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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

    getCorners() {
        let corners = []
        corners.push(this.get1Corner(), this.get2Corner(), this.get3Corner(), this.get4Corner());
        return corners;
    }

    get1Corner() {
        return {
            x: this.x,
            y: this.y
        }
    }

    get2Corner() {
        return {
            x: this.x + this.width,
            y: this.y
        }
    }

    get3Corner() {
        return {
            x: this.x + this.width,
            y: this.y + this.height
        }
    }

    get4Corner() {
        return {
            x: this.x,
            y: this.y + this.height
        }
    }

    draw() {
        this.div.style.top =  this.y + 'px';
        this.div.style.left = this.x + 'px';
        this.gameMap.append(this.div);
    }

    destroy() {
        this.destroyed = true;
    }

    isDestroyed() {
        return this.destroyed;
    }

}
