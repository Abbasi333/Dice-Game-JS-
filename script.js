'use strict';
//selectring the elements
const score0E1 = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnroll = document.querySelector('.btn--roll');
const btnnew = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//selecting the elements
//starting conditions set score to zero and set the dice hidden
score0E1.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
//make the switchplayer function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//make the switchplayer function
let currentScore, activePlayer, scores, playing;

//initial function
const intial = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0E1.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
intial();
//intial function

// rolling dice functinality
btnroll.addEventListener('click', function () {
  //generate the random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    //display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check if roll equal to one
    //if true switch the player
    if (dice !== 1) {
      // if true
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; //change later
    } else {
      // switch the player
      switchPlayer();
    }
  }
});

//hold button functionality
btnhold.addEventListener('click', function () {
  if (playing) {
    // add current score to the total

    scores[activePlayer] += currentScore;
    //display
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score is >=100
    if (scores[activePlayer] >= 100) {
      //   if true then player win
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // if false then switch player
      switchPlayer();
    }
  }
});

// new btn functionality
btnnew.addEventListener('click', intial);
