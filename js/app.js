
// SHUFFLE CARDS AND ADD TO HTML 

const listCards = ['fa-diamond','fa-diamond',  
                  'fa-paper-plane-o', 'fa-paper-plane-o', 
                  'fa-anchor', 'fa-anchor', 
                  'fa-bolt','fa-bolt',
                  'fa-cube', 'fa-cube',
                  'fa-leaf', 'fa-leaf',
                  'fa-bomb', 'fa-bomb', 
                  'fa-bicycle', 'fa-bicycle']

createDeck(); 

function createDeck() {
    const shuffledListCards = shuffle(listCards); 

    const fragment = document.createDocumentFragment(); //Empty fragment to append elements  
    shuffledListCards.forEach(function(card) {
        const newCard = document.createElement("li"); 
        newCard.className = "card"; 
        newCard.innerHTML = `<i class="fa ${card}"></i>` 
        fragment.appendChild(newCard); 
    }); 
    const deckCards = document.querySelector('.deck'); 
    deckCards.appendChild(fragment); 
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/************************************************************************/

const allCards = document.querySelectorAll(".card"); 
let openCards = []; 

activateCards(); 

function activateCards() {
    allCards.forEach(function(card) {
        card.addEventListener('click', function() {
            card.classList.add('open', 'show'); 
            openCards.push(card); 
            if (openCards.length === 2) {
            compareCards();
            }
        })
    })
}

function desactiveCards() {
    openCards.forEach(function(card) {
        card.classList.remove('open', 'show');
        openCards = []; 
    })
}

function compareCards() {
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        setTimeout(cardsMatch, 300);
    } else {
        setTimeout(cardsDontMatch, 800);
    }
}

function cardsMatch() {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match'); 
    desactiveCards();  
}

function cardsDontMatch() {
    desactiveCards();
}

// // for game over / create a function 
// var matchedCards = []; // create a list of cards where I would store the cards that match, every 2 cards, then it will go there 

// if(matchedCards.length === 16) {
//     //write logic for game is won 
// }


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */