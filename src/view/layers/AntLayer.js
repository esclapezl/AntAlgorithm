class AntLayer {
    constructor(canvas, ctx, view) {
        this.view = view;
        this.canvas = canvas;
        this.ctx = ctx;
        this.antImage = new Image();
        this.antImage.src = '../../ressources/tiles/ant.png';
        this.scale = 0.2;
    }

    /**********************************************************************************/
    init() {
        this.cellWidth = 130;
        this.cellHeight = 150;
        this.canvas.width = 755;
        this.canvas.height = 870;
        this.spacingFactor = 0.31;
    }

    /**********************************************************************************/
    drawAnts (fourmis){
        app.view.antsCtx.clearRect(0, 0, app.view.antsCanvas.width, app.view.antsCanvas.height); // clear the canvas
        for (let fourmi of fourmis) {
            app.view.antsCtx.save();

            app.view.antsCtx.translate(fourmi.x * (130 * 0.31) + app.view.antLayer.antImage.width / 2, fourmi.y * (150  * 0.31) + app.view.antLayer.antImage.height / 2 + 5);
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
            );

            if (fourmi.carrying > 0) {
                app.view.antsCtx.beginPath();
                app.view.antsCtx.arc(0, 0, fourmi.size * 10, 0, 2 * Math.PI, false);
                app.view.antsCtx.fillStyle = 'yellow';
                app.view.antsCtx.fill();
            }

            app.view.antsCtx.restore();
        }
    }
}









