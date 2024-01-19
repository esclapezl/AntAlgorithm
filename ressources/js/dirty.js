var counterValue = 0;
var intervalId;

function toggleCounter() {
    if (intervalId) {
        stopCounter();
        document.getElementById("startBtn").style.display = "none";
        document.getElementById("stopBtn").style.display = "none";
        document.getElementById("resumeBtn").style.display = "inline-block";
    } else {
        startCounter();
        document.getElementById("startBtn").style.display = "none";
        document.getElementById("stopBtn").style.display = "inline-block";
        document.getElementById("resumeBtn").style.display = "none";
    }
}

function startCounter() {
    counterValue = 0;
    updateCounter();

    intervalId = setInterval(function () {
        counterValue++;
        updateCounter();
    }, 1000);
}

function stopCounter() {
    clearInterval(intervalId);
    intervalId = null;
}

function resumeCounter() {
    startCounter();
}

function updateCounter() {
    var minutes = Math.floor(counterValue / 60);
    var seconds = counterValue % 60;

    document.getElementById("counter").innerText = formatTime(minutes, seconds);
    document.getElementById("timer").innerText = formatTime(minutes, seconds);
}

function formatTime(minutes, seconds) {
    return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

window.addEventListener("load", function () {
    var Map = {
        init: function (grid, pos, skills) {
            this.grid = [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
                [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
                [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];

            this.pos = [1, 1];
            this.skills = 0;
        },

        display: function () {
            // Ajouter une condition pour vérifier si le labyrinthe est déjà affiché
            if (document.getElementById("labyrinthe").innerHTML.trim() === "") {
                for (var y = 0; y < this.grid.length; y++) {
                    var row = "<tr>";

                    for (var x = 0; x < this.grid[y].length; x++) {
                        if (this.grid[y][x] === 1) {
                            row += '<td><img src="../../ressources/images/tt.png" alt="tree"></td>';
                        } else {
                            row += "<td></td>";
                        }
                    }
                    document
                        .getElementById("labyrinthe")
                        .insertAdjacentHTML("beforeEnd", row);
                }
            }
        }
    };

    var labyrinthe = Object.create(Map);
    labyrinthe.init(18, 18, 3);
    labyrinthe.display();
});