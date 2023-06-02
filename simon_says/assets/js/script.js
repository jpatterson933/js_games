// globally available elements
const cardsContainerElement = document.getElementById("card-container");
const startButtonElement = document.getElementById("start-button");

/*
    GAME RULES AND SETUP
*/
const cardsPerRound = 5;
const colors = ["red", "green", "blue"];
let gameInProgress = false;

const getRandomIndex = (number) => {
    return Math.floor(Math.random() * number);
}

const onCardClick = (event) => {
    console.log(event, "event")
    let element = event.target;
    let parentEle = event.target.parentElement;
    console.log(parentEle.dataset.word)
    if(parentEle.dataset.solution === "correct") {
        element.style.backgroundColor = parentEle.dataset.word;
        parentEle.style.boxShadow = `0px 0px 6px 2px white, 0px 0px 12px 5px ${parentEle.dataset.word}`
        element.style.border = `3px solid ${parentEle.dataset.word}`
        element.textContent = "CORRECT!"


    } else {
        element.style.backgroundColor = "red";
        parentEle.style.backgroundColor = "red";
        parentEle.style.boxShadow = `0px 0px 5px 4px white, 0px 0px 10px 8px red`

        element.style.border = "3px solid red"
        element.textContent = "WRONG!"

    }
}

// create a single card, takes the global parentelement and the for loop index as arguments
const singleCardElement = (parentElement, index) => {
    let cardContainer = document.createElement("div");
    let cardBody = document.createElement("p");
    // set up atttributes for cards, class and id of index
    cardContainer.setAttribute("class", "cards");
    cardContainer.setAttribute("id", index)
    cardBody.setAttribute("class", "cards-body")
    cardBody.style.cursor = "pointer";

    cardBody.textContent = "testing"

    cardBody.addEventListener("click", onCardClick)

    cardContainer.appendChild(cardBody);
    parentElement.appendChild(cardContainer);

}

const createCards = (number) => {
        for(let i = 0; i < number; i++) {
        singleCardElement(cardsContainerElement, i)
    }
}

const buttonVisibility = (status, timeTo) => {

    setTimeout(() => {
        startButtonElement.style.visibility = status;
    }, timeTo)

}



const gameSetup = () => {
    // show button after two seconds
    buttonVisibility("visible", 2000);
    // setup empty html elements for cards
    createCards(cardsPerRound);
}

gameSetup();

const assignColors = () => {
    let cards = document.querySelectorAll('.cards');

    
    cards.forEach(card => {
        let randomColor = getRandomIndex(colors.length);
        let randomText = getRandomIndex(colors.length);
        card.style.backgroundColor = colors[randomColor];
        card.setAttribute("data-background", colors[randomColor]);
        card.children[0].textContent = colors[randomText];
        card.setAttribute("data-word", colors[randomText]);

        // console.log(card.dataset.word)
        if(card.dataset.word === card.dataset.background) {
            card.setAttribute("data-solution", "correct");
        } else {
            card.setAttribute("data-solution", "incorrect");
        };
        
    });
};

const checkColors = () => {

    let cards = document.querySelectorAll('.cards');
    let cardsBody = document.querySelectorAll('.cards-body');

    for(let i = 0; i < cards.length; i++){
        // cards[i].getAttribute()

    }

}


const startGame = () => {
    gameInProgress = true;
    buttonVisibility("hidden", 0); // immediately hide button

    assignColors();


}

startButtonElement.addEventListener("click", startGame);