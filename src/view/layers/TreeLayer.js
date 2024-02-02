

class TreeLayer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.treeImage = new Image();
        this.treeImage.src = '../../ressources/images/shadow.png';
        this.treeImage.onload = () => {
            this.display();
        };
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }

    init() {
        this.canvas.width = 755;
        this.canvas.height = 870;
        this.cellWidth = 130;
        this.cellHeight = 150;
        this.indiceSprite = 0;
        this.spacingFactor = 0.31;
    }

    display() {
        let overlayImage = new Image();
        overlayImage.src = '../../ressources/images/tree.png';
        overlayImage.onload = () => {

            for (let i = 0; i < this.grid.length; i++) {
                for (let j = 0; j < this.grid[0].length; j++) {
                    let x = Math.floor(j * this.cellWidth * this.spacingFactor);
                    let y = Math.floor(i * this.cellHeight * this.spacingFactor);

                    if (this.grid[i][j] === 1) {
                        this.ctx.save();
                        this.ctx.translate(x, y);
                        let scaleRatio = 0.45;
                        this.ctx.scale(scaleRatio, scaleRatio);

                        this.ctx.drawImage(
                            this.treeImage,
                            this.indiceSprite * this.cellWidth, 0,
                            this.cellWidth, this.cellHeight,
                            0, 0,
                            this.cellWidth, this.cellHeight
                        );

                        this.ctx.drawImage(
                            overlayImage,
                            this.indiceSprite * this.cellWidth,
                            0,
                            this.cellWidth,
                            this.cellHeight,
                            0,
                            0,
                            this.cellWidth,
                            this.cellHeight
                        );

                        this.ctx.restore();
                    } else if (i === 9 && j === 9) {
                        let newTreeImage = new Image();
                        newTreeImage.src = '../../ressources/images/fourmiliere.png';
                        newTreeImage.onload = () => {
                            const scaleRatioFourmiliere = 0.20;
                            this.ctx.save();
                            this.ctx.scale(scaleRatioFourmiliere, scaleRatioFourmiliere);
                            this.ctx.drawImage(newTreeImage,
                                (this.canvas.width / 2 - (this.cellWidth * this.spacingFactor * 0.01) + (this.cellWidth * this.spacingFactor) / 5) / scaleRatioFourmiliere,
                                (this.canvas.height / 2 - (this.cellHeight * this.spacingFactor * 0.01) + (this.cellHeight * this.spacingFactor) / 5) / scaleRatioFourmiliere,
                                this.cellWidth,
                                this.cellHeight);
                            this.ctx.restore();
                        };
                    }
                }
            }
        }
    }
}






