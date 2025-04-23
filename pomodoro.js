let timer;
let time = 1500;
let isRunning = false;
let pomodoroDone = 0;

function updateTimerDisplay() {
  const min = String(Math.floor(time / 60)).padStart(2, '0');
  const sec = String(time % 60).padStart(2, '0');
  document.getElementById('timer').innerText = `${min}:${sec}`;
}

function setTime(mins) {
  clearInterval(timer);
  isRunning = false;
  time = mins * 60;
  updateTimerDisplay();
}

document.getElementById('start').onclick = () => {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    time--;
    updateTimerDisplay();
    if (time <= 0) {
      clearInterval(timer);
      isRunning = false;
      pomodoroDone++;
      checkChallenge();
      alert('Time’s up!');
    }
  }, 1000);
};

document.getElementById('reset').onclick = () => {
  clearInterval(timer);
  isRunning = false;
  updateTimerDisplay();
};

updateTimerDisplay();
