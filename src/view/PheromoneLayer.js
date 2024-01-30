class PheromoneLayer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    init() {
        this.cellWidth = 130;
        this.cellHeight = 150;
        this.canvas.width = 755;
        this.canvas.height = 870;
        this.spacingFactor = 0.31;
    }

    drawPheromones(cellGrid) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Parcourir chaque cellule de la grille
        for (let y = 0; y < cellGrid.length; y++) {
            for (let x = 0; x < cellGrid[y].length; x++) {
                let cell = cellGrid[y][x];
                // Vérifier si la cellule est de type Free
                if (cell.GetType() === 'Free') {
                    // Dessiner la quantité de phéromones sur le canvas
                    this.ctx.fillText(
                        cell.pheromone.toFixed(2), // Afficher la quantité de phéromones avec deux chiffres après la virgule
                        x * this.cellWidth * this.spacingFactor + this.cellWidth /5,
                        y * this.cellHeight * this.spacingFactor + this.cellHeight /4
                    );
                }
            }
        }
    }

    togglePheromonesVisibility() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}