class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.bindGetAntLayer = this.bindGetAntLayer.bind(this);
        this.model.bindGetAntLayer(this.bindGetAntLayer);

        this.bindGetPheromoneLayer = this.bindGetPheromoneLayer.bind(this);
        this.model.bindGetPheromoneLayer(this.bindGetPheromoneLayer);

        this.bindGetTreeLayer = this.bindGetTreeLayer.bind(this);
        this.model.bindGetTreeLayer(this.bindGetTreeLayer);

        this.bindGetFoodLayer = this.bindGetFoodLayer.bind(this);
        this.model.bindGetFoodLayer(this.bindGetFoodLayer);

        this.bindGetCellGrid = this.bindGetCellGrid.bind(this);
        this.view.bindGetCellGrid(this.bindGetCellGrid);

        this.bindGetGrid = this.bindGetGrid.bind(this);
        this.view.bindGetGrid(this.bindGetGrid);
    }

    /**********************************************************************************/
    bindGetAntLayer() {
        return this.view.getAntLayer();
    }

    /**********************************************************************************/
    bindGetPheromoneLayer() {
        return this.view.getPheromoneLayer();
    }

    /**********************************************************************************/
    bindGetTreeLayer() {
        return this.view.getTreeLayer();
    }

    /**********************************************************************************/
    bindGetFoodLayer() {
        return this.view.getFoodLayer();
    }

    /**********************************************************************************/
    bindGetCellGrid() {
        return this.model.getCellGrid();
    }

    /**********************************************************************************/
    bindGetGrid() {
        return this.model.getGrid();
    }
}

const app = new Controller(new Model(), new View());
document.addEventListener('DOMContentLoaded', function () {
    app.view.init();
    app.model.loadImages(app.view.treeLayer);
});
