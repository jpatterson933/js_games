function grabElement (htmlElement) {
    const element = document.getElementById(htmlElement);
    return element;
}

// globally available elements
const cardsContainerElement = grabElement("card-container");
const startButtonElement = grabElement("start-button");
const scorePanelElement = grabElement("score-panel");

/*
    GAME RULES AND SETUP
*/
const cardsPerRound = 5;
const colors = ["red", "green", "blue"];
let gameInProgress = false;
let totalScore = 0;
/* 
----------- END GAME RULES AND SETUP
*/

const getRandomIndex = (number) => {
    return Math.floor(Math.random() * number);
}



const onCardClick = (event) => {
    let element = event.target;
    let parentEle = event.target.parentElement;

    if(element.dataset.clicked === "false") {

        if (parentEle.dataset.solution === "correct") {
            element.setAttribute("data-clicked", "true"); // once clicked this attribute is added and set to true
            element.style.backgroundColor = parentEle.dataset.word;
            parentEle.style.boxShadow = `0px 0px 6px 2px white, 0px 0px 12px 5px ${parentEle.dataset.word}`;
            element.style.border = `3px solid ${parentEle.dataset.word}`;
            element.textContent = "CORRECT!";
            element.removeEventListener("click", onCardClick);
        } else {
            element.setAttribute("data-clicked", "true"); // once clicked this attribute is added and set to true
            element.style.backgroundColor = "red";
            parentEle.style.backgroundColor = "red";
            parentEle.style.boxShadow = `0px 0px 5px 4px white, 0px 0px 10px 8px red`;
            element.style.border = "3px solid red";
            element.textContent = "WRONG!";
            element.removeEventListener("click", onCardClick);
        };
    };
};

function createCardContainer(index) {
    let cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "cards");
    cardContainer.setAttribute("id", index);
    return cardContainer;
}

function createCardBody(){
    let cardBody = document.createElement("p");
    cardBody.setAttribute("class", "cards-body");
    cardBody.setAttribute("data-clicked", "false");
    cardBody.style.margin = "0";
    cardBody.style.padding = "0";
    cardBody.textContent = "Get ready!"
    return cardBody;
}

// create a single card, takes the global parentelement and the for loop index as arguments
const createSingleCard = (parentElement, index) => {
    let cardContainer = createCardContainer(index);
    let cardBody = createCardBody();
    cardContainer.appendChild(cardBody);
    parentElement.appendChild(cardContainer);
}

const createCards = (numberOfCards) => {
    for (let i = 0; i < numberOfCards; i++) {
        createSingleCard(cardsContainerElement, i)
    }
}

const buttonVisibility = (status, timeTo) => {
    setTimeout(() => {
        startButtonElement.style.visibility = status;
    }, timeTo)
};


// setup the game
const gameSetup = () => {
    // show start button
    buttonVisibility("visible", 2000);

    // create empty cards
    createCards(cardsPerRound);
}

gameSetup();

function createScorePanel(){
    let score = document.createElement("h3");
    score.setAttribute("id", "score");
    score.textContent = "Total score: " + totalScore;
    return score;
}


const appendScorePanel = () => {
    let score = createScorePanel();
    scorePanelElement.appendChild(score);
}

const increaseScore = () => {
    let score = document.getElementById("score");
    totalScore++;
    score.textContent = "Total score: " + totalScore;
}

const decreaseScore = () => {
    let score = document.getElementById("score");
    totalScore--;
    score.textContent = "Total score: " + totalScore;
}

// function that assigns colors to cards
const assignColors = () => {
    let cards = document.querySelectorAll('.cards');

    cards.forEach(card => {
        let cardBody = card.children[0];
        console.log(cardBody)
        
        let randomColor = getRandomIndex(colors.length);
        let randomText = getRandomIndex(colors.length);
        card.style.backgroundColor = colors[randomColor];
        card.setAttribute("data-background", colors[randomColor]);
        cardBody.textContent = colors[randomText];
        cardBody.style.cursor = "pointer";
        card.setAttribute("data-word", colors[randomText]);
        
        if (card.dataset.word === card.dataset.background) {
            card.setAttribute("data-solution", "correct");
        } else {
            card.setAttribute("data-solution", "incorrect");
        };
        
        cardBody.addEventListener("click", onCardClick)
    });
};

const clickHandler = (event) => {
    let cards = document.querySelectorAll('.cards');
    let cardsBody = document.querySelectorAll('.cards-body');
    let cardIndex = Array.from(cardsBody).indexOf(event.currentTarget);
    console.log(cardIndex);
    if (cards[cardIndex].dataset.solution === "correct") {
        let addScore = document.createElement("p");
        addScore.textContent = "+1";
        increaseScore(); // updates our score
        addScore.style.fontSize = "2em";
        addScore.style.margin = "0";
        addScore.style.padding = "0";
        cardsBody[cardIndex].append(addScore);
        cardsBody[cardIndex].removeEventListener("click", clickHandler);

    } else if (cards[cardIndex].dataset.solution === "incorrect") {
        let addScore = document.createElement("p");
        addScore.textContent = "-1";
        decreaseScore(); // updates our score
        addScore.style.fontSize = "2em";
        addScore.style.margin = "0";
        addScore.style.padding = "0";
        cardsBody[cardIndex].append(addScore);
        cardsBody[cardIndex].removeEventListener("click", clickHandler);
    }
}


const checkColors = () => {

    let cards = document.querySelectorAll('.cards');
    let cardsBody = document.querySelectorAll('.cards-body');

    for (let i = 0; i < cards.length; i++) {
        cardsBody[i].addEventListener("click", clickHandler)
    }

}

const assignAndCheck= () => {
    assignColors();
    checkColors();
}



const startGame = () => {
    gameInProgress = true;
    buttonVisibility("hidden", 0); // immediately hide button
    // setup the score panel
    appendScorePanel();

    assignAndCheck();

}

startButtonElement.addEventListener("click", startGame);