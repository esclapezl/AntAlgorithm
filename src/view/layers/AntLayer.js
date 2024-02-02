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

    drawAnts (fourmis){
        app.view.antsCtx.clearRect(0, 0, app.view.antsCanvas.width, app.view.antsCanvas.height); // clear the canvas
        for (let fourmi of fourmis) {
            app.view.antsCtx.save(); // sauvegarde l'état actuel du canvas

            app.view.antsCtx.translate(fourmi.x * (130 * 0.31) + app.view.antLayer.antImage.width / 2, fourmi.y * (150  * 0.31) + app.view.antLayer.antImage.height / 2 + 5); // déplace l'origine du canvas à la position de la fourmi
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








