let cnt = 1;
const ul = document.querySelector("ul");
const buttonAdd = document.getElementById("add");
const buttonRemove = document.getElementById("remove");

buttonAdd.addEventListener("click", function () {
    let elem = document.createElement("li");
    elem.innerHTML = "Element nr " + cnt++;
    ul.appendChild(elem);
});
buttonRemove.addEventListener("click", function () {
    cnt--;
    ul.removeChild(ul.childNodes[0]);
});