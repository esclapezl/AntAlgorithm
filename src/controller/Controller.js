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
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.cellGrid = this.translateGrid();
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

    translateGrid() {
        return this.grid.map((row, i) =>
            row.map((cell, j) => {
                switch (cell) {
                    case 0:
                        return new Free(j, i, Math.random());
                    case 1:
                        return new Obstacle(j, i);
                    case 2:
                        return new Fourmiliere(j, i);
                    case 3:
                        return new Objective(j, i);
                    default:
                        return new Cell(j, i);
                }
            })
        );
    }
}


// Your code that uses View.js goes here
const app = new Controller(new Model(), new View());
let fourmis = [];
let foods = [];
let tickDuration = 12;
let transition = 10;

document.addEventListener('DOMContentLoaded', function () {
    app.view.treeLayer.init();
    app.view.antLayer.init();
    app.view.foodLayer.init();
    Chargement.loadImages(app.view.treeLayer);
});
window.addEventListener('keydown', (event) => {
    if (event.key === 'f') {

        let fourmi = new Fourmi(9,9);
        fourmis.push(fourmi);
        console.log('Fourmi ajoutée !');
    }
});

setInterval(() => {
    for (let fourmi of fourmis) {
        if(fourmi.isAtCenter()){
            fourmi.checkObjective(app.cellGrid[fourmi.y][fourmi.x]);
            if (fourmi.carrying === 0) {
                fourmi.moveToward(fourmi.chose(fourmi.scanArea(app.cellGrid)));
            } else {
                if(fourmi.isAtCenter()
                    && fourmi.x === fourmi.goHome().x
                    && fourmi.y === fourmi.goHome().y)
                {
                    fourmi.nextCellToHome()
                }
                fourmi.moveToward(fourmi.goHome())
            }
        }
        else
        {
            fourmi.move()
        }

    }
    app.view.drawAnts(fourmis);
}, tickDuration);