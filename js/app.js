
// SHUFFLE CARDS AND ADD TO HTML 

 var listCards = ['fa-diamond','fa-diamond',  
                  'fa-paper-plane-o', 'fa-paper-plane-o', 
                  'fa-anchor', 'fa-anchor', 
                  'fa-bolt','fa-bolt',
                  'fa-cube', 'fa-cube',
                  'fa-leaf', 'fa-leaf',
                  'fa-bomb', 'fa-bomb', 
                  'fa-bicycle', 'fa-bicycle']

function createCard(card) {
    return `<li class="card"> <i class="fa ${card}"></i></li>`  //literal template ES6 to build strings 
}

function initGame() {
    var newCards = [] 
    var deckCards = document.querySelector(".deck"); 
    listCards.forEach(function(card) {
        newCards.push(createCard(card));  
        return shuffle(newCards); 
    }); 
    deckCards.innerHTML = newCards.join(''); //separator of "no commas" (which is default)
} 

initGame(); 

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

/*
 *      TO DO NEXT 
 */

/********************/



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


var allCards = document.querySelectorAll(".card"); 
var openCards = []; 

//DISPLAY CARDS FUNCTION 
function displayCards(card) {
    card.addEventListener('click', function() {
        card.classList.add('open', 'show');
        addOpenCards(card); 
    }) 
}

allCards.forEach(function(card) {
    displayCards(card); 
})

// ADD OPEN CARD FUNCTION 
function addOpenCards(card) {
    openCards.push(card); 
}


//check if cards match 
//loop over them to see if the cards match, 

// if the list already has another card,
// check to see if the two cards match
//if they do, then lock the cards in the open position (put this functionality in another function that you call from this one)


//REVIEW THIS CODE 
// openCards.forEach(function(card, index, arr) {
//     if (arr[index].firstElementChild === arr[index].firstElementChild) {
//         arr[index].classList.add('match');
//     } else {
//         hideCards(card);  
//     }
// })

function checkMatch() {
    for(var i= 0; i < openCards.length; i++) {
        if (openCards[i].firstElementChild === openCards[i].firstElementChild) {
            openCards[i].classList.add('match'); 
        }
        // else {
        //     displayCards(); 
        }
    }

// HIDE CARDS FUNCTION WITH TIMEOUT / if they don't match 
function hideCards(card) {
    openCards.forEach(function(card) {
        card.classList.remove('open', 'show');
    });
}
