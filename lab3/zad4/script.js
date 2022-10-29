let cnt = 0;
const buttonIncrement = document.querySelector("#increment");
const buttonStart = document.querySelector("#start")
const buttonDelete = document.querySelector("#delete")
const pCounter = document.querySelector("#counter")

buttonIncrement.addEventListener("click", incrementCnt);

buttonStart.addEventListener("click", () => {
    buttonIncrement.addEventListener("click", incrementCnt);
});

buttonDelete.addEventListener("click", () => {
    buttonIncrement.removeEventListener("click", incrementCnt);
    cnt = 0;
    pCounter.innerText = cnt;
});

function incrementCnt() {
    pCounter.innerText = ++cnt;
}
