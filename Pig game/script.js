'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
// the dot was for classes and # is for id (just like in html)
// Other way of selecting element throught their ids (this method works only for id)
const score1El = document.getElementById('score--1');
// Here we don't have to mention # since we are not writting a selector and instead getting the element directly with id. Here getElementById is supposed to be faster than query selector, but it is only relevent when we are selecting thousands of elements at once.
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
// For getting the current score of player 1
const current1El = document.getElementById('current--1');
// For getting the current score of player 2
let scores, currentScore, activePlayer, playing;
const initial = function () {
  scores = [0, 0];
  // We are storing the scores in an array, so the player 1 will have their value stored in current--0 and player 2 will have it stored in current--1.
  // so we create an array scores for that purpose. We also give activePlayer variable the value 0 because we want to start the game by the first player. When we switch the player the activePlayer value will become 1 and vice-versa.
  currentScore = 0;
  activePlayer = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  playing = true;
  //Here we create a boolean variable to see if the player is playing or not. If we declare a condition of if playing in button rol while giving the playing variable the value ture, the button roll will occur else it won't.
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initial();
const switchPlayer = function () {
  //  Resetting the current score: If the player switches (for instance player 1 switches to player 2) we must reset the score of the previous player(player 1 in this case) (this must be doen before the switch)
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Here while switching, For instance if player 1 has a score of 45, that value (since it is stored in currentScore variable) gets add on to the player 2's current score, so in order to completely reset it we must make the currentScore value to 0.

  // switch the player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Here we use Ternary operator to reassign the active player. If we get a dice roll of 1 we will check whether active player is 1 or 0. If the activePlayer is equal to 0 then change it to 1 else keep it 0.

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  //  Toggle method is another method which add a class if it is not there and remove a class if it is there.)
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1) Generating a random dice roll.
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Generated a random number as dice roll between 1 to 6

    //2) display the dice.
    diceEl.classList.remove('hidden');
    // Removed the hidden class to display the dice image
    diceEl.src = `dice-${dice}.png`;
    // First we use the src attribute of image tag (from html) to select the image.
    // then we use a template literal to dynamically load the image (change the images)
    // console.log(dice);

    //3) check for rolled 1
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // Here above, we store the current score dynamically using template literal. When the activePlayer is on position 0, the currentscore will be stored in current--0 {stored for player 1} and when the activePlayer is on position 1, the currentscore will be stored for current--1 {stored for player 2}. (Consider the game logic. When player 1 is playing, his score will be stored in current--0 and when player 2 is playing, his score will be stored in current--1).

      // current0El.textContent = currentScore; //Will change later since we need to display the score for the current player and not to add up all the values all together (not always for player number 1 but also for player 2). *This one will only store the currentscore on player 1 since we are saving it only for player1 (selecting player 1).
    } else {
      // Switching players
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1)Add the current score to the active player's score
    scores[activePlayer] += currentScore;
    //  for eg scores[1] = scores[1]+ currentScore
    // Meaning that scores of active player 1 (scores of player 1) will be added with currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2) Check if the player's score is >= 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }

    // If yes then Finish the game

    // Else switch players
    else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  initial();
});
