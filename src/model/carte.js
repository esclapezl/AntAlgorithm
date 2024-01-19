class Map {
    static directions= [
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 1 }
    ];
    constructor() {
        this.fourmis = []; // Liste des fourmis
    }

    // Ajouter une fourmi à la liste
    addAnt(fourmi) {
        this.fourmis.push(fourmi);
    }

    // Obtenir la liste des fourmis
    getAnts() {
        return this.fourmis;
    }


    // Mettre à jour la carte en déplaçant les fourmis et en les faisant interagir
    update() {
        this.fourmis.forEach(fourmi => {
            directions.forEach(direction => {
                let newX = x + direction.dx;
                let newY = y + direction.dy;
                let possibilites = [];
                // Check if the new position is within the grid boundaries
                if (newX >= 0
                    && newX < grid[0].length
                    && newY >= 0
                    && newY < grid.length
                    && grid[newY][newX].GetType() === "Free") {
                    possibilites.push(grid[newY][newX]);
                }
                fourmi.move(possibilites[Math.floor(Math.random() * (possibilites.length))]);

                if(fourmi.carrying === 1){
                    if(grid[fourmi.location.x][fourmi.location.y].GetType() === "Start"){
                        fourmi.dropOff();
                    }
                }
                else{
                    if(grid[fourmi.location.x][fourmi.location.y].GetType() === "Objective"){
                        fourmi.pickUp();
                    }
                }

            });


            if (Math.random() < 0.1) {
                ant.pickUp({ quantity: Math.random() * 10, location: ant.location });
            }
            if (Math.random() < 0.1) {
                ant.dropOff({ x: 0, y: 0 });
            }
            ant.communicate(this.fourmis);
        });
    }
}