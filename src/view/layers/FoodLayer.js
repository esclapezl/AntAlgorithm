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