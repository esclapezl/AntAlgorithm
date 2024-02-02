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
/**********************************************************************************/
class Obstacle extends Cell {
    constructor(x, y) {
        super(x, y);
    }
}

/**********************************************************************************/
class Free extends Cell {
    constructor(x, y) {
        super(x, y);
        this.pheromone = 0;
        this.passage = 0;
    }


}

/**********************************************************************************/
class Fourmiliere extends Cell {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
    }

    GetType() {
        return "Fourmiliere";
    }
}

/**********************************************************************************/
class Food extends Cell {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.quantity = 1;
    }

    GetType() {
        return "Food";
    }
}