let nick = "";
while (nick === "" || nick === null) nick = prompt("Wprowadź nick:");
const nickname = document.querySelector("#nickname");
nickname.innerText = nick;

const board = document.querySelector(".board");
const scoreCnt = document.querySelector("#score-cnt")
const nextGameButton = document.querySelector(".next-game");

let score = 0;
let aliveZombies = 0;
let stopGenerator = false;

function generateZombies() {
    const zombie = document.createElement("div");
    zombie.addEventListener("animationend", (e) => {
        if (e.animationName === "walkFromRightToLeft") {
            aliveZombies++;
            if (aliveZombies === 3) {
                alert("KONIEC GRY");
                score = 0;
                scoreCnt.innerText = zeroPad();
                stopGenerator = true;
                nextGameButton.style.display = "block";
            }
        }
    });
    if (stopGenerator) return;

    zombie.classList.add("zombie");

    const minPos = 1;
    const maxPos = 400;
    const randomPos = getRandomIntInclusive(minPos, maxPos);
    zombie.style.bottom = randomPos + "px";

    const minSpeed = 1;
    const maxSpeed = 5;
    const zombieSpeed = getRandomIntInclusive(minSpeed, maxSpeed);
    zombie.style.animationDuration = ".3s, " + zombieSpeed + "s";

    zombie.style.transform = "scale(" + getRandomIntInclusive(1, 2) + ")";

    board.appendChild(zombie);

    setTimeout(generateZombies, getRandomIntInclusive(100, 1500));
}

board.addEventListener("click", scorePoints);

function scorePoints(e) {
    if (aliveZombies >= 3) board.removeEventListener("click", scorePoints);

    else if (e.target.classList.contains("zombie")) {
        score += 12;
        e.target.remove();
    } else score -= 6;
    scoreCnt.innerText = zeroPad();
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function zeroPad() {
    if (score === 0) return "00000";
    else {
        let an = Math.abs(score);
        let digitCount = 1 + Math.floor(Math.log(an) / Math.LN10);
        if (digitCount >= 5) {
            return score;
        }
        let zeroString = Math.pow(10, 5 - digitCount).toString().substr(1);
        return score < 0 ? '-' + zeroString + an : zeroString + an;
    }
}

nextGameButton.addEventListener("click", () => {
    stopGenerator = false;
    score = 6;
    scoreCnt.innerText = zeroPad();
    nextGameButton.style.display = "none";
    aliveZombies = 0;
    generateZombies();
})

if (nick !== "" && nick !== null) generateZombies();
