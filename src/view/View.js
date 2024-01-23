document.addEventListener('DOMContentLoaded', function () {
    const treesCanvas = document.getElementById('trees-canvas');
    const treesCtx = treesCanvas.getContext('2d');

    const treeLayer = new TreeLayer(treesCanvas, treesCtx);
    treeLayer.init();

    // Appel de la fonction loadImages après l'initialisation de treeLayer
    Chargement.loadImages(treeLayer);
});
