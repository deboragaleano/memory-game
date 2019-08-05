
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
let matchedCards = []; 
let moves = 0; 
let time; 

activateCards(); 

function activateCards() {
    allCards.forEach(function(card) {
        card.addEventListener('click', function() {
            if (!time) {
                time = setInterval(setTime, 1000);
            }
            card.classList.add('open', 'show'); 
            openCards.push(card); 
            if (openCards.length === 2) {
            compareCards();
            movesCounter();
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
        setTimeout(cardsDontMatch, 700);
    }
}

function cardsMatch() {
    const card1 = openCards[0].classList.add('match');
    const card2 = openCards[1].classList.add('match'); 
    matchedCards.push(card1, card2); 
    desactiveCards();  
    gameOver(); 
}

function cardsDontMatch() {
    desactiveCards();
}

function gameOver() {
    if(matchedCards.length === 16) {
        console.log('YOU WON!'); 
        clearInterval(time); 
    }
}

function movesCounter() {
    moves++; 
    const movesNumber = document.querySelector('.moves'); 
    movesNumber.innerHTML = moves; 
    starRating()
}

function starRating() {     
    const allStars = document.querySelectorAll('ul.stars i');  
    allStars.forEach(function(star, i, arr){ 
        if(moves === 10) {
            arr[2].classList.remove('fa'); 
            arr[2].classList.add('far');
        }
        if(moves === 15) {
            arr[1].classList.remove('fa'); 
            arr[1].classList.add('far');
        }
        if(moves === 20) {
            arr[0].classList.remove('fa'); 
            arr[0].classList.add('far');
        }
    });
}

//TIMER 

const minutes = document.querySelector(".min");
const seconds = document.querySelector(".secs");
let totalSeconds = 0;

function setTime() {
  ++totalSeconds;
  seconds.innerHTML = pad(totalSeconds % 60);
  minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

/************************************************************************/


/*
TO DO NEXT:  

 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 

MODAL:
Congratulations Popup. When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.


RESET BUTTON:
This should allow the player to reset the entire grid as well as all the above
A restart button allows the player to reset the game board, the timer, and the star rating.

 */

