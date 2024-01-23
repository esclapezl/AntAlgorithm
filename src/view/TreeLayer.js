class TreeLayer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.treeImage = new Image();
        this.treeImage.src = '../../ressources/images/tt.png';
        this.treeImage.onload = () => {
            console.log("Image loaded");
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
        const width = 715;
        const height = 725;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    display() {
        const cellWidth = 40;
        const cellHeight = 40;

        console.log("Tree loaded");
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                if (this.grid[i][j] === 1) {
                    // Afficher l'image de l'arbre
                    this.ctx.save();
                    this.ctx.translate(j * cellWidth, i * cellHeight);
                    this.ctx.drawImage(this.treeImage, 0, 0, cellWidth, cellHeight);
                    this.ctx.restore();
                } else if (i === 9 && j === 9) {
                    // Place une nouvelle image à la position (9, 9)
                    const newX = j * cellWidth;
                    const newY = i * cellHeight;
                    const newTreeImage = new Image();
                    newTreeImage.src = '../../ressources/images/fourmiliere.png';
                    newTreeImage.onload = () => {
                        this.ctx.drawImage(newTreeImage, newX, newY, cellWidth, cellHeight);
                    };
                }else if (this.grid[i][j] === 0) {
                    // Instancie une cellule Free à la place de 0
                    const freeCell = new Free(j * cellWidth, i * cellHeight, 3);
                    this.displayCell(freeCell);
                }
            }
        }
    }

    displayCell(cell) {
        console.log(`Cell at (${cell.x}, ${cell.y}) created with type: ${cell.GetType()}`);
        if (cell instanceof Free) {
            console.log(`Quantity: ${cell.GetQty()}`);
        }
    }

}






