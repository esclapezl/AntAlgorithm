// main.js
window.addEventListener("load", function () {
    var labyrinthe = Object.create(LabyrintheMap); // Modifiez ici
    labyrinthe.init(18, 18, 3);
    labyrinthe.display();

    Chargement.loadImages(labyrinthe);
});