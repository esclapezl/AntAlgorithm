class FoodLayer {
    constructor(canvas, ctx, view) {
        this.view = view;
        this.canvas = canvas;
        this.ctx = ctx;
        this.foodImage = new Image();
        this.foodImage.src = '../../ressources/images/ble.png';
        this.scale = 0.2;
    }

    init() {
        this.cellWidth = 130;
        this.cellHeight = 150;
        this.canvas.width = 755;
        this.canvas.height = 870;
        this.spacingFactor = 0.31;
    }

    generateFood(nbFood, fourmiliere) {
        let availablePositions = [];
        let fourmilierePosition = { x: fourmiliere.x, y: fourmiliere.y }; // Remplacez par la position réelle de la fourmilière

        // Collecter toutes les positions disponibles
        for (let y = 0; y < this.view.getCellGrid.length; y++) {
            for (let x = 0; x < this.view.getCellGrid[y].length; x++) {
                // Vérifier si la position est à une distance de plus d'une case de la fourmilière
                if (this.view.getGrid[y][x] === 0 && Math.abs(x - fourmilierePosition.x) > 1 && Math.abs(y - fourmilierePosition.y) > 1) {
                    availablePositions.push({ x: x, y: y });
                }
            }
        }

        // Mélanger les positions disponibles
        availablePositions = app.model.shuffleArray(availablePositions);
        // Placer les images sur les positions aléatoires
        let foodsGenerated = []
        for (let i = 0; i < Math.min(nbFood, availablePositions.length); i++) {
            let foodPos = availablePositions.shift();
            let food = new Food(foodPos.x, foodPos.y, 1);
            this.view.getGrid[food.y][food.x] = food;
            foodsGenerated.push(food);
        }
        return foodsGenerated;
    }

    drawFoods(foods){
        this.view.foodsCtx.clearRect(0, 0, this.view.foodsCanvas.width, this.view.foodsCanvas.height);
        for (let food of foods) {
            let scale = (0.2 + this.scale * food.quantity) / 2;
            let imageWidth = this.cellWidth * scale;
            let imageHeight = this.cellHeight * scale;

            this.ctx.drawImage(this.foodImage,
                food.x * this.cellWidth * this.spacingFactor + this.cellWidth / 4 - imageWidth / 2,
                food.y * this.cellHeight * this.spacingFactor + this.cellHeight / 4 - imageHeight / 2,
                imageWidth,
                imageHeight);
        }
    }
}