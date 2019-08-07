
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
let time; // var declared but not defined yet - make it available in the global scope for clearInterval()
const movesNumber = document.querySelector('.moves');  
const allStars = document.querySelectorAll('ul.stars i');   

activateCards(); 

function activateCards() {
    allCards.forEach(function(card) {
        card.addEventListener('click', function() {
            if (!time) { // if time is NOT "defined" then define it and run
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
        clearInterval(time); //stop time
        showModal()
    }
}

/* MOVES COUNTER */

function movesCounter() {
    moves++; 
    movesNumber.innerHTML = moves; 
    starRating()
}

/* STARS FUNCTION */

function starRating() {     
    allStars.forEach(function(star, i, arr){ 
        if(moves === 13) {
            arr[2].classList.remove('fa'); 
            arr[2].classList.add('far');
        }
        if(moves === 18) {
            arr[1].classList.remove('fa'); 
            arr[1].classList.add('far');
        }
        if(moves === 22) {
            arr[0].classList.remove('fa'); 
            arr[0].classList.add('far');
        }
    });
}

/* TIMER FUNCTION */

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

/* RESET FUNCTION */

function reset() {
    // reset time - /* FIX THIS!! */
    seconds.innerHTML = '00'; 
    minutes.innerHTML = '00'; 
    clearInterval(time);  
    
    // restart the grid 
    const deck = document.querySelector('.deck'); // select the deck
    const cards = shuffle(Array.from(document.querySelectorAll('.deck li'))); //array.from will convert a Nodelist (or anything) into an array
    deck.innerHTML = ''; // empty the current grid
    cards.forEach(function(card) { 
        deck.appendChild(card); // add the suffled card to the deck again 
        card.classList.remove('open', 'match', 'show');  // remove classes
    }) 

    // stars reset 
    allStars.forEach(function(star, i, arr) {
        arr[i].classList.remove('far');
        arr[i].classList.add('fa'); 
    })
    // reset moves 
    moves = 0; 
    movesNumber.innerHTML = moves; 
}

/* MODAL FUNCTION*/

const modal = document.querySelector(".bg-modal"); 

function showModal() {
    modal.style.display = 'flex'; 
    let numberOfMoves = movesNumber.textContent; 
    // ADD NUMBER OF STARS
    // ADD MIN AND SECS 
    const modalText = document.querySelector('.modal-text'); 
    const modalScore = `<p class='score'>In ${moves} mins, ${moves} secs, and with ${numberOfMoves} moves and ${moves} stars!</p>`
    modalText.insertAdjacentHTML('afterend', modalScore);
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

1) Fix STAR and TIME and in the showModal() function
2) Fix TIMER function itself - look at comments from Antonio/Udacity
3) FIX Reset Button
4) Add CSS styling for correct vs incorrect
5) Organize code in functions? 

//  */

