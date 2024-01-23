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

    drawAnts (fourmis){
        for (let fourmi of fourmis) {
            app.view.antsCtx.save(); // sauvegarde l'état actuel du canvas
            app.view.antsCtx.translate(fourmi.x * fourmi.step + app.view.antLayer.antImage.width / 2, fourmi.y * fourmi.step + app.view.antLayer.antImage.height / 2); // déplace l'origine du canvas à la position de la fourmi

            // tourne le canvas de l'angle de la direction de la fourmi
            let angle;
            switch(fourmi.direction) {
                case 0: angle = 0; break; // gauche
                case 1: angle = Math.PI / 2; break; // haut
                case 2: angle = Math.PI; break; // droite
                case 3: angle = 3 * Math.PI / 2; break; // bas
            }
            app.view.antsCtx.rotate(angle);

            app.view.antsCtx.drawImage(
                app.view.antLayer.antImage,
                -app.view.antLayer.antImage.width / 2 * fourmi.size,
                -app.view.antLayer.antImage.height / 2 * fourmi.size,
                app.view.antLayer.antImage.width * fourmi.size,
                app.view.antLayer.antImage.height * fourmi.size
            ); // dessine l'image de la fourmi centrée sur l'origine du canvas

            if (fourmi.carrying > 0) {
                app.view.antsCtx.beginPath();
                app.view.antsCtx.arc(0, 0, fourmi.size * 10, 0, 2 * Math.PI, false); // draw a circle
                app.view.antsCtx.fillStyle = 'yellow'; // set the fill color
                app.view.antsCtx.fill(); // fill the circle
            }

            app.view.antsCtx.restore(); // restaure l'état précédent du canvas
        }
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

