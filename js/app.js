
// SHUFFLE CARDS AND ADD TO HTML 

let symbols = ['fa-apple-alt', 'fa-hotdog', 'fa-hamburger', 'fa-candy-cane', 'fa-ice-cream', 'fa-pizza-slice', 'fa-fish', 'fa-carrot']; 

let arrCards = symbols.concat(symbols);  // Using concat to duplicate values in arr 

createDeck(); 

function createDeck() {
    const shuffledListCards = shuffle(arrCards); 

    const fragment = document.createDocumentFragment(); //Empty fragment to append elements  
    shuffledListCards.forEach(function(card) {
        const newCard = document.createElement("li"); 
        newCard.className = "card"; 
        newCard.innerHTML = `<i class="fas ${card}"></i>` 
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
const movesNumber = document.querySelector('.moves');  

/* GAME LOGIC */

activateCards(); 

function activateCards() {
    allCards.forEach(function(card) {
        card.addEventListener('click', function() { 
            if(!card.classList.contains('open', 'show')) { // disable clicking by checking if it has open and show already ('if it doesn't then add')
                card.classList.add('open', 'show'); 
                openCards.push(card); 
                if(openCards.length === 2) {
                compareCards();
                movesCounter();
                }
            }
        })
    })
}

function desactiveCards() {
    openCards.forEach(function(card) {
        card.classList.remove('open', 'show', 'unmatch');  
        openCards = []; 
    })
}

function compareCards() {
    if(openCards[0].innerHTML === openCards[1].innerHTML) {
        setTimeout(cardsMatch, 300);
    } else {
        setTimeout(function() {
            openCards[0].classList.add('unmatch');
            openCards[1].classList.add('unmatch');
        }, 100); 
        setTimeout(cardsDontMatch, 700);
    }
}

function cardsMatch() {
    let card1 = openCards[0].classList.add('match', 'disable');
    let card2 = openCards[1].classList.add('match', 'disable'); 
    matchedCards.push(card1, card2); 
    desactiveCards();  
    gameOver(); 
}

function cardsDontMatch() { 
    desactiveCards();
}

function gameOver() {
    if(matchedCards.length === 16) {
        showModal(); 
        stopTimer(); 
    }
}

/* MOVES COUNTER */

function movesCounter() {
    moves++; 
    movesNumber.textContent = moves; 
    starRating()
    // start timer on first move
    if(moves === 1) {
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
}

/* STARS FUNCTION */

let starsCounter = 3;

function starRating() {
  const newStar = '<i class="far fa-star"></i>';

  if (moves === 15) {
    document.querySelector('.first').innerHTML = newStar;
    starsCounter = 2;
  };

  if (moves === 20) {
    document.querySelector('.second').innerHTML = newStar;
    starsCounter = 1;
  };

  if (moves >= 26) {
    document.querySelector('.third').innerHTML = newStar;
    starsCounter = 0;
  };
}

/* TIMER FUNCTION */

let second = 0;
let minute = 0;
const timerDisplay = document.querySelector('.timer');
let clock; 

function startTimer(){
    clock = setInterval(function(){
        timerDisplay.innerHTML = minute + " mins " + second + " secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}

function stopTimer() {
    timerDisplay.innerHTML = "0 mins 0 secs";
    clearInterval(clock);
}


/* RESET FUNCTION */

function reset() {
    matchedCards = [];
    openCards = [];
    // restart time
    stopTimer(); 

    // restart the grid 
    const deck = document.querySelector('.deck'); // select the deck
    const cards = shuffle(Array.from(document.querySelectorAll('.deck li'))); //array.from will convert a Nodelist (or anything) into an array
    deck.innerHTML = ''; // empty the current grid
    cards.forEach(function(card) { 
        deck.appendChild(card); // add the suffled card to the deck again 
        card.classList.remove('open', 'match', 'show', 'disable');  // remove classes
    }) 

    // stars reset 
    const allStars = document.querySelectorAll('ul.stars i');  
    allStars.forEach(function(star, i, arr) {
        arr[i].classList.remove('far');
        arr[i].classList.add('fa'); 
    })

    // reset moves 
    moves = 0; 
    movesNumber.innerHTML = moves; 
}

/* MODAL FUNCTION*/

let modal = document.querySelector(".bg-modal"); 
let score = document.querySelector('.score'); 

function showModal() {
    modal.style.display = 'flex'; 
    let numberOfMoves = movesNumber.textContent; 
    let modalScore = `<p class='score'>In ${minute} mins, ${second} secs. With ${numberOfMoves} moves and ${starsCounter} star(s)!</p>`
    score.innerHTML = modalScore; 
}

closeModal()

function closeModal() {
    modal.addEventListener('click', function() {
        this.style.display = "none"; 
    })
}

/************************************************************************/

/*
TODO:

- Fix the timer to start at first card: 

Instead of starting the timer after the first move where two cards are flipped over, it is supposed to start at the beginning of the game which would be at the latest when the first card is flipped over. The other option would be to start the timer when the page loads. It's not a requirement to change this - the relevant rubric already passed.

**/

