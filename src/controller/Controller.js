class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.grid = [
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
        /*** Bindings ***
         La fonction bind() permet de sceller le contexte dans lequel la fonction sera appelée.
         Dans cet exemple, on veut toujours que les fonctions bindDisplayCNF() et bindGetCNF() (de cette classe) soient appelées dans le contexte du Controller.
         Ce contexte est primordial car il permet d'accéder aux attributs de notre classe.
         ---
         Sans la fonction bind(), les différentes fonctions passées en callback seraient appelées dans le contexte de la classe qu'il l'exécute.
         Par conséquent, nous ne pourrions pas accéder à la View depuis le Model ou au Model depuis la View.
         */
        // this.bindDisplayCNF = this.bindDisplayCNF.bind(this);
        // this.model.bindDisplayCNF(this.bindDisplayCNF);
        //
        // this.bindGetCNF = this.bindGetCNF.bind(this);
        // this.view.bindGetCNF(this.bindGetCNF);

        this.bindDrawAnts = this.bindDrawAnts.bind(this);
        this.model.bindDrawAnts(this.bindDrawAnts);
    }

    // bindDisplayCNF (cnf_value) {
    //     this.view.displayCNF(cnf_value);
    // }
    //
    // bindGetCNF () {
    //     this.model.getCNF();
    // }

    bindDrawAnts () {
        this.view.drawAnts();
    }
}

const app = new Controller(new Model(), new View());

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
    app.view.antsCtx.clearRect(0, 0, app.view.antsCanvas.width, app.view.antsCanvas.height); // clear the canvas
    for (let fourmi of fourmis) {
        fourmi.move(fourmi.chose(fourmi.scanArea(app.grid)));

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

        app.view.antsCtx.drawImage(app.view.antLayer.antImage, -app.view.antLayer.antImage.width / 2 * fourmi.size, -app.view.antLayer.antImage.height / 2 * fourmi.size); // dessine l'image de la fourmi centrée sur l'origine du canvas
        app.view.antsCtx.restore(); // restaure l'état précédent du canvas
    }
}, tickDuration);