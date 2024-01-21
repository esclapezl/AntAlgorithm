export class View {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    }

    dessiner(fourmis) {
        // Efface le canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dessine chaque fourmi
        for (let fourmi of fourmis) {
            this.context.beginPath();
            this.context.arc(fourmi.position.x, fourmi.position.y, 5, 0, 2 * Math.PI);
            this.context.fill();
        }
    }
}