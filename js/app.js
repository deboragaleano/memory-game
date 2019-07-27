
/*
 *      DO THIS LATER
 */


/*
 * Create a list that holds all of your cards
 */

//  var listCards = [
//      'fa-diamond', 
//      'fa-diamond',  
//      'fa-paper-plane-o',
//      'fa-paper-plane-o', 
//      'fa-anchor',
//      'fa-anchor',
//      'fa-bolt',
//      'fa-bolt',
//      'fa-cube',
//      'fa-cube',
//      'fa-leaf',
//      'fa-leaf',
//      'fa-bomb',
//      'fa-bomb', 
//      'fa-bicycle',
//      'fa-bicycle' 
//  ]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
 *      DO THIS LATER
 */
// How you would iterate (i.e., loop) over this data structure?
// Think about how you can create, say, an unordered list (i.e., bulleted list) in HTML from this structure

// var cardElements = document.querySelectorAll(".deck i"); 

// for (let i; i < listCards.length; i++) {
//     listCards[i].
//     shuffle(listCards[i]); 
// }


// Are your cards randomly placed onto the grid? Note that the provided shuffle() function (from the starter code) takes in an array parameter, and returns a shuffled version of that array
// Figure out the HTML needed to represent a card. Remember, you have to represent two sides of the card, and the symbols are faced down
// How can you use CSS properties like transform or opacity to represent the sides of a card?

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


// ADD 2 CLICKS AND HIDE CARDS 
allCards.forEach(function(card) {
    card.addEventListener('click', function() {
        openCards.push(card); 
        card.classList.add('open', 'show');

        if(openCards.length < 2) {
            setTimeout(function() {
                openCards.forEach(function(card) {
                    card.classList.remove('open', 'show');
                });
                openCards = []; 
            }, 1000); 
        }
    });
});








        // if(openCards.length < 2) {
            //     openCards.push(allCards[i]); 
            //     this.classList.add('open', 'show');  
            // }
            // else {
            //     setTimeout(function() {
            //         openCards.forEach(function(card) {
            //             card.classList.remove('open', 'show')
            //         })
            //     }, 1000); 
            // }