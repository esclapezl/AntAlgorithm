class Fourmi {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 0.3;
        this.capacity = 0.1; // Capacité de charge limitée
        this.carrying = 0; // Quantité actuellement transportée
        this.path = []; // Chemin depuis le dernier point de départ
        this.pathToHome = []; // Chemin vers la fourmilière
        this.direction = 0; //0:left 1:up 2:right 3:down
        this.speed = 0.05; // divise 0.5
    }

    pickUp(foodCell) {
        if (this.carrying < this.capacity) {
            this.path.push(app.cellGrid[this.y][this.x]);
            let amount = Math.min(this.capacity - this.carrying, foodCell.quantity);
            this.carrying += amount;
            foodCell.quantity -= amount;
            if(foodCell.quantity === 0){
                app.cellGrid[foodCell.y][foodCell.x] = new Free(foodCell.x, foodCell.y);
                foods = foods.filter(food => food !== foodCell);
            }
            app.view.foodLayer.drawFoods(foods);
            this.pathToHome = this.dijkstra()
            this.pathToHome.shift();
            this.path = this.pathToHome.slice();
        }
    }

    dropOff(startingPoint) {
        this.carrying = 0;
        this.layPheromones(1,this.path);
        this.path = [];
        this.pathToHome = [];
    }

    isAtCenter() {
        return this.x % 1 === 0 && this.y % 1 === 0;
    }

    scanArea(grid) {
        let possibilites = [];
        let acceptedCellTypes = ["Free", "Food", "Fourmiliere"];
        const directions = [
            { dx: -1, dy: 0 },  // left
            { dx: 1, dy: 0 },   // right
            { dx: 0, dy: -1 },  // down
            { dx: 0, dy: 1 },   // up
        ];
        directions.forEach(direction => {
            let newX = this.x + direction.dx;
            let newY = this.y + direction.dy;
            if (newX >= 0
                && newX < grid[0].length
                && newY >= 0
                && newY < grid.length
                && acceptedCellTypes.includes(grid[newY][newX].GetType())) {
                possibilites.push(grid[newY][newX]);
            }
        });
        return possibilites;
    }

    chose(possibilites) {
        let inexplorees = possibilites.filter(location => !this.path.some(cell => cell.x === location.x && cell.y === location.y));
        let foodCells = possibilites.filter(cell => cell.GetType() === "Food");
        this.path.push(app.cellGrid[this.y][this.x]);
        if(foodCells.length > 0){
            return foodCells[Math.floor(Math.random() * foodCells.length)];
        }
        else if (inexplorees.length > 0) {
            return inexplorees[Math.floor(Math.random() * inexplorees.length)];
        } else {
            return possibilites[Math.floor(Math.random() * possibilites.length)];
        }
    }

    checkObjective(cell){
        if (this.carrying > 0 && cell.GetType() === "Fourmiliere") {
            this.dropOff(cell);
        } else if (this.carrying === 0 && cell.GetType() === "Food") {
            this.pickUp(cell);
        }
    }
    moveToward(cell) {
        if(this.x === cell.x){
            if(this.y > cell.y){
                this.direction = 1;
                this.y -= this.speed;
            }else{
                this.direction = 3;
                this.y += this.speed;
            }
        }
        if(this.y === cell.y){
            if(this.x > cell.x){
                this.direction = 0;
                this.x -= this.speed;
            }else{
                this.direction = 2;
                this.x += this.speed;
            }
        }
    }
    move(){
        switch(this.direction) {
            case 0: // gauche
                this.x = Math.round((this.x - this.speed) * 100) / 100;
                break;
            case 1: // haut
                this.y = Math.round((this.y - this.speed) * 100) / 100;
                break;
            case 2: // droite
                this.x = Math.round((this.x + this.speed) * 100) / 100;
                break;
            case 3: // bas
                this.y = Math.round((this.y + this.speed) * 100) / 100;
                break;
        }
    }

    goHome() {
        if (this.pathToHome.length > 0) {
            return this.pathToHome[0];
        }
        return null;
    }

    nextCellToHome() {
        this.pathToHome.shift();
    }

    dijkstra() {
        let openList = [];
        let closedList = [];
        let startCell = this.path[this.path.length - 1];
        let fourmiliere = this.path.find(cell => cell.GetType() === "Fourmiliere");

        // Vérifie si la fourmilière est dans le chemin
        if (!fourmiliere) {
            return null;
        }

        openList.push(new Node(startCell));

        while (openList.length > 0) {
            openList.sort((a, b) => a.g - b.g);

            let current = openList.shift();
            closedList.push(current);

            if (current.cell === fourmiliere) {
                let path = [];
                let temp = current;
                while (temp) {
                    path.push(temp.cell);
                    temp = temp.parent;
                }

                return path.reverse();
            }

            let neighbors = this.getNeighbors(current.cell);

            for (let neighbor of neighbors) {
                let neighborNode = new Node(neighbor, current);

                // Utilise Array.prototype.includes pour vérifier si une cellule est dans la liste ouverte ou fermée
                if (closedList.map(node => node.cell).includes(neighbor)) continue;

                neighborNode.g = current.g + 1;

                let openNode = openList.find(node => node.cell === neighbor);
                if (openNode) {
                    if (neighborNode.g < openNode.g) {
                        openNode.g = neighborNode.g;
                        openNode.parent = current;
                    }
                } else {
                    openList.push(neighborNode);
                }
            }
        }

        return null;
    }

    getNeighbors(cell) {
        let neighbors = [];
        let directions = [
            { dx: -1, dy: 0 },  // left
            { dx: 1, dy: 0 },   // right
            { dx: 0, dy: -1 },  // up
            { dx: 0, dy: 1 },   // down
        ];
        directions.forEach(direction => {
            let newX = cell.x + direction.dx;
            let newY = cell.y + direction.dy;
            if (this.path.find(c => c.x === newX && c.y === newY)) {
                neighbors.push(this.path.find(c => c.x === newX && c.y === newY));
            }
        });
        return neighbors;
    }

    layPheromones(quantity,path){
        let pheromoneFraction = quantity / path.length;
        for (let cell of path) {
            app.cellGrid[cell.y][cell.x].pheromone += pheromoneFraction;
        }
    }

}



