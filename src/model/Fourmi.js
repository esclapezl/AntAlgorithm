class Fourmi {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 0.5;
        this.capacity = 10; // Capacité de charge limitée
        this.carrying = 0; // Quantité actuellement transportée
        this.path = []; // Chemin depuis le dernier point de départ
        this.memory = {}; // Mémorisation des objectifs
        this.direction = 0; //0:left 1:up 2:right 3:down
    }

    pickUp(goalCell) {
        if (this.carrying < this.capacity) {
            let amount = Math.min(this.capacity - this.carrying, goalCell._qty);
            this.carrying += amount;
            goalCell._qty -= amount;
        }
    }

    // Déposer un objectif au point de départ
    dropOff(startingPoint) {
        this.carrying = 0;
        this.path = [];
    }

    // Communiquer avec d'autres fourmis
    communicate(ants) {
        // Partager la mémoire avec d'autres fourmis
        ants.forEach(ant => {
            Object.assign(ant.memory, this.memory);
        });
    }

    scanArea(grid) {
        let possibilites = [];
        const directions = [
            { dx: -1, dy: 0 },  // left
            { dx: 1, dy: 0 },   // right
            { dx: 0, dy: -1 },  // down
            { dx: 0, dy: 1 },   // up
            // add more directions if needed
        ];
        directions.forEach(direction => {
            let newX = this.x + direction.dx;
            let newY = this.y + direction.dy;
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
        let inexplorees = possibilites.filter(location => !this.path.some(cell => cell.x === location.x && cell.y === location.y));
        if (inexplorees.length > 0) {
            let choix = inexplorees[Math.floor(Math.random() * inexplorees.length)];
            this.path.push(choix);
            return choix;
        } else {
            let choix = possibilites[Math.floor(Math.random() * possibilites.length)];
            this.path.push(choix);
            return choix;
        }
    }
    move(cell) {
        if(this.x === cell.x){
            if(this.y > cell.y){
                this.direction = 1;
            }else{
                this.direction = 3;
            }
        }
        if(this.y === cell.y){
            if(this.x > cell.x){
                this.direction = 0;
            }else{
                this.direction = 2;
            }
        }
        this.x = cell.x;
        this.y = cell.y;

        if (this.carrying === 1 && cell.GetType() === "Start") {
            this.dropOff();
        } else if (this.carrying === 0 && cell.GetType() === "Objective") {
            this.pickUp();
        }
    }

    transition(transition){
        switch(this.direction) {
            case 0: // left
                this.x -= this.step / transition;
                break;
            case 1: // up
                this.y -= this.step / transition;
                break;
            case 2: // right
                this.x += this.step / transition;
                break;
            case 3: // down
                this.y += this.step / transition;
                break;
        }
    }
}