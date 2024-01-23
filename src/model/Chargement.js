// Chargement.js
var Chargement = {
    timerInterval: null,
    seconds: 0,
    minutes: 0,

    stopTimer: function () {
        // Arrête la minuterie
        clearInterval(Chargement.timerInterval);
    },

    resumeTimer: function () {
        // Reprend la minuterie
        Chargement.timerInterval = setInterval(function () {
            Chargement.seconds++;
            if (Chargement.seconds === 60) {
                Chargement.seconds = 0;
                Chargement.minutes++;
            }

            // Met à jour l'affichage du chronomètre
            var timerElement = document.getElementById("timer");
            if (timerElement) {
                timerElement.innerText = (Chargement.minutes < 10 ? "0" : "") + Chargement.minutes + ":" +
                    (Chargement.seconds < 10 ? "0" : "") + Chargement.seconds;
            }
        }, 1000);
    },

    toggleButtons: function (stopBtn, resumeBtn) {
        // Désactiver le bouton "Stop" et activer le bouton "Reprendre"
        stopBtn.disabled = true;
        resumeBtn.disabled = false;
    },

    // Ajout d'une variable pour suivre l'activation des phéromones
    pheromonesActivated: false,

    loadImages: function (labyrinthe) {
        console.log("loadImages function called");
        var startBtn = document.getElementById("startBtn");
        var stopBtn = document.getElementById("stopBtn");
        var resumeBtn = document.getElementById("resumeBtn");
        var pheromonesBtn = document.getElementById("pheromonesBtn");

        if (startBtn && stopBtn && resumeBtn && pheromonesBtn) {
            startBtn.addEventListener("click", function () {
                Chargement.startTimer();
                Chargement.placeRandomImages(labyrinthe);
                // Désactiver le bouton "Start"
                startBtn.disabled = true;
                // Activer le bouton "Stop" et désactiver le bouton "Reprendre"
                stopBtn.disabled = false;
                resumeBtn.disabled = true;
                // Activer le bouton "Active phéromones" si des images ont été placées
                pheromonesBtn.disabled = !Chargement.hasPlacedImages();
                // Marquer l'activation des phéromones
                Chargement.pheromonesActivated = true;
            });

            stopBtn.addEventListener("click", function () {
                Chargement.stopTimer();
                // Désactiver le bouton "Stop" et activer le bouton "Reprendre"
                Chargement.toggleButtons(stopBtn, resumeBtn);
                // Désactiver le bouton "Active phéromones"
                pheromonesBtn.disabled = true;
            });

            resumeBtn.addEventListener("click", function () {
                Chargement.resumeTimer();
                // Désactiver le bouton "Reprendre" et activer le bouton "Stop"
                Chargement.toggleButtons(resumeBtn, stopBtn);
                // Activer le bouton "Active phéromones" si des images ont été placées
                pheromonesBtn.disabled = !Chargement.hasPlacedImages();
            });

            pheromonesBtn.addEventListener("click", function () {
                // Vérifier si le bouton "Start" a été cliqué
                if (Chargement.pheromonesActivated) {
                    // Activer les phéromones
                    Chargement.activatePheromones(labyrinthe);
                    // Désactiver le bouton "Active phéromones" après utilisation
                    pheromonesBtn.disabled = true;
                }
            });
        }
    },

    // Fonction pour vérifier si des images ont été placées
    hasPlacedImages: function () {
        // Vérifier le nombre d'images placées sur le canvas
        // Vous devrez adapter cela en fonction de la logique que vous utilisez pour placer les images
        // Par exemple, si vous placez des images sur chaque cellule libre, vous pouvez vérifier si la grille contient des cellules libres
        return true;
    },

    activatePheromones: function (labyrinthe) {
        if (labyrinthe && labyrinthe.grid) {
            var canvas = document.getElementById("trees-canvas");
            var ctx = canvas.getContext("2d");

            var cellWidth = canvas.width / labyrinthe.grid[0].length;
            var cellHeight = canvas.height / labyrinthe.grid.length;

            // Parcourt toutes les cellules du labyrinthe
            for (var y = 0; y < labyrinthe.grid.length; y++) {
                for (var x = 0; x < labyrinthe.grid[y].length; x++) {
                    // Si la cellule est libre (valeur 0 dans le labyrinthe)
                    if (labyrinthe.grid[y][x] === 0) {
                        // Dessine un petit point blanc sur la cellule
                        ctx.fillStyle = "white";
                        ctx.fillRect(x * cellWidth + cellWidth / 2 - 2, y * cellHeight + cellHeight / 2 - 2, 4, 4);
                    }
                }
            }
        } else {
            console.error("L'objet labyrinthe ou sa propriété grid est indéfini.");
        }
    },

    startTimer: function () {
        // Démarre la minuterie qui incrémente les secondes chaque seconde
        Chargement.timerInterval = setInterval(function () {
            Chargement.seconds++;
            if (Chargement.seconds === 60) {
                Chargement.seconds = 0;
                Chargement.minutes++;
            }

            // Met à jour l'affichage du chronomètre
            var timerElement = document.getElementById("timer");
            if (timerElement) {
                timerElement.innerText = (Chargement.minutes < 10 ? "0" : "") + Chargement.minutes + ":" +
                    (Chargement.seconds < 10 ? "0" : "") + Chargement.seconds;
            }
        }, 1000);
    },

    // Place de manière random sur une cellule free la bouffe
    placeRandomImages: function (labyrinthe) {
        if (labyrinthe && labyrinthe.grid) {
            var canvas = document.getElementById("trees-canvas");
            var ctx = canvas.getContext("2d");

            var maxImages = 4;
            var cellWidth = canvas.width / labyrinthe.grid[0].length;
            var cellHeight = canvas.height / labyrinthe.grid.length;

            var availablePositions = [];

            // Collecter toutes les positions disponibles
            for (var y = 0; y < labyrinthe.grid.length; y++) {
                for (var x = 0; x < labyrinthe.grid[y].length; x++) {
                    if (labyrinthe.grid[y][x] === 0) {
                        availablePositions.push({ x: x, y: y });
                    }
                }
            }

            // Mélanger les positions disponibles
            availablePositions = shuffleArray(availablePositions);

            // Placer les images sur les positions aléatoires
            for (var i = 0; i < Math.min(maxImages, availablePositions.length); i++) {
                // Utilisation d'une IIFE pour capturer la valeur actuelle de i
                (function (currentI) {
                    var imgElement = new Image();
                    imgElement.src = '../../ressources/images/ble.png';

                    imgElement.onload = function () {
                        ctx.drawImage(imgElement, availablePositions[currentI].x * cellWidth, availablePositions[currentI].y * cellHeight, cellWidth, cellHeight);
                    };
                })(i);
            }
        } else {
            console.error("L'objet labyrinthe ou sa propriété grid est indéfini.");
        }
    }


};

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}