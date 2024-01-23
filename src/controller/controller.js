let width = 500;
let height = 500;

let treesCanvas = document.getElementById('trees-canvas');
let treesCtx = treesCanvas.getContext('2d');
let treeLayer = new TreeLayer(treesCanvas, treesCtx);
treeLayer.init(width, height);
treeLayer.display();

let antsCanvas = document.getElementById('ants-canvas');
let antsCtx = antsCanvas.getContext('2d');
let antLayer = new AntLayer(antsCanvas, antsCtx);
antLayer.init(width, height);
