document.getElementById("button-click").addEventListener("click", function () {
    const person = prompt("Wprowadź swoje imię");
    if (person.slice(-1) === "a") {
        document.getElementById("name").innerHTML = "To ona i imię to " + person;
    }
    else document.getElementById("name").innerHTML = "To on i imię to " + person;
});