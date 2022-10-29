let cnt = 0;
const blueSquare = document.querySelector("#block-1");
const redSquare = document.querySelector("#block-2");
const yellowSquare = document.querySelector("#block-3");
const cntSection = document.querySelector("#cnt");
const listElem = document.querySelector("#message")
const startStopPropagation = document.querySelector("#start-stop");
const resetButton = document.querySelector("#reset");
let propagation = true;

cntSection.innerText = cnt;

startStopPropagation.addEventListener("click", () => {
    if (propagation) {
        propagation = false;
        startStopPropagation.innerText = "Stop Propagation";
    } else {
        propagation = true;
        startStopPropagation.innerText = "Start Propagation";
    }
});

resetButton.addEventListener("click", () => {
    cnt = 0;
    cntSection.innerText = cnt;
    listElem.innerHTML = "";
});

function yellowClick(e) {
    const color = "żółty";
    squareClick(5, color, e);
    disableSquare(color);
}

function redClick(e) {
    const color = "czerwony";
    squareClick(2, color, e);
    disableSquare(color);
}

function blueClick(e) {
    squareClick(1, "niebieski", e);
}

yellowSquare.addEventListener("click", yellowClick);
redSquare.addEventListener("click", redClick);
blueSquare.addEventListener("click", blueClick);

function squareClick(value, color, e) {
    if ((color === "żółty" && cnt <= 50) || (color === "czerwony" && cnt <= 30) || (color === "niebieski")) {
        if (!propagation) e.stopPropagation();
        cnt += value;
        cntSection.innerText = cnt;
        const elem = document.createElement("li");
        elem.innerText = "nacisnąłeś " + color + " o wartości " + value;
        listElem.appendChild(elem);
    }
}

function disableSquare(color) {
    if (color === "red" && cnt > 30) redSquare.removeEventListener("click", squareClick);
    if (color === "yellow" && cnt > 50) redSquare.removeEventListener("click", squareClick);
}