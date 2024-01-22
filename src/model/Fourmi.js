class Fourmi {
    constructor(startingPoint) {
        this.location = startingPoint;
        this.capacity = 10; // Capacité de charge limitée
        this.carrying = 0; // Quantité actuellement transportée
        this.path = []; // Chemin depuis le dernier point de départ
        this.memory = {}; // Mémorisation des objectifs
    }


    perceive(cell) {

    }

    // Ramasser un objectif
    pickUp(goal) {
        if (this.carrying < this.capacity) {
            let amount = Math.min(this.capacity - this.carrying, goal.quantity);
            this.carrying += amount;
            goal.quantity -= amount;
            this.path.push(goal.location);
        }
    }

    // Déposer un objectif au point de départ
    dropOff(startingPoint) {
        if (this.location === startingPoint) {
            this.carrying = 0;
            this.path = [];
        }
    }

    // Communiquer avec d'autres fourmis
    communicate(ants) {
        // Partager la mémoire avec d'autres fourmis
        ants.forEach(ant => {
            Object.assign(ant.memory, this.memory);
        });
    }

    scanArea() {
        let possibilites = [];
        const directions = [
            { dx: -1, dy: 0 },  // left
            { dx: 1, dy: 0 },   // right
            { dx: 0, dy: -1 },  // up
            { dx: 0, dy: 1 },   // down
            // add more directions if needed
        ];
        directions.forEach(direction => {
            let newX = this.location.x + direction.dx;
            let newY = this.location.y + direction.dy;
            if (newX >= 0
                && newX < grid[0].length
                && newY >= 0
                && newY < grid.length
                && grid[newY][newX].GetType() === "Free") {
                possibilites.push(grid[newY][newX]);
            }
        });
        return possibilites;
    }

    chose(possibilites) {
        let inexplorees = possibilites.filter(location => !this.path.includes(location));

        if (inexplorees.length > 0) {
            let choix = inexplorees[Math.floor(Math.random() * inexplorees.length)];
            this.path.push(choix);
        } else {
            let choix = possibilites[Math.floor(Math.random() * possibilites.length)];
            this.path.push(choix);
        }
        return choix;
    }
    move(location) {

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        if (fourmi.carrying === 1 && grid[fourmi.location.x][fourmi.location.y].GetType() === "Start") {
            fourmi.dropOff();
        } else if (grid[fourmi.location.x][fourmi.location.y].GetType() === "Objective") {
            fourmi.pickUp();
        }
    }
}