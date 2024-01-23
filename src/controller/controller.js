let fourmis = [];
let tickDuration = 1000;


window.addEventListener('keydown', (event) => {
    if (event.key === 'f') {
        let fourmi = new Fourmi(10,10);
        ctx.fillRect(fourmi.x, fourmi.y, 1, 1); // draw the ant at the new position
        fourmis.push(fourmi);
        console.log('Fourmi ajoutée !');
    }
});

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let antImage = new Image();
antImage.src = '../../ressources/tiles/ant.png'; // Remplacez 'path/to/ant.png' par le chemin d'accès réel à votre image
setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
    for (let fourmi of fourmis) {
        console.log("avant : " + fourmi.x +" : "+ fourmi.y);
        fourmi.move(fourmi.chose(fourmi.scanArea()));

        ctx.save(); // sauvegarde l'état actuel du canvas
        ctx.translate(fourmi.x + antImage.width / 2, fourmi.y + antImage.height / 2); // déplace l'origine du canvas à la position de la fourmi

        // tourne le canvas de l'angle de la direction de la fourmi
        let angle;
        switch(fourmi.direction) {
            case 0: angle = 0; break; // gauche
            case 1: angle = Math.PI / 2; break; // haut
            case 2: angle = Math.PI; break; // droite
            case 3: angle = 3 * Math.PI / 2; break; // bas
        }
        ctx.rotate(angle);

        ctx.drawImage(antImage, -antImage.width / 2, -antImage.height / 2); // dessine l'image de la fourmi centrée sur l'origine du canvas
        ctx.restore(); // restaure l'état précédent du canvas
    }
}, tickDuration);