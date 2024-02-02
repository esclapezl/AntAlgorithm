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

    drawPheromones(cellGrid, displayMode) {
        let max = 1;
        let min = 0.5;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(displayMode !== 0){
            for (let y = 0; y < cellGrid.length; y++) {
                for (let x = 0; x < cellGrid[y].length; x++) {
                    let cell = cellGrid[y][x];
                    // Vérifier si la cellule est de type Free
                    if (cell.GetType() === 'Free') {
                        if(displayMode === 2)
                        {
                            // Convertir la quantité de phéromones en une valeur de couleur RGB
                            let colorValue = Math.min(255, Math.round((cell.pheromone / max) * 255));
                            this.ctx.fillStyle = `rgb(${colorValue}, 0, 0)`;

                            // Dessiner la quantité de phéromones sur le canvas
                            this.ctx.fillText(
                                cell.pheromone.toFixed(2), // Afficher la quantité de phéromones avec deux chiffres après la virgule
                                x * this.cellWidth * this.spacingFactor + this.cellWidth /5,
                                y * this.cellHeight * this.spacingFactor + this.cellHeight /4
                            );
                        }
                        else
                        {
                            let colorValue = Math.max(0, 255- Math.round((cell.pheromone / max) * 255));
                            this.ctx.fillStyle = `rgb(255, ${colorValue}, ${colorValue})`;

                            let radius = 1+Math.log(Math.max(cell.pheromone + min, 1)) * 10;
                            this.ctx.beginPath();
                            this.ctx.arc(
                                x * this.cellWidth * this.spacingFactor + this.cellWidth / 4, // Position x du centre du cercle
                                y * this.cellHeight * this.spacingFactor + this.cellHeight / 4, // Position y du centre du cercle
                                radius, // Rayon du cercle
                                0, // Angle de départ
                                2 * Math.PI // Angle de fin
                            );
                            this.ctx.fill();
                        }

                    }
                }
            }
        }
    }

    togglePheromonesVisibility() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}