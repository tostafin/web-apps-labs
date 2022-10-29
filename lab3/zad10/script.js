/*
Odpalam trzy serwery:
json-server --watch produktyA.json -p 3000
json-server --watch produktyB.json -p 4000
json-server --watch produktyC.json -p 5000
*/

const url1 = "http://localhost:3000/Produkty"
const url2 = "http://localhost:4000/Produkty"
const url3 = "http://localhost:5000/Produkty"

const menuList = document.querySelector("#menu-list");
const mainList = document.querySelector("#main-list");

async function getProducts() {
    const resp1 = await fetch(url1);
    const resp2 = await fetch(url2);
    const resp3 = await fetch(url3);
    const data1 = await resp1.json();
    const data2 = await resp2.json();
    const data3 = await resp3.json();
    const data = data1.concat(data2, data3);

    splitProducts(data);
}

function splitProducts(data) {
    const items = {};
    for (const entry of data) {
        const cat = Object.keys(entry)[0];
        if (!(Object.keys(items).includes(cat))) {
            items[cat] = new Set();
        }
        for (const prod of Object.values(entry)[0]) {
            items[cat].add(prod["nazwa"]);
        }
    }
    for (const [cat, prod] of Object.entries(items)) {
        const catElem = document.createElement("li");
        catElem.innerHTML = `<span id="${cat}arrow" class="arrow">&#8250</span>
                             <input type="checkbox" id="${cat}check" name="${cat}check">
                             <label for="${cat}check">${cat}</label>
                             <ul id="${cat}inner" class="inner-list"></ul>
        `
        menuList.appendChild(catElem);
        const innerListId = cat + "inner";
        const innerList = document.getElementById(innerListId);
        for (const product of prod) {
            const prodElem = document.createElement("li");
            prodElem.innerHTML = `<input type="checkbox" id="${cat}${product}check" name="${cat}${product}check">
                                  <label for="${cat}${product}check">${product}</label>
            `
            innerList.appendChild(prodElem);
            const prodCheckboxId = cat + product + "check";
            const prodCheckbox = document.getElementById(prodCheckboxId);
            prodCheckbox.addEventListener("change", () => {
                if (prodCheckbox.checked) {
                    const sectionProd = document.createElement("li");
                    sectionProd.id = `${cat}${product}main`;
                    sectionProd.innerHTML = product;
                    mainList.appendChild(sectionProd);
                } else {
                    const toRemoveId = cat + product + "main";
                    const toRemove = document.getElementById(toRemoveId);
                    mainList.removeChild(toRemove);
                }
            });
        }
        const catCheckboxId = cat + "check";
        const catCheckbox = document.getElementById(catCheckboxId);
        catCheckbox.addEventListener("change", () => {
            const arrowRotateId = cat + "arrow";
            const arrowRotate = document.getElementById(arrowRotateId);
            if (catCheckbox.checked) {
                innerList.style.display = "block";
                arrowRotate.style.transform = "rotate(90deg)";
                catCheckbox.indeterminate = true;
            }
            else {
                innerList.style.display = "none";
                arrowRotate.style.transform = "rotate(0)";
            }
        });
    }
}

getProducts();
