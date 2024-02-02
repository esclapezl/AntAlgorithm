class Model {
    constructor() {
        this.URL = 'https://api.chucknorris.io/jokes/random';
        this.timerInterval = null;
        this.seconds = 0;
        this.minutes = 0;
        this.startBtnClicked = false;
        this.fourmis = [];
        this.foods = [];
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
    }

    // Binding.
    bindDisplayCNF (callback) {
        // Définition d'une nouvelle propriété pouvant être utilisée à partir d'une instance de Model.
        this.DisplayCNF = callback; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
    }

    bindDrawAnts (callback) {
        this.drawAnts = callback;
    }

    bindGetAntLayer(callback) {
        this.getAntLayer = callback;
    }

    bindGetPheromoneLayer(callback) {
        this.getPheromoneLayer = callback;
    }

    bindGetTreeLayer(callback) {
        this.getTreeLayer = callback;
    }

    bindGetFoodLayer(callback) {
        this.getFoodLayer = callback;
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
        for (let i = 0; i < numberOfAnts; i++) {
            let ant = new Fourmi(9, 9, this);
            this.fourmis.push(ant);
        }
        // Food du tableau
        this.foods = this.generateFood(numberOfFoods, this.cellGrid[9][9]);
        this.getFoodLayer().drawFoods(this.foods);
        // Speed du tableau
        setInterval(() => {
            if(app.isRunning)
            {
                for (let fourmi of this.fourmis) {
                    if(fourmi.isAtCenter()){
                        fourmi.checkObjective(this.cellGrid[fourmi.y][fourmi.x]);
                        if (fourmi.carrying === 0) {
                            fourmi.moveToward(fourmi.chose(fourmi.scanArea(this.cellGrid)));
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
                app.view.antLayer.drawAnts(this.fourmis);

                app.view.pheromonesLayer.drawPheromones(this.pheromoneMode);

                app.model.decrementPheromones(this.cellGrid, 0.0005);
            }
        }, simulationSpeed);
    }

    generateFood(nbFood, fourmiliere) {
        let availablePositions = [];
        let fourmilierePosition = { x: fourmiliere.x, y: fourmiliere.y }; // Remplacez par la position réelle de la fourmilière

        // Collecter toutes les positions disponibles
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                // Vérifier si la position est à une distance de plus d'une case de la fourmilière
                if (this.grid[y][x] === 0 && Math.abs(x - fourmilierePosition.x) > 1 && Math.abs(y - fourmilierePosition.y) > 1) {
                    availablePositions.push({ x: x, y: y });
                }
            }
        }

        // Mélanger les positions disponibles
        availablePositions = app.model.shuffleArray(availablePositions);
        // Placer les images sur les positions aléatoires
        let foodsGenerated = []
        for (let i = 0; i < Math.min(nbFood, availablePositions.length); i++) {
            let foodPos = availablePositions.shift();
            let food = new Food(foodPos.x, foodPos.y, 1);
            this.cellGrid[food.y][food.x] = food;
            foodsGenerated.push(food);
        }
        return foodsGenerated;
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
                else if(app.model.togglePause) //stop
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
                    app.view.pheromonesLayer.drawPheromones(app.model.pheromoneMode);
                }
                else if(app.model.pheromoneMode === 1)
                {
                    pheromoneImg.src = "../../ressources/images/erase.png";
                    app.model.pheromoneMode = 2;
                    app.view.pheromonesLayer.drawPheromones(app.model.pheromoneMode);
                }
                else
                {
                    pheromoneImg.src = "../../ressources/images/pheromone.png";
                    app.model.pheromoneMode = 0;
                    app.view.pheromonesLayer.drawPheromones(app.model.pheromoneMode);
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
                    default:
                        return new Cell(j, i);
                }
            })
        );
    }

    getCellGrid(){
        return this.cellGrid;
    }

    getGrid(){
        return this.grid;
    }
}