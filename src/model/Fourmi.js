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

    // Déplacer la fourmi
    move(newLocation) {
        this.location = newLocation;
    }
}