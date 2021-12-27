"use strict";
// Initialisation
let playerCounter = 0,
  computerCounter = 0;
const options = ["scissors", "rock", "paper"]; // alternatively, use indexes to compare everything
// DOM
const playerPrompt = document.querySelector("#player-prompt");
const playerChoices = document.querySelectorAll(".player-choice");
const scoreboard = document.querySelector("#scoreboard");
const announcement = document.querySelector("#announcement");

function computerPlay() {
  const rand = Math.floor(Math.random() * options.length);
  return options[rand];
}

// Main flow

// !! Problem: loops are not possible without async
playerPrompt.textContent = `Rock, Paper or Scissors?`;

playerChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    playRound(choice.id);
  });
});

function playRound(playerSelection) {
  // Prevents the game running when either of them wins
  if (playerCounter >= 5 || computerCounter >= 5) {
    return;
  }

  const playerIndex = options.indexOf(playerSelection);
  const computerSelection = computerPlay();
  const computerIndex = options.indexOf(computerSelection);
  const compare = playerIndex - computerIndex;

  let roundResult;
  switch (compare) {
    case 0:
      roundResult = "tie";
      break;
    case -1:
      roundResult = "lose";
      break;
    // case -2, 1, 2
    default:
      roundResult = "win";
  }

  switch (roundResult) {
    case "tie":
      announcement.textContent = `It's a tie... both of you selected ${playerSelection}. Play this round again!`;
      return; // Start over again
    case "lose":
      announcement.textContent = `You lose this round! ${computerSelection} beats ${playerSelection}`;
      computerCounter++;
      break;
    case "win":
      announcement.textContent = `You win this round! ${playerSelection} beats ${computerSelection}`;
      playerCounter++;
      break;
  }

  // Update score if win or lose
  scoreboard.textContent = `Player score: ${playerCounter}; Computer score: ${computerCounter};`;

  // Declare winner
  if (playerCounter >= 5) {
    playerPrompt.textContent = `You win the game!`;
    return;
  } else if (computerCounter >= 5) {
    playerPrompt.textContent = `You lose the game!`;
    return;
  }

  // else, next round
  playerPrompt.textContent = `Rock, Paper or Scissors?`;
}
