// Chargement.js
var Chargement = {
    loadImages: function (labyrinthe) {
        console.log("loadImages function called");
        var startBtn = document.getElementById("startBtn");
        if (startBtn) {
            startBtn.addEventListener("click", function () {
                Chargement.placeRandomImages(labyrinthe);
            });
        }
    },

    placeRandomImages: function (labyrinthe) {
        if (labyrinthe && labyrinthe.grid) {
            var grid = document.getElementById("labyrinthe");
            var maxImages = 4;
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
                var imgElement = document.createElement('img');
                imgElement.src = '../../ressources/images/ble.png';
                imgElement.alt = 'image';

                grid.rows[availablePositions[i].y].cells[availablePositions[i].x].innerHTML = '';
                grid.rows[availablePositions[i].y].cells[availablePositions[i].x].appendChild(imgElement);
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