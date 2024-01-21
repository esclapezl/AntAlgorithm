import { Fourmi } from '../model/js/Fourmi.js';
import { Vue } from '../view/View.js';

let fourmis = [];
let view = new View();
let tickDuration = 1000;

window.addEventListener('keydown', (event) => {
    if (event.key === 'f') {
        console.log("coucou");
        fourmis.push(new Fourmi());
    }
});

setInterval(() => {
    for (let fourmi of fourmis) {
        fourmi.deplacer();
    }
    view.dessiner(fourmis);
}, tickDuration);