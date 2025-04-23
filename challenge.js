let challengeGoal = 0;

function startChallenge() {
  challengeGoal = parseInt(document.getElementById('challengeCount').value);
  document.getElementById('challengeStatus').innerText = `Goal: ${challengeGoal} Pomodoros`;
}

function checkChallenge() {
  if (pomodoroDone >= challengeGoal && challengeGoal !== 0) {
    document.getElementById('challengeStatus').innerText = `🎉 Challenge complete! (${pomodoroDone}/${challengeGoal})`;
    challengeGoal = 0;
  } else if (challengeGoal > 0) {
    document.getElementById('challengeStatus').innerText = `In progress: ${pomodoroDone}/${challengeGoal}`;
  }
}
