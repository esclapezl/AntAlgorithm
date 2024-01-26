

class TreeLayer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.treeImage = new Image();
        this.treeImage.src = '../../ressources/images/shadow.png';
        this.treeImage.onload = () => {
            //console.log("Image loaded");
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
        const width = 755;
        const height = 870;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    display() {
        const cellWidth = 130;
        const cellHeight = 150;
        const indiceSprite = 0;
        const spacingFactor = 0.31;

        // Charger l'image à superposer
        const overlayImage = new Image();
        overlayImage.src = '../../ressources/images/tree.png';

        // Attendre le chargement de l'image
        overlayImage.onload = () => {

            for (let i = 0; i < this.grid.length; i++) {
                for (let j = 0; j < this.grid[0].length; j++) {
                    // Convertir les coordonnées à virgule en entiers
                    const x = Math.floor(j * cellWidth * spacingFactor);
                    const y = Math.floor(i * cellHeight * spacingFactor);

                    if (this.grid[i][j] === 1) {
                        this.ctx.save();

                        this.ctx.translate(x, y);

                        const scaleRatio = 0.45;
                        this.ctx.scale(scaleRatio, scaleRatio);

                        this.ctx.drawImage(
                            this.treeImage,
                            indiceSprite * cellWidth, 0,
                            cellWidth, cellHeight,
                            0, 0,
                            cellWidth, cellHeight
                        );

                        // Dessiner l'image à superposer (overlay)
                        this.ctx.drawImage(
                            overlayImage,
                            indiceSprite * cellWidth, 0,
                            cellWidth, cellHeight,
                            0, 0,
                            cellWidth, cellHeight
                        );

                        this.ctx.restore();
                    } else if (i === 9 && j === 9) {
                        // Instancier un objet de type Fourmiliere
                        const fourmiliere = new Fourmiliere(x, y);
                        //console.log(`Fourmiliere created at grid position (${i}, ${j})`); // Position par rapport au grid
                        // Afficher l'objet Fourmiliere
                        this.displayCell(fourmiliere);

                        const centerX = this.canvas.width / 2;
                        const centerY = this.canvas.height / 2;

                        const newX = centerX - (cellWidth * spacingFactor * 0.01);
                        const newY = centerY - (cellHeight * spacingFactor * 0.01) + (cellHeight * spacingFactor) / 2;

                        const newTreeImage = new Image();
                        newTreeImage.src = '../../ressources/images/fourmiliere.png';
                        newTreeImage.onload = () => {
                            const scaleRatioFourmiliere = 0.25;
                            this.ctx.save();
                            this.ctx.scale(scaleRatioFourmiliere, scaleRatioFourmiliere);
                            this.ctx.drawImage(newTreeImage, newX / scaleRatioFourmiliere, newY / scaleRatioFourmiliere - newTreeImage.height, cellWidth, cellHeight);
                            this.ctx.restore();
                        };
                    } else if (this.grid[i][j] === 0) {
                        const freeCell = new Free(x, y, 1);
                        this.displayCell(freeCell);
                    }
                }
            }
        }
    }



    displayCell(cell) {
        //console.log(`Cell at (${cell.x}, ${cell.y}) created with type: ${cell.GetType()}`); // Position en pixel du canva
        if (cell instanceof Free) {
            //console.log(`Quantity: ${cell.GetQty()}`);
        }
    }

}






