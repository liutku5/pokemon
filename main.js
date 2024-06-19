let ballsWeHave = 3;
pokeballs(ballsWeHave);

document.querySelector("#pokeballs").value = ballsWeHave;
let pokeballsHolder = document.querySelector("#pokeballs");
document.querySelector("#btn").addEventListener("click", playGame);
let pokemon = Math.floor(Math.random() * 248) + 1;

function pokeballs(count) {
    const pokeballsDisplay = document.querySelector("#pokeballsDisplay");
    pokeballsDisplay.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const img = document.createElement("img");
        img.src = "./img/pokeball.png";
        img.className = "pokeball";
        pokeballsDisplay.appendChild(img);
    }
}

function playGame() {
    let gameStatus = document.querySelector("#gameStart");
    switch (gameStatus.value) {
        case "1":
            document.querySelector("#btn-container").innerHTML = '<button class="btn btn-danger" id="btn">Catch a Pokemon!</button>';
            callImg();
            gameStatus.value = 2;
            break;
        case "2":
            let newCount = parseInt(pokeballsHolder.value) - 1;
            pokeballsHolder.value = newCount;
            pokeballs(newCount);
            if (Math.random() < 0.5) {
                gameStatus.value = 3;
                document.querySelector("#btn-container").innerHTML = '<button class="btn btn-warning" id="btn">Check out the Pokeman!</button>';

            } else {
                if (pokeballsHolder.value == 0) {
                    document.querySelector("#pokemon-container").innerHTML = `<h1>GAME OVER</h1><h3>Out of balls!</h3><img src="./img/pikachu.png" alt="pikachu">`;
                    document.querySelector("#btn-container").innerHTML = "";
                    return;
                }
                document.querySelector("#btn-container").innerHTML = '<button disabled class="btn btn-danger" id="btn">Catch a Pokemon!</button>';
                setTimeout(function () {
                    document.querySelector("#btn").disabled = false;
                }, 1000);
            }
            break;
        case "3":
            document.querySelector("#btn-container").innerHTML = "";
            gameStatus.value = 3;
            callStatus();
            break;

        default:
            break;
    }
    resetButton();
}

function resetButton() {
    if (document.querySelector("#btn") != null) {
        document.querySelector("#btn").removeEventListener("click", playGame);
        document.querySelector("#btn").addEventListener("click", playGame);
    }
}

function callImg() {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    fetch(url)
        .then(response => { return response.json(); })
        .then(data => { printPokemonImg(data) })

}

function callStatus() {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    fetch(url)
        .then(response => { return response.json(); })
        .then(data => { printPokemonStats(data) })

}

function printPokemonImg(data) {
    console.log(data.sprites.other.home.front_default);
    let output = document.querySelector("#pokemon-image");
    output.innerHTML = `<h2>${data.name}</h2> <img src="${data.sprites.other.home.front_default}" alt="${data.name}">`;

}
function printPokemonStats(data) {
    console.log(data.sprites.other.home.front_default);
    let output = document.querySelector("#pokemon-image");
    let HTML = `<h2>${data.name}</h2> <img src="${data.sprites.other.home.front_default}" alt="${data.name}">`;
    let modifiedHp = Math.round(data.stats[0].base_stat * (Math.random() * (1.3 - 0.7) + 0.7));
    HTML += "<h4>HP: " + modifiedHp + "</h4>";
    let modifiedAttack = Math.round(data.stats[1].base_stat * (Math.random() * (1.3 - 0.7) + 0.7));
    HTML += "<h4>Attack: " + modifiedAttack + "</h4>";
    let modifiedDefense = Math.round(data.stats[2].base_stat * (Math.random() * (1.3 - 0.7) + 0.7));
    HTML += "<h4>Defense: " + modifiedDefense + "</h4>";
    let modifiedSpeed = Math.round(data.stats[5].base_stat * (Math.random() * (1.3 - 0.7) + 0.7));
    HTML += "<h4>Speed: " + modifiedSpeed + "</h4>";
    output.innerHTML = HTML;
}

document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const characterImg = urlParams.get('characterImg');
    const playerName = urlParams.get('playerName');

    document.getElementById('player-name-display').innerText = playerName;
    document.getElementById('character-img-display').src = characterImg;
    console.log(playerName);
})
