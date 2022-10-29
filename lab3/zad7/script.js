fetch("http://localhost:3000/cities")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        a(data);
        b(data);
        c(data);
        d(data);
        e(data);
        f(data);
    })
    .catch((err) => {
        console.log("error", err);
    })

function a(data) {
    const aSection = document.querySelector("#first");
    const aCities = document.createElement("p");
    aCities.innerText = data.filter((elem) => elem.province === "małopolskie").map((elem) => elem.name).join(", ");
    aSection.appendChild(aCities);
}

function b(data) {
    const bSection = document.querySelector("#second");
    const bCities = document.createElement("p");
    bCities.innerText = data.map((elem) => elem.name).filter((city) => city.match(/a/g) != null && city.match(/a/g).length === 2).join(", ");
    bSection.appendChild(bCities);
}

function c(data) {
    const cSection = document.querySelector("#third");
    const cCity = document.createElement("p");
    cCity.innerText = data.sort((a, b) => b.dentensity - a.dentensity)[4].name;
    cSection.appendChild(cCity);
}

function d(data) {
    const dSection = document.querySelector("#fourth");
    const dCity = document.createElement("p");
    dCity.innerText = data.filter((elem) => elem.people > 100000).map((elem) => elem.name + " city").join(", ");
    dSection.appendChild(dCity);
}

function e(data) {
    const eSection = document.querySelector("#fifth");
    const eCity = document.createElement("p");
    const eMoreThan80000 = data.filter((elem) => elem.people > 80000);
    const eMoreThan80000Len = eMoreThan80000.length;
    const eLessThan80000 = data.filter((elem) => elem.people < 80000);
    const eLessThan80000Len = eLessThan80000.length;
    eCity.innerText = eMoreThan80000Len > eLessThan80000Len ? "Więcej, " : "Mniej, " + eMoreThan80000Len + " miast powyżej 80000 mieszkańców, " + eLessThan80000Len + " miast poniżej 80000 mieszkańcami";
    eSection.appendChild(eCity);
}

function f(data) {
    const fSection = document.querySelector("#sixth");
    const fCity = document.createElement("p");
    const fFilteredData = data.filter((elem) => elem.township.startsWith("P")).map((elem) => elem.area);
    fCity.innerText = fFilteredData.reduce((a, b) => a + b) / fFilteredData.length;
    fSection.appendChild(fCity);
}
