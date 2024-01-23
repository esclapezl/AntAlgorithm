class View {
    constructor(div_id) {
        this.width = 500;
        this.height = 500;

        this.treesCanvas = document.getElementById('trees-canvas');
        this.treesCtx = this.treesCanvas.getContext('2d');
        this.treeLayer = new TreeLayer(this.treesCanvas, this.treesCtx);

        this.antsCanvas = document.getElementById('ants-canvas');
        this.antsCtx = this.antsCanvas.getContext('2d');
        this.antLayer = new AntLayer(this.antsCanvas, this.antsCtx);

        this.initView();
    }

    initView () {
        this.treeLayer.init(this.width, this.height);
        this.treeLayer.display();

        this.antLayer.init(this.width, this.height);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const treesCanvas = document.getElementById('trees-canvas');
    const treesCtx = treesCanvas.getContext('2d');

    const treeLayer = new TreeLayer(treesCanvas, treesCtx);
    treeLayer.init();

    // Appel de la fonction loadImages après l'initialisation de treeLayer
    Chargement.loadImages(treeLayer);
});

