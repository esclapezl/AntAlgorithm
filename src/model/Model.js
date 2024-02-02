class Model {
    constructor() {
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

    /**********************************************************************************/
    bindGetAntLayer(callback) {
        this.getAntLayer = callback;
    }

    /**********************************************************************************/
    bindGetPheromoneLayer(callback) {
        this.getPheromoneLayer = callback;
    }

    /**********************************************************************************/
    bindGetTreeLayer(callback) {
        this.getTreeLayer = callback;
    }

    /**********************************************************************************/
    bindGetFoodLayer(callback) {
        this.getFoodLayer = callback;
    }


    /**********************************************************************************/
    decrementPheromones(cellGrid, factor) {
        for (let y = 0; y < cellGrid.length; y++) {
            for (let x = 0; x < cellGrid[y].length; x++) {
                let cell = cellGrid[y][x];
                if (cell.GetType() === 'Free') {
                    cell.pheromone = Math.max(cell.pheromone - factor,0);
                }
            }
        }
    }

    /**********************************************************************************/
    startGame() {
        // Récupére les valeurs éditables du tableau
        const numberOfAnts = parseInt(document.querySelector('#editableTable tr:nth-child(2) td:last-child').innerText, 10) || 0;
        const numberOfFoods = parseInt(document.querySelector('#editableTable tr:nth-child(3) td:last-child').innerText, 10) || 0;
        const simulationSpeed = parseInt(document.querySelector('#editableTable tr:nth-child(4) td:last-child').innerText, 10) || 0;

        // Démarre le timer et le reste du jeu
        this.startTimer();
        for (let i = 0; i < numberOfAnts; i++) {
            let ant = new Fourmi(9, 9, this);
            this.fourmis.push(ant);
        }
        // Food du tableau
        this.foods = this.generateFood(numberOfFoods, this.cellGrid[9][9]);
        this.getFoodLayer().drawFoods(this.foods);

        setInterval(() => {
            if(this.isRunning)
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
                this.getAntLayer().drawAnts(this.fourmis);

                this.getPheromoneLayer().drawPheromones(this.pheromoneMode);

                this.decrementPheromones(this.cellGrid, 0.0005);
            }
        }, simulationSpeed);
    }

    /**********************************************************************************/
    generateFood(nbFood, fourmiliere) {
        let availablePositions = [];
        let fourmilierePosition = { x: fourmiliere.x, y: fourmiliere.y };

        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[y].length; x++) {
                if (this.grid[y][x] === 0 && Math.abs(x - fourmilierePosition.x) > 1 && Math.abs(y - fourmilierePosition.y) > 1) {
                    availablePositions.push({ x: x, y: y });
                }
            }
        }

        // Mélange les positions disponibles
        availablePositions = this.shuffleArray(availablePositions);
        // Place les images sur les positions aléatoires
        let foodsGenerated = []
        for (let i = 0; i < Math.min(nbFood, availablePositions.length); i++) {
            let foodPos = availablePositions.shift();
            let food = new Food(foodPos.x, foodPos.y, 1);
            this.cellGrid[food.y][food.x] = food;
            foodsGenerated.push(food);
        }
        return foodsGenerated;
    }

    /**********************************************************************************/
    stopTimer() {
        clearInterval(this.timerInterval);
    }

    /**********************************************************************************/
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.seconds++;
            if (this.seconds === 60) {
                this.seconds = 0;
                this.minutes++;
            }

            let timerElement = document.getElementById("timer");
            if (timerElement) {
                timerElement.innerText = (this.minutes < 10 ? "0" : "") + this.minutes + ":" +
                    (this.seconds < 10 ? "0" : "") + this.seconds;
            }
        }, 1000);
    }

    /**********************************************************************************/
    loadImages () {
        let startBtn = document.getElementById("startBtn");
        let pheromonesBtn = document.getElementById("pheromonesBtn");

        if (startBtn &&  pheromonesBtn) {
            let startStopImg = document.getElementById("startStopButton");
            startBtn.addEventListener("click", () => { //start
                if(!this.startBtnClicked) {
                    this.startGame();
                    this.startBtnClicked = true;
                    this.togglePause = true;
                    this.isRunning = true;
                    startStopImg.src = "../../ressources/images/stop.png";
                }
                else if(this.togglePause) //stop
                {
                    this.stopTimer();
                    this.isRunning = false;
                    this.togglePause = false;
                    startStopImg.src = "../../ressources/images/start.png";
                }
                else //resume
                {
                    this.startTimer();
                    this.isRunning = true;
                    this.togglePause = true;
                    startStopImg.src = "../../ressources/images/stop.png";
                }
            });

            this.pheromoneMode = 0;
            pheromonesBtn.addEventListener("click", () => {
                let pheromoneImg = document.getElementById("pheromoneButton");
                if (this.pheromoneMode === 0) {
                    pheromoneImg.src = "../../ressources/images/digits.png";
                    this.pheromoneMode = 1;
                    this.getPheromoneLayer().drawPheromones(this.pheromoneMode);
                }
                else if(this.pheromoneMode === 1)
                {
                    pheromoneImg.src = "../../ressources/images/erase.png";
                    this.pheromoneMode = 2;
                    this.getPheromoneLayer().drawPheromones(this.pheromoneMode);
                }
                else
                {
                    pheromoneImg.src = "../../ressources/images/pheromone.png";
                    this.pheromoneMode = 0;
                    this.getPheromoneLayer().drawPheromones(this.pheromoneMode);
                }
            });
        }
    }

    /**********************************************************************************/
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    /**********************************************************************************/
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

    /**********************************************************************************/
    getCellGrid(){
        return this.cellGrid;
    }

    /**********************************************************************************/
    getGrid(){
        return this.grid;
    }
}