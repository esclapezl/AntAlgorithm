class AntLayer {
    constructor(canva, ctx) {
        this.canva = canva;
        this.ctx = ctx;
        this.antImage = new Image();
        this.antImage.src = '../../ressources/tiles/ant.png'; // Remplacez 'path/to/tt.png' par le chemin d'accès réel à votre image
        this.scale = 0.2;
    }
    init(width, height) {
        this.canva.width = width;
        this.canva.height = height;
    }
}









