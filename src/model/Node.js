class Node {
    constructor(cell, parent = null) {
        this.cell = cell;
        this.parent = parent;
        this.g = 0;
    }
}