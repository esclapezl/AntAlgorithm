/* La classe mère */
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    GetType() {
        return this.constructor.name;
    }
}

/* Les classes filles */

class Obstacle extends Cell {
    constructor(x, y) {
        super(x, y);
    }
}

class Free extends Cell {
    constructor(x, y, qty = 0.0) {
        super(x, y);
        this._qty = qty;
    }

    GetQty() {
        return this._qty;
    }
    SetQty(newValue) {
        this._qty = newValue;
    }
}