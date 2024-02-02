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
                        return new Free(j, i);
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


document.addEventListener('DOMContentLoaded', function () {
    app.view.treeLayer.init();
    app.view.antLayer.init();
    app.view.foodLayer.init();
    Chargement.loadImages(app.view.treeLayer);
});


// Chargement.js
var Chargement = {
    timerInterval: null,
    seconds: 0,
    minutes: 0,
    startBtnClicked: false, // Ajout de la propriété pour suivre si l'écouteur d'événements a déjà été ajouté

    stopTimer: function () {
        clearInterval(Chargement.timerInterval);
    },

    resumeTimer: function () {
        Chargement.timerInterval = setInterval(function () {
            Chargement.seconds++;
            if (Chargement.seconds === 60) {
                Chargement.seconds = 0;
                Chargement.minutes++;
            }

            var timerElement = document.getElementById("timer");
            if (timerElement) {
                timerElement.innerText = (Chargement.minutes < 10 ? "0" : "") + Chargement.minutes + ":" +
                    (Chargement.seconds < 10 ? "0" : "") + Chargement.seconds;
            }
        }, 1000);
    },

    toggleButtons: function (stopBtn, resumeBtn) {
        stopBtn.disabled = true;
        resumeBtn.disabled = false;
    },

    pheromonesActivated: false,

    loadImages: function (labyrinthe) {
        var startBtn = document.getElementById("startBtn");
        var stopBtn = document.getElementById("stopBtn");
        var resumeBtn = document.getElementById("resumeBtn");
        var pheromonesBtn = document.getElementById("pheromonesBtn");

        if (startBtn &&  pheromonesBtn) {
            let startStopImg = document.getElementById("startStopButton");
            startBtn.addEventListener("click", function () { //start
                if(!Chargement.startBtnClicked) {
                    Chargement.startGame();
                    Chargement.startBtnClicked = true;
                    Chargement.togglePause = true;
                    app.isRunning = true;
                    startStopImg.src = "../../ressources/images/stop.png";
                }
                else if(Chargement.togglePause) //stop
                {
                    Chargement.stopTimer();
                    app.isRunning = false;
                    Chargement.togglePause = false;
                    startStopImg.src = "../../ressources/images/start.png";
                }
                else //resume
                {
                    Chargement.resumeTimer();
                    app.isRunning = true;
                    Chargement.togglePause = true;
                    startStopImg.src = "../../ressources/images/stop.png";
                }
                //Chargement.placeRandomImages(labyrinthe);
                // startBtn.disabled = true;
                // stopBtn.disabled = false;
                // resumeBtn.disabled = true;
                // Chargement.pheromonesActivated = true;
            });



            // stopBtn.addEventListener("click", function () {
            //
            //     // Chargement.toggleButtons(stopBtn, resumeBtn);
            //     pheromonesBtn.disabled = true;
            //
            //
            // });

            // resumeBtn.addEventListener("click", function () {
            //     Chargement.resumeTimer();
            //     // Chargement.toggleButtons(resumeBtn, stopBtn);
            //     // pheromonesBtn.disabled = !Chargement.hasPlacedImages();
            // });

            Chargement.pheromoneMode = 0; //0 no display, 1 graphic, 2 numeric
            pheromonesBtn.addEventListener("click", function () {
                let pheromoneImg = document.getElementById("pheromoneButton");
                if (Chargement.pheromoneMode === 0) {
                    pheromoneImg.src = "../../ressources/images/digits.png";
                    Chargement.pheromoneMode = 1;
                }
                else if(Chargement.pheromoneMode === 1)
                {
                    pheromoneImg.src = "../../ressources/images/erase.png";
                    Chargement.pheromoneMode = 2;
                }
                else
                {
                    pheromoneImg.src = "../../ressources/images/pheromone.png";
                    Chargement.pheromoneMode = 0;
                }
            });
        }
    },

    startGame() {
        // Récupérer les valeurs éditables du tableau
        const numberOfAnts = parseInt(document.querySelector('#editableTable tr:nth-child(2) td:last-child').innerText, 10) || 0;
        const numberOfFoods = parseInt(document.querySelector('#editableTable tr:nth-child(3) td:last-child').innerText, 10) || 0;
        const simulationSpeed = parseInt(document.querySelector('#editableTable tr:nth-child(4) td:last-child').innerText, 10) || 0;

        // Démarrer le timer et le reste du jeu
        Chargement.startTimer();
        // Fourmis du tableau
        for (let i = 0; i < numberOfAnts; i++) {
            let ant = new Fourmi(9, 9);
            fourmis.push(ant);
        }
        // Food du tableau
        foods = app.view.foodLayer.generateFood(numberOfFoods, app.cellGrid[9][9]);
        app.view.foodLayer.drawFoods(foods);
        // Speed du tableau
        setInterval(() => {
            if(app.isRunning)
            {
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
                app.view.antLayer.drawAnts(fourmis);

                app.view.pheromonesLayer.drawPheromones(app.cellGrid, Chargement.pheromoneMode);

                app.model.decrementPheromones(app.cellGrid, 0.00001);
            }
        }, simulationSpeed);
    },

    togglePheromones: function (pheromonesBtn, labyrinthe) {
        if (!Chargement.pheromonesActivated) {
            Chargement.activatePheromones(labyrinthe);
        } else {
            Chargement.deactivatePheromones(labyrinthe);
        }
        Chargement.pheromonesActivated = !Chargement.pheromonesActivated;
        pheromonesBtn.disabled = Chargement.pheromonesActivated;
    },

    startTimer: function () {
        Chargement.timerInterval = setInterval(function () {
            Chargement.seconds++;
            if (Chargement.seconds === 60) {
                Chargement.seconds = 0;
                Chargement.minutes++;
            }

            var timerElement = document.getElementById("timer");
            if (timerElement) {
                timerElement.innerText = (Chargement.minutes < 10 ? "0" : "") + Chargement.minutes + ":" +
                    (Chargement.seconds < 10 ? "0" : "") + Chargement.seconds;
            }
        }, 1000);
    },

    placeRandomImages: function (labyrinthe) {
        if (labyrinthe && labyrinthe.grid) {
            var canvas = document.getElementById("trees-canvas");
            var ctx = canvas.getContext("2d");

            var maxImages = 4;
            var cellWidth = canvas.width / labyrinthe.grid[0].length;
            var cellHeight = canvas.height / labyrinthe.grid.length;
        } else {
            console.error("L'objet labyrinthe ou sa propriété grid est indéfini.");
        }
    }
};

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}