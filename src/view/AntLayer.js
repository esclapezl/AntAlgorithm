class AntLayer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.antImage = new Image();
        this.antImage.src = '../../ressources/tiles/ant.png'; // Remplacez 'path/to/tt.png' par le chemin d'accès réel à votre image
        this.scale = 0.2;
    }

    init() {
        const width = 755;
        const height = 870;
        this.canvas.width = width;
        this.canvas.height = height;
    }
}









