class PheromoneLayer {
    constructor(canvas, ctx, view) {
        this.view = view;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    /**********************************************************************************/
    init() {
        this.cellWidth = 130;
        this.cellHeight = 150;
        this.canvas.width = 755;
        this.canvas.height = 870;
        this.spacingFactor = 0.31;
    }

    /**********************************************************************************/
    drawPheromones(displayMode) {

        let min = 0.5;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(displayMode !== 0){
            for (let y = 0; y < this.view.getCellGrid().length; y++) {
                for (let x = 0; x < this.view.getCellGrid()[y].length; x++) {
                    let cell = this.view.getCellGrid()[y][x];
                    if (cell.GetType() === 'Free') {
                        if(displayMode === 2)
                        {
                            let max = 5;
                            let colorValue = Math.max(0, 255-Math.round((cell.pheromone / max) * 255));
                            this.ctx.fillStyle = `rgb(255, ${colorValue}, ${colorValue})`;

                            this.ctx.fillText(
                                cell.pheromone.toFixed(2),
                                x * this.cellWidth * this.spacingFactor + this.cellWidth /5,
                                y * this.cellHeight * this.spacingFactor + this.cellHeight /4
                            );
                        }
                        else
                        {
                            let max = 20;
                            let colorValue = Math.max(0, 255- Math.round((cell.pheromone / max) * 255));
                            this.ctx.fillStyle = `rgb(255, ${colorValue}, ${colorValue})`;

                            let normalizedPheromone = Math.log1p(cell.pheromone) / Math.log1p(max);
                            let radius = 1 + normalizedPheromone * max;
                            this.ctx.beginPath();
                            this.ctx.arc(
                                x * this.cellWidth * this.spacingFactor + this.cellWidth / 4,
                                y * this.cellHeight * this.spacingFactor + this.cellHeight / 4,
                                radius,
                                0,
                                2 * Math.PI
                            );
                            this.ctx.fill();
                        }

                    }
                }
            }
        }
    }
}