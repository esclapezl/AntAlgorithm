document.addEventListener('DOMContentLoaded', function () {
    const treesCanvas = document.getElementById('trees-canvas');
    const treesCtx = treesCanvas.getContext('2d');

    const treeLayer = new TreeLayer(treesCanvas, treesCtx);
    treeLayer.init();
});
