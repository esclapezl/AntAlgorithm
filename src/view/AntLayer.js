class AntLayer {
    constructor(canva, ctx) {
        this.canva = canva;
        this.ctx = ctx;
        this.antImage = new Image();
        this.antImage.src = '../../ressources/tiles/ant.png'; // Remplacez 'path/to/tt.png' par le chemin d'accès réel à votre image
    }
    init(width, height) {
        this.canva.width = width;
        this.canva.height = height;
    }

    display(){
        let grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        for(let i = 0; i < grid.length; i++)
        {
            for(let j = 0; j < grid[0].length; j++)
            {
                if(grid[i][j] === 1)
                {
                    antsCtx.save();
                    antsCtx.translate(j + antLayer.antImage.width / 2, i + antLayer.antImage.height / 2); // déplace l'origine du canvas à la position de la fourmi
                    antsCtx.drawImage(antLayer.antImage, -antLayer.antImage.width / 2, -antLayer.antImage.height / 2); // dessine l'image de la fourmi centrée sur l'origine du canvas
                    antsCtx.restore(); // restaure l'état précédent du canvas
                }
            }
        }

    }
}

let fourmis = [];
let tickDuration = 1000;
window.addEventListener('keydown', (event) => {
    if (event.key === 'f') {
        let fourmi = new Fourmi(10,10);
        fourmis.push(fourmi);
        console.log('Fourmi ajoutée !');
    }
});

setInterval(() => {
    antsCtx.clearRect(0, 0, antsCanvas.width, antsCanvas.height); // clear the canvas
    for (let fourmi of fourmis) {
        fourmi.move(fourmi.chose(fourmi.scanArea()));

        antsCtx.save(); // sauvegarde l'état actuel du canvas
        antsCtx.translate(fourmi.x + antLayer.antImage.width / 2, fourmi.y + antLayer.antImage.height / 2); // déplace l'origine du canvas à la position de la fourmi

        // tourne le canvas de l'angle de la direction de la fourmi
        let angle;
        switch(fourmi.direction) {
            case 0: angle = 0; break; // gauche
            case 1: angle = Math.PI / 2; break; // haut
            case 2: angle = Math.PI; break; // droite
            case 3: angle = 3 * Math.PI / 2; break; // bas
        }
        antsCtx.rotate(angle);

        antsCtx.drawImage(antLayer.antImage, -antLayer.antImage.width / 2, -antLayer.antImage.height / 2); // dessine l'image de la fourmi centrée sur l'origine du canvas
        antsCtx.restore(); // restaure l'état précédent du canvas
    }
}, tickDuration);





