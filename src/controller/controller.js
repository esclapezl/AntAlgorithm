let fourmis = [];
let tickDuration = 1000;

window.addEventListener('keydown', (event) => {
    if (event.key === 'f') {
        fourmis.push(new Fourmi());
    }
});

setInterval(() => {
    for (let fourmi of fourmis) {
        fourmi.move(fourmi.chose(fourmi.scanArea()));
    }
}, tickDuration);