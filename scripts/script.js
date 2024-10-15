let currentRemainingScore = 0;
let roundCount = 0;
let eachRoundScore = 0;

// Updating all time high score in html/ui
if (!localStorage.getItem("allTimeHighScore")) {
  localStorage.setItem("allTimeHighScore", 0);
} else {
  document.querySelector(
    ".all-time-high-score"
  ).innerHTML = `All time high score: ${localStorage.getItem(
    "allTimeHighScore"
  )}`;
}

// Updating current high score in html/ui
if (!sessionStorage.getItem("currentHighScore")) {
  sessionStorage.setItem("currentHighScore", 0);
} else {
  document.querySelector(
    ".current-high-score"
  ).innerHTML = `Current high score: ${sessionStorage.getItem(
    "currentHighScore"
  )}`;
}

let playButton = document.querySelector(".play-btn");
playButton.addEventListener("click", numberGenerationGame);

function numberGenerationGame() {
  roundCount++;
  eachRoundScore = 0;
  let resultObject;

  let num1 = Math.ceil(Math.random() * 8 + 1);
  let num2 = Math.ceil(Math.random() * 8 + 1);
  let num3 = Math.ceil(Math.random() * 8 + 1);

  document.querySelector(".first-num").innerText = num1;
  document.querySelector(".second-num").innerText = num2;
  document.querySelector(".third-num").innerText = num3;

  // Condition for all numbers are equal
  if (num1 === num2 && num2 === num3) {
    currentRemainingScore += 1000;
    eachRoundScore = 1000;
    resultObject = {
      currentRemainingScore: currentRemainingScore,
      gameComment:
        "You were lucky this time, you got 1000 INR as all the numbers are the same",
    };
  }

  // Condition for all numbers are even
  else if (num1 % 2 === 0 && num2 % 2 === 0 && num3 % 2 === 0) {
    currentRemainingScore += 300;
    eachRoundScore = 300;
    resultObject = {
      currentRemainingScore: currentRemainingScore,
      gameComment:
        "You were lucky this time, you got 300 INR as all the numbers are even",
    };
  }

  // Condition for all numbers are odd
  else if (num1 % 2 !== 0 && num2 % 2 !== 0 && num3 % 2 !== 0) {
    currentRemainingScore += 300;
    eachRoundScore = 300;
    resultObject = {
      currentRemainingScore: currentRemainingScore,
      gameComment:
        "You were lucky this time, you got 300 INR as all the numbers are odd",
    };
  }

  // Condition for all the numbers have a difference of 1
  else if (num2 - num1 === 1 && num3 - num2 === 1) {
    currentRemainingScore += 800;
    eachRoundScore = 800;
    resultObject = {
      currentRemainingScore: currentRemainingScore,
      gameComment:
        "You were lucky this time, you got 800 INR as all the numbers have a difference of 1",
    };
  }

  // Condition for bad luck hmm... :(
  else {
    resultObject = {
      currentRemainingScore: currentRemainingScore,
      gameComment: "You were not lucky this time",
    };
  }

  // Updating all time high score
  if (currentRemainingScore > +localStorage.getItem("allTimeHighScore")) {
    localStorage.setItem("allTimeHighScore", currentRemainingScore);
    document.querySelector(
      ".all-time-high-score"
    ).innerHTML = `All time high score: ${localStorage.getItem(
      "allTimeHighScore"
    )}`;
  }

  // Updating current high score
  if (currentRemainingScore > +sessionStorage.getItem("currentHighScore")) {
    sessionStorage.setItem("currentHighScore", currentRemainingScore);
    document.querySelector(
      ".current-high-score"
    ).innerHTML = `Current high score: ${sessionStorage.getItem(
      "currentHighScore"
    )}`;
  }

  updateScoreForNextRound(resultObject);
}

// Updating score for next round
function updateScoreForNextRound(resultObject) {
  currentRemainingScore = resultObject.currentRemainingScore;
  currentRemainingScore -= 100;

  if (currentRemainingScore <= 0) {
    resultObject.currentRemainingScore = currentRemainingScore;
    resultObject.gameComment = "Game Over";
    // document.querySelector(".play-btn").style.pointerEvents = "none";
    document.querySelector(".play-btn").style.cursor = "not-allowed";
    document.querySelector(".play-btn").style.opacity = 0.65;
    document
      .querySelector(".play-btn")
      .setAttribute("title", "Please restart the game");

    // Removing event listener
    playButton.removeEventListener("click", numberGenerationGame);
  }

  // Update Game comment
  document.querySelector(
    ".game-comment"
  ).innerText = `Game comment: ${resultObject.gameComment}`;
  // Update Each round score
  document.querySelector(
    ".each-round-score"
  ).innerText = `Round ${roundCount} score is: ${eachRoundScore}`;
  // Update Current remaining score
  document.querySelector(
    ".current-remaining-score"
  ).innerText = `Current remaining score is: ${currentRemainingScore}`;
}

// Game without UI
// function numberGenerationGame(currentRemainingScore) {
//   let num1 = Math.ceil(Math.random() * 8 + 1);
//   let num2 = Math.ceil(Math.random() * 8 + 1);
//   let num3 = Math.ceil(Math.random() * 8 + 1);

//   // Condition for all numbers are equal
//   if (num1 === num2 && num2 === num3) {
//     currentRemainingScore += 1000;
//     return {
//       currentRemainingScore: currentRemainingScore,
//       gameComment:
//         "You were lucky this time, you got 1000 INR as all the numbers are the same",
//     };
//   }

//   // Condition for all numbers are even
//   else if (num1 % 2 === 0 && num2 % 2 === 0 && num3 % 2 === 0) {
//     currentRemainingScore += 300;
//     return {
//       currentRemainingScore: currentRemainingScore,
//       gameComment:
//         "You were lucky this time, you got 300 INR as all the numbers are even",
//     };
//   }

//   // Condition for all numbers are odd
//   else if (num1 % 2 !== 0 && num2 % 2 !== 0 && num3 % 2 !== 0) {
//     currentRemainingScore += 300;
//     return {
//       currentRemainingScore: currentRemainingScore,
//       gameComment:
//         "You were lucky this time, you got 300 INR as all the numbers are odd",
//     };
//   }

//   // Condition for all the numbers have a difference of 1
//   else if (num2 - num1 === 1 && num3 - num2 === 1) {
//     currentRemainingScore += 800;
//     return {
//       currentRemainingScore: currentRemainingScore,
//       gameComment:
//         "You were lucky this time, you got 800 INR as all the numbers have a difference of 1",
//     };
//   }

//   // Condition for bad luck hmm... :(
//   else {
//     return {
//       currentRemainingScore: currentRemainingScore,
//       gameComment: "You were not lucky this time",
//     };
//   }
// }

// let resultObject;

// do {
//   console.log((resultObject = numberGenerationGame(currentRemainingScore)));
//   currentRemainingScore = resultObject.currentRemainingScore;
//   console.log((currentRemainingScore -= 100));
// } while (currentRemainingScore > 0);

// resultObject.currentRemainingScore = currentRemainingScore;
// resultObject.gameComment = "Game Over";
// console.log(resultObject);