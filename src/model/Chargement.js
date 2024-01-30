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

        if (startBtn && stopBtn && resumeBtn && pheromonesBtn) {
            if (!this.startBtnClicked) {
                startBtn.addEventListener("click", function () {
                    console.log("clicked0");
                    Chargement.startTimer();
                    Chargement.placeRandomImages(labyrinthe);
                    startBtn.disabled = true;
                    stopBtn.disabled = false;
                    resumeBtn.disabled = true;
                    Chargement.pheromonesActivated = true;

                    foods = app.view.foodLayer.generateFood(5, app.cellGrid[9][9]);
                    app.view.foodLayer.drawFoods(foods);

                    let fourmi = new Fourmi(9,9);
                    fourmis.push(fourmi);
                    console.log('Fourmi ajoutée !');
                });
                this.startBtnClicked = true;
            }

            stopBtn.addEventListener("click", function () {
                Chargement.stopTimer();
                Chargement.toggleButtons(stopBtn, resumeBtn);
                pheromonesBtn.disabled = true;
            });

            resumeBtn.addEventListener("click", function () {
                Chargement.resumeTimer();
                Chargement.toggleButtons(resumeBtn, stopBtn);
                pheromonesBtn.disabled = !Chargement.hasPlacedImages();
            });

            pheromonesBtn.addEventListener("click", function () {
                if (Chargement.pheromonesActivated) {
                    Chargement.activatePheromones(labyrinthe);
                    pheromonesBtn.disabled = true;
                }
            });
        }
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