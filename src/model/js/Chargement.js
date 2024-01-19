// Chargement.js
var Chargement = {
    loadImages: function (labyrinthe) {
        console.log("loadImages function called");
        var startBtn = document.getElementById("startBtn");
        if (startBtn) {
            startBtn.addEventListener("click", function () {
                alert("TEST");
                Chargement.placeRandomImages(labyrinthe);
            });
        }
    },

    placeRandomImages: function (labyrinthe) {
        if (labyrinthe && labyrinthe.grid) {
            var grid = document.getElementById("labyrinthe");
            var maxImages = 4;
            var imagesCount = 0;

            for (var y = 0; y < labyrinthe.grid.length; y++) {
                for (var x = 0; x < labyrinthe.grid[y].length; x++) {
                    if (labyrinthe.grid[y][x] === 0 && imagesCount < maxImages) {
                        var imgElement = document.createElement('img');
                        imgElement.src = '../../ressources/images/ant.png';
                        imgElement.alt = 'image';

                        grid.rows[y].cells[x].innerHTML = '';
                        grid.rows[y].cells[x].appendChild(imgElement);

                        imagesCount++;
                    }
                }
            }
        } else {
            console.error("L'objet labyrinthe ou sa propriété grid est indéfini.");
        }
    }
};
