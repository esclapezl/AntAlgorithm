// main.js
var labyrinthe = Object.create(LabyrintheMap); // Modifiez ici
window.addEventListener("load", function () {
    labyrinthe.init(18, 18, 3);
    labyrinthe.display();
    Chargement.loadImages(labyrinthe);
});