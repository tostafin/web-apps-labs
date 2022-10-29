const blocksContainer = document.querySelector("#blocks-container");
const button = document.querySelector("#button");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");

button.addEventListener("click", (e) => {
    e.preventDefault();
    if (!nameInput.checkValidity()){
        alert("Nieprawidłowy format imienia i nazwiska.");
    }
    else if (!phoneInput.checkValidity()) {
        alert("Nieprawidłowy format numeru telefonicznego.");
    }
    else {
        const block = document.createElement("li");
        const phoneBookData = document.createElement("div");
        const name = document.createElement("p");
        const phone = document.createElement("p");
        const bin = document.createElement("a");

        name.innerText = nameInput.value;
        phone.innerText = phoneInput.value;
        bin.innerHTML = "&#128465";
        bin.classList.add("bin-icon");
        bin.href = "";

        phoneBookData.append(name, phone);
        block.append(phoneBookData, bin);

        blocksContainer.prepend(block);
    }
});

blocksContainer.addEventListener("click", (elem) => {
    if (elem.target.classList.contains("bin-icon")) {
        elem.preventDefault();
        elem.target.parentElement.remove();
    }
});