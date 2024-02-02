class Model {
    constructor() {
        this.URL = 'https://api.chucknorris.io/jokes/random';
        this.timerInterval = null;
        this.seconds = 0;
        this.minutes = 0;
        this.startBtnClicked = false;
    }

    // Binding.
    bindDisplayCNF (callback) {
        // Définition d'une nouvelle propriété pouvant être utilisée à partir d'une instance de Model.
        this.DisplayCNF = callback; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
    }

    bindDrawAnts (callback) {
        this.drawAnts = callback;
    }

    getCNF () {
        fetch(this.URL)
            .then(response => response.json())
            .then(response => {
                let text = 'No Chuck Norris Fact found.';
                if (response.value) {
                    text = response.value;
                }
                this.DisplayCNF(text);
            })
            .catch(error => {
                console.log("Error : " + error);
            });
    }

    decrementPheromones(cellGrid, factor) {
        // Parcourir chaque cellule de la grille
        for (let y = 0; y < cellGrid.length; y++) {
            for (let x = 0; x < cellGrid[y].length; x++) {
                let cell = cellGrid[y][x];
                if (cell.GetType() === 'Free') {
                    cell.pheromone = Math.max(cell.pheromone - factor,0);
                }
            }
        }
    }

    startGame() {
        // Récupérer les valeurs éditables du tableau
        const numberOfAnts = parseInt(document.querySelector('#editableTable tr:nth-child(2) td:last-child').innerText, 10) || 0;
        const numberOfFoods = parseInt(document.querySelector('#editableTable tr:nth-child(3) td:last-child').innerText, 10) || 0;
        const simulationSpeed = parseInt(document.querySelector('#editableTable tr:nth-child(4) td:last-child').innerText, 10) || 0;

        // Démarrer le timer et le reste du jeu
        this.startTimer();
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

                app.view.pheromonesLayer.drawPheromones(app.cellGrid, this.pheromoneMode);

                app.model.decrementPheromones(app.cellGrid, 0.0005);
            }
        }, simulationSpeed);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    startTimer() {
        this.timerInterval = setInterval(function () {
            app.model.seconds++;
            if (app.model.seconds === 60) {
                app.model.seconds = 0;
                app.model.minutes++;
            }

            let timerElement = document.getElementById("timer");
            if (timerElement) {
                timerElement.innerText = (app.model.minutes < 10 ? "0" : "") + app.model.minutes + ":" +
                    (app.model.seconds < 10 ? "0" : "") + app.model.seconds;
            }
        }, 1000);
    }

    loadImages () {
        let startBtn = document.getElementById("startBtn");
        let pheromonesBtn = document.getElementById("pheromonesBtn");

        if (startBtn &&  pheromonesBtn) {
            let startStopImg = document.getElementById("startStopButton");
            startBtn.addEventListener("click", function () { //start
                if(!app.model.startBtnClicked) {
                    app.model.startGame();
                    app.model.startBtnClicked = true;
                    app.model.togglePause = true;
                    app.isRunning = true;
                    startStopImg.src = "../../ressources/images/stop.png";
                }
                else if(this.togglePause) //stop
                {
                    app.model.stopTimer();
                    app.isRunning = false;
                    app.model.togglePause = false;
                    startStopImg.src = "../../ressources/images/start.png";
                }
                else //resume
                {
                    app.model.startTimer();
                    app.isRunning = true;
                    app.model.togglePause = true;
                    startStopImg.src = "../../ressources/images/stop.png";
                }
            });

            this.pheromoneMode = 0;
            pheromonesBtn.addEventListener("click", function () {
                let pheromoneImg = document.getElementById("pheromoneButton");
                if (app.model.pheromoneMode === 0) {
                    pheromoneImg.src = "../../ressources/images/digits.png";
                    app.model.pheromoneMode = 1;
                }
                else if(app.model.pheromoneMode === 1)
                {
                    pheromoneImg.src = "../../ressources/images/erase.png";
                    app.model.pheromoneMode = 2;
                }
                else
                {
                    pheromoneImg.src = "../../ressources/images/pheromone.png";
                    app.model.pheromoneMode = 0;
                }
            });
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

}