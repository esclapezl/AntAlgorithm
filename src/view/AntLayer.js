class AntLayer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.antImage = new Image();
        this.antImage.src = '../../ressources/tiles/ant.png'; // Remplacez 'path/to/tt.png' par le chemin d'accès réel à votre image
        this.scale = 0.2;
    }

    init() {
        this.cellWidth = 130;
        this.cellHeight = 150;
        this.canvas.width = 755;
        this.canvas.height = 870;
        this.spacingFactor = 0.31;
    }
}









