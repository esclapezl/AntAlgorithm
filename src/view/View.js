class View {
    constructor() {
        this.width = 500;
        this.height = 500;

        this.treesCanvas = document.getElementById('trees-canvas');
        this.treesCanvas.style.zIndex = '1';
        this.treesCtx = this.treesCanvas.getContext('2d');
        this.treeLayer = new TreeLayer(this.treesCanvas, this.treesCtx, this);

        this.pheromonesCanvas = document.getElementById('pheromones-canvas');
        this.pheromonesCanvas.style.zIndex = '2';
        this.pheromonesCtx = this.pheromonesCanvas.getContext('2d');
        this.pheromonesLayer = new PheromoneLayer(this.pheromonesCanvas, this.pheromonesCtx, this);

        this.foodsCanvas = document.getElementById('foods-canvas');
        this.foodsCanvas.style.zIndex = '3';
        this.foodsCtx = this.foodsCanvas.getContext('2d');
        this.foodLayer = new FoodLayer(this.foodsCanvas, this.foodsCtx, this);

        this.antsCanvas = document.getElementById('ants-canvas');
        this.antsCanvas.style.zIndex = '4';
        this.antsCtx = this.antsCanvas.getContext('2d');
        this.antLayer = new AntLayer(this.antsCanvas, this.antsCtx, this);

        this.init();
    }

    init() {
        this.treeLayer.init();
        this.antLayer.init();
        this.foodLayer.init();
        this.pheromonesLayer.init();
    }

    getTreeLayer() {
        return this.treeLayer;
    }

    getPheromoneLayer() {
        return this.pheromonesLayer;
    }

    getFoodLayer() {
        return this.foodLayer;
    }

    getAntLayer() {
        return this.antLayer;
    }

    bindGetCellGrid(callback) {
        this.getCellGrid = callback;
    }

    bindGetGrid(callback) {
        this.getGrid = callback;
    }
}



