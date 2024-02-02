class AntLayer {
    constructor(canvas, ctx, view) {
        this.view = view;
        this.canvas = canvas;
        this.ctx = ctx;
        this.antImage = new Image();
        this.antImage.src = 'ressources/tiles/ant.png';
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear the canvas
        for (let fourmi of fourmis) {
            this.ctx.save();

            this.ctx.translate(fourmi.x * (130 * 0.31) + this.antImage.width / 2, fourmi.y * (150  * 0.31) + this.antImage.height / 2 + 5);
            let angle;
            switch(fourmi.direction) {
                case 0: angle = 0; break; // gauche
                case 1: angle = Math.PI / 2; break; // haut
                case 2: angle = Math.PI; break; // droite
                case 3: angle = 3 * Math.PI / 2; break; // bas
            }
            this.ctx.rotate(angle);

            this.ctx.drawImage(
                this.antImage,
                -this.antImage.width / 2 * fourmi.size,
                -this.antImage.height / 2 * fourmi.size,
                this.antImage.width * fourmi.size,
                this.antImage.height * fourmi.size
            );

            if (fourmi.carrying > 0) {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, fourmi.size * 10, 0, 2 * Math.PI, false);
                this.ctx.fillStyle = 'yellow';
                this.ctx.fill();
            }

            this.ctx.restore();
        }
    }
}









