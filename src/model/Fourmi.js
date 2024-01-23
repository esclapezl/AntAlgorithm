class Fourmi {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.capacity = 10; // Capacité de charge limitée
        this.carrying = 0; // Quantité actuellement transportée
        this.path = []; // Chemin depuis le dernier point de départ
        this.memory = {}; // Mémorisation des objectifs
        this.direction = 0; //0:left 1:up 2:right 3:down
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
            let newX = this.x + direction.dx;
            let newY = this.y + direction.dy;
            if (newX >= 0
                && newX < treeLayer.grid[0].length
                && newY >= 0
                && newY < treeLayer.grid.length
                && treeLayer.grid[newY][newX] === 0) {          /*.GetType() === "Free") {*/
                possibilites.push({newY ,newX});
            }
        });
        return possibilites;
    }

    chose(possibilites) {
        let inexplorees = possibilites.filter(location => !this.path.includes(location));
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
    move(position) {
        if(this.x === position.newX){
            if(this.y > position.newY){
                this.direction = 1;
            }else{
                this.direction = 3;
            }
        }
        if(this.y === position.newY){
            if(this.x > position.newX){
                this.direction = 0;
            }else{
                this.direction = 2;
            }
        }
        this.x = position.newX;
        this.y = position.newY
        // if (this.carrying === 1 && labyrinthe.grid[this.x][this.y] === 2){ /*.GetType() === "Start") {*/
        //     //this.dropOff();
        // } else if (labyrinthe.grid[this.x][this.y] === 3){ /*.GetType() === "Objective") {*/
        //     //this.pickUp();
        // }
    }
}