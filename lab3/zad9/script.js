const people = [
    {
        no: 0,
        avatar: "images/0.jpg",
        name: "Anna Nowak",
        position: "WEB DESIGNER",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur earum," +
            " enim eos fuga labore molestias nesciunt qui quis quisquam repellendus repudiandae, sed totam unde ut" +
            " velit vitae. Doloribus mollitia praesentium quas. Ea molestias, tempore? Dignissimos libero odio" +
            " voluptatem."
    },
    {
        no: 1,
        avatar: "images/1.jpg",
        name: "Piotr Piotrkowski",
        position: "INTERN",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur earum," +
            " enim eos fuga labore molestias nesciunt qui quis quisquam repellendus repudiandae, sed totam unde ut" +
            " velit vitae. Doloribus mollitia praesentium quas. Ea molestias, tempore? Dignissimos libero odio" +
            " voluptatem."
    },
    {
        no: 2,
        avatar: "images/2.jpg",
        name: "Jan Kowalski",
        position: "FULL STACK DEVELOPER",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur earum," +
            " enim eos fuga labore molestias nesciunt qui quis quisquam repellendus repudiandae, sed totam unde ut" +
            " velit vitae. Doloribus mollitia praesentium quas. Ea molestias, tempore? Dignissimos libero odio" +
            " voluptatem."
    },
    {
        no: 3,
        avatar: "images/3.jpg",
        name: "Anna Kowalska",
        position: "MANAGER",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi consectetur consequuntur earum," +
            " enim eos fuga labore molestias nesciunt qui quis quisquam repellendus repudiandae, sed totam unde ut" +
            " velit vitae. Doloribus mollitia praesentium quas. Ea molestias, tempore? Dignissimos libero odio" +
            " voluptatem."
    }
];

const avatar = document.querySelector("#avatar");
const name = document.querySelector("#name");
const position = document.querySelector("#position");
const description = document.querySelector("#description");
let pickedWorker = 0;
const noOfWorkers = people.length;

const rightArrow = document.querySelector("#right-arrow");
const leftArrow = document.querySelector("#left-arrow");
const randomButton = document.querySelector("#random-worker");

rightArrow.addEventListener("click", () => {
    pickedWorker = Math.abs(pickedWorker + 1) % noOfWorkers;
    changeWorker(pickedWorker);
});

leftArrow.addEventListener("click", () => {
    pickedWorker = Math.abs(pickedWorker - 1 + noOfWorkers) % noOfWorkers;
    changeWorker(pickedWorker);
});

randomButton.addEventListener("click", () => {
    const currPickedWorker = pickedWorker;
    do pickedWorker = getRandomIntInclusive(0, 3)
    while (pickedWorker === currPickedWorker);
    changeWorker(pickedWorker);
});

function changeWorker(currentWorker) {
    let worker = people[currentWorker % noOfWorkers];
    avatar.src = worker.avatar;
    name.innerHTML = worker.name;
    position.innerHTML = worker.position;
    description.innerHTML = worker.description;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
