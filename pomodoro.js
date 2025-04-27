import { showSuggestions, hideSuggestions } from './suggested.js';

let timer;
let secondsLeft = 25 * 60; // 25 minutes in seconds
let isChallengeActive = false;
let pomodorosCompleted = 0;
let challengeGoal = 0;
let isTimerRunning = false;

// Create an audio element for the alarm sound
const alarmSound = new Audio('alarm.mp3');

// Timer Setup
function setTime(minutes) {
  clearInterval(timer);
  secondsLeft = minutes * 60;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  document.getElementById("timer").textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start/Stop Timer
document.getElementById("start").addEventListener("click", () => {
  if (isTimerRunning) {
    clearInterval(timer);
    document.getElementById("start").textContent = "Start";
  } else {
    timer = setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timer);
        alarmSound.play();
        alert("⏰ Time's up!");

        if (isChallengeActive) {
          pomodorosCompleted++;
          if (pomodorosCompleted >= challengeGoal) {
            alert("🎯 Challenge Completed!");
            giveUpChallenge();
          }
        }
      }
    }, 1000);
    document.getElementById("start").textContent = "Pause";
  }
  isTimerRunning = !isTimerRunning;
});

// Reset Timer
document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  secondsLeft = 25 * 60;
  updateTimerDisplay();
  isTimerRunning = false;
  document.getElementById("start").textContent = "Start";
});

// Challenge Setup
function startChallenge() {
  const challengeCount = document.getElementById("challengeCount").value;
  if (challengeCount && !isNaN(challengeCount) && challengeCount > 0) {
    challengeGoal = parseInt(challengeCount);
    pomodorosCompleted = 0;
    isChallengeActive = true;
    document.getElementById("challengeStatus").textContent = `Challenge started! Complete ${challengeGoal} Pomodoros!`;
    document.getElementById("giveUpBtn").classList.remove("hidden");
    document.getElementById("startChallengeBtn").classList.add("hidden");
  } else {
    alert("Please enter a valid number of Pomodoros for the challenge.");
  }
}

function giveUpChallenge() {
  isChallengeActive = false;
  challengeGoal = 0;
  pomodorosCompleted = 0;
  document.getElementById("challengeStatus").textContent = "Challenge failed or canceled.";
  document.getElementById("startChallengeBtn").classList.remove("hidden");
  document.getElementById("giveUpBtn").classList.add("hidden");
}

// To-Do List
function addTodo() {
  const todoInput = document.getElementById("todoInput").value;
  if (todoInput) {
    const todoList = document.getElementById("todoList");
    const li = document.createElement("li");
    li.classList.add("flex", "justify-between", "items-center", "space-x-2", "p-2", "bg-gray-700", "rounded");
    li.innerHTML = `
      <span>${todoInput}</span>
      <div class="flex space-x-2">
        <button onclick="markAsDone(this)" class="bg-green-500 px-2 py-1 rounded text-xs">Done</button>
        <button onclick="markAsPriority(this)" class="bg-yellow-500 px-2 py-1 rounded text-xs">Priority</button>
      </div>
    `;
    todoList.appendChild(li);
    document.getElementById("todoInput").value = '';
  }
}

// Pastel Colors
const pastelColors = {
  pomodoro: "#A7C7E7",
  shortBreak: "#A8E6CF",
  longBreak: "#D9B3FF",
  start: "#A0D8D3",
};

const buttonColors = {
  pomodoro: "#8FB1C7",
  shortBreak: "#80D1A2",
  longBreak: "#CAA6ED",
  start: "#7FB7B0",
};

// Update Background Color
function updateBackgroundColor(color, buttonColor) {
  document.body.style.backgroundColor = color;
  document.body.style.backgroundImage = "none";

  document.getElementById("pomodoroButton").style.backgroundColor = buttonColor.pomodoro;
  document.getElementById("shortBreakButton").style.backgroundColor = buttonColor.shortBreak;
  document.getElementById("longBreakButton").style.backgroundColor = buttonColor.longBreak;
  document.getElementById("start").style.backgroundColor = buttonColor.start;
}

// Mode Handlers
function switchToPomodoro() {
  updateBackgroundColor(pastelColors.pomodoro, buttonColors);
  setTime(25);
  hideSuggestions();
}

function switchToShortBreak() {
  updateBackgroundColor(pastelColors.shortBreak, buttonColors);
  setTime(5);
  hideSuggestions();
}

function switchToLongBreak() {
  updateBackgroundColor(pastelColors.longBreak, buttonColors);
  setTime(15);
  showSuggestions();
}

// Event Listeners
document.getElementById("pomodoroButton").addEventListener("click", switchToPomodoro);
document.getElementById("shortBreakButton").addEventListener("click", switchToShortBreak);
document.getElementById("longBreakButton").addEventListener("click", switchToLongBreak);

// Mark To-Do as Done
function markAsDone(button) {
  const li = button.closest("li");
  li.classList.add("line-through", "text-gray-400");
  button.disabled = true;
}

// Mark To-Do as Priority
function markAsPriority(button) {
  const li = button.closest("li");
  const todoList = document.getElementById("todoList");
  todoList.prepend(li);
  button.disabled = true;
}

// ====== Initialize Page ======
updateTimerDisplay();
updateBackgroundColor(pastelColors.pomodoro, buttonColors);
hideSuggestions();
