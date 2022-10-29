const balloon = document.querySelector("#balloon");
const contextMenu = document.querySelector("#context-menu");
let balloonSize = 30;

balloon.style.fontSize = balloonSize + "px";

document.addEventListener("keydown", changeBalloonSize);

balloon.addEventListener("contextmenu", (e) => {
    if (e.ctrlKey && e.button === 2) {
        e.preventDefault();
        contextMenu.innerText = balloonSize + "px";
        contextMenu.style.display = "block";
        contextMenu.style.left = e.x + "px";
        contextMenu.style.top = e.y + "px";
    }
})

document.addEventListener("click", () => {
    contextMenu.style.display = "none";
})

function changeBalloonSize(e) {
    e.preventDefault();
    if (e.key === "ArrowUp") {
        balloonSize *= 1.1;
        balloon.style.fontSize = balloonSize + "px";
        if (balloonSize > 250) {
            balloon.innerHTML = "&#128165";
            document.removeEventListener("keydown", changeBalloonSize);
        }
    } else if (e.key === "ArrowDown" && balloonSize > 15) {
        balloonSize *= 0.9;
        balloon.style.fontSize = balloonSize + "px";
    }
}