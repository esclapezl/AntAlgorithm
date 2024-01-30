class FoodLayer {
    constructor(canvas, ctx) {
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
        var availablePositions = [];
        var fourmilierePosition = { x: fourmiliere.x, y: fourmiliere.y }; // Remplacez par la position réelle de la fourmilière

        // Collecter toutes les positions disponibles
        for (var y = 0; y < app.grid.length; y++) {
            for (var x = 0; x < app.grid[y].length; x++) {
                // Vérifier si la position est à une distance de plus d'une case de la fourmilière
                if (app.grid[y][x] === 0 && Math.abs(x - fourmilierePosition.x) > 1 && Math.abs(y - fourmilierePosition.y) > 1) {
                    availablePositions.push({ x: x, y: y });
                }
            }
        }

        // Mélanger les positions disponibles
        availablePositions = shuffleArray(availablePositions);
        // Placer les images sur les positions aléatoires
        let foodsGenerated = []
        for (var i = 0; i < Math.min(nbFood, availablePositions.length); i++) {
            let foodPos = availablePositions.shift();
            let food = new Food(foodPos.x, foodPos.y, 1);
            app.cellGrid[food.y][food.x] = food;
            foodsGenerated.push(food);
        }
        return foodsGenerated;
    }

    drawFoods(foods){
        app.view.foodsCtx.clearRect(0, 0, app.view.foodsCanvas.width, app.view.foodsCanvas.height);
        for (let food of foods) {
            let scale = this.scale * food.quantity;
            this.ctx.drawImage(this.foodImage,
                food.x * this.cellWidth * this.spacingFactor + this.foodImage.width / 2 + (this.cellWidth * scale) / 2,
                food.y * this.cellHeight * this.spacingFactor + this.foodImage.height / 2 + (this.cellHeight * scale) / 2,
                this.cellWidth * scale,
                this.cellHeight * scale);
        }
    }
}