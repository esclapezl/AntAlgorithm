class View {
    constructor() {
        this.width = 500;
        this.height = 500;

        this.treesCanvas = document.getElementById('trees-canvas');
        this.treesCanvas.style.zIndex = '1';
        this.treesCtx = this.treesCanvas.getContext('2d');
        this.treeLayer = new TreeLayer(this.treesCanvas, this.treesCtx);

        this.pheromonesCanvas = document.getElementById('pheromones-canvas');
        this.pheromonesCanvas.style.zIndex = '2';
        this.pheromonesCtx = this.pheromonesCanvas.getContext('2d');
        this.pheromonesLayer = new PheromoneLayer(this.pheromonesCanvas, this.pheromonesCtx);

        this.foodsCanvas = document.getElementById('foods-canvas');
        this.foodsCanvas.style.zIndex = '3';
        this.foodsCtx = this.foodsCanvas.getContext('2d');
        this.foodLayer = new FoodLayer(this.foodsCanvas, this.foodsCtx);

        this.antsCanvas = document.getElementById('ants-canvas');
        this.antsCanvas.style.zIndex = '4';
        this.antsCtx = this.antsCanvas.getContext('2d');
        this.antLayer = new AntLayer(this.antsCanvas, this.antsCtx);

        this.initView();
    }

    initView () {
        this.treeLayer.init(this.width, this.height);
        this.treeLayer.display();
        this.antLayer.init(this.width, this.height);
        this.foodLayer.init(this.width, this.height);
        this.pheromonesLayer.init(this.width, this.height);
    }

    drawFood(foods){
        app.view.foodsCtx.clearRect(0, 0, app.view.antsCanvas.width, app.view.antsCanvas.height); // clear the canvas
        for (let food of foods) {

        }
    }
}



