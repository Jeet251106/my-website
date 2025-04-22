// Timer Variables
let timer;
let time = 20 * 60;  // Default: Normal mode (20 min work)
let running = false;
let cyclesCompleted = 0;
let isWorkSession = true;  // Alternate between work and break

// Challenge Variables
let goal = 0;
let challengeType = "cycles";
let challengeActive = false;

const modes = {
    easy: { work: 10 * 60, break: 5 * 60 },
    normal: { work: 20 * 60, break: 5 * 60 },
    advanced: { work: 30 * 60, break: 10 * 60 },
    extreme: { work: 60 * 60, break: 15 * 60 }
};

// 🔥 Update Timer Display
function updateDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// 🔁 Change Mode
function changeMode() {
    if (challengeActive) {
        alert("You can't change the mode during an active challenge.");
        return;
    }

    const mode = document.getElementById("timer-mode").value;
    time = modes[mode].work;
    updateDisplay();
    stopTimer();
}

// ▶️ Start Timer
function startTimer() {
    if (running) return;
    running = true;

    timer = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            stopTimer();

            if (isWorkSession) {
                cyclesCompleted++;  // Only count work cycles
                if (challengeActive) {
                    updateChallengeProgress();
                }
            }

            isWorkSession = !isWorkSession;  
            time = isWorkSession 
                ? modes[document.getElementById("timer-mode").value].work
                : modes[document.getElementById("timer-mode").value].break;

            updateDisplay();

            if (isWorkSession) {
                alert("Work session completed! Time for a break.");
            } else {
                alert("Break time over! Back to work.");
            }

            startTimer();  // Auto-continue with break/work cycle
        }
    }, 1000);
}

// ⏸️ Pause Timer
function pauseTimer() {
    clearInterval(timer);
    running = false;
}

// 🔄 Reset Timer
function resetTimer() {
    if (challengeActive) {
        alert("You can't reset the timer during an active challenge.");
        return;
    }

    const mode = document.getElementById("timer-mode").value;
    time = modes[mode].work;
    isWorkSession = true;
    updateDisplay();
    stopTimer();
}

// ⏹️ Stop Timer
function stopTimer() {
    clearInterval(timer);
    running = false;
}

// 🎯 Self-Challenge Feature
function startChallenge() {
    if (challengeActive) {
        alert("You already have an active challenge. Give up or complete it first.");
        return;
    }

    const goalInput = document.getElementById("challenge-goal").value;
    challengeType = document.getElementById("challenge-type").value;

    goal = parseInt(goalInput, 10);

    // Validate goal input
    if (isNaN(goal) || goal <= 0) {
        alert("Please enter a valid challenge goal.");
        return;
    }

    // Activate challenge
    challengeActive = true;
    cyclesCompleted = 0;
    updateChallengeProgress();
    
    // Add "Give Up" button dynamically
    const challengeSection = document.querySelector(".challenge-section");
    if (!document.getElementById("give-up-btn")) {
        const giveUpBtn = document.createElement("button");
        giveUpBtn.id = "give-up-btn";
        giveUpBtn.textContent = "Give Up";
        giveUpBtn.style.background = "#ff4d4d";
        giveUpBtn.style.color = "#fff";
        giveUpBtn.style.border = "none";
        giveUpBtn.style.padding = "10px 20px";
        giveUpBtn.style.cursor = "pointer";
        giveUpBtn.style.marginTop = "10px";
        giveUpBtn.onclick = giveUpChallenge;

        challengeSection.appendChild(giveUpBtn);
    }
}

// 🔥 "Give Up" Challenge
function giveUpChallenge() {
    if (!challengeActive) return;

    if (confirm("Are you sure you want to give up on this challenge?")) {
        challengeActive = false;
        cyclesCompleted = 0;
        goal = 0;
        updateChallengeProgress();

        // Remove "Give Up" button
        const giveUpBtn = document.getElementById("give-up-btn");
        if (giveUpBtn) {
            giveUpBtn.remove();
        }

        alert("Challenge ended.");
    }
}

// 🔥 Update Challenge Progress
function updateChallengeProgress() {
    const progressDisplay = document.getElementById("challenge-progress");

    if (challengeType === "cycles") {
        progressDisplay.textContent = `Progress: ${cyclesCompleted} / ${goal} cycles`;
        if (cyclesCompleted >= goal) {
            alert("Challenge completed! 🎯");
            challengeActive = false;

            // Remove "Give Up" button on completion
            const giveUpBtn = document.getElementById("give-up-btn");
            if (giveUpBtn) {
                giveUpBtn.remove();
            }
        }
    } else if (challengeType === "hours") {
        const completedHours = (cyclesCompleted * modes.normal.work) / 3600;  
        progressDisplay.textContent = `Progress: ${completedHours.toFixed(2)} / ${goal} hours`;
        
        if (completedHours >= goal) {
            alert("Challenge completed! 🎯");
            challengeActive = false;

            // Remove "Give Up" button on completion
            const giveUpBtn = document.getElementById("give-up-btn");
            if (giveUpBtn) {
                giveUpBtn.remove();
            }
        }
    }
}

// ✅ Event Listeners
document.getElementById("start").onclick = startTimer;
document.getElementById("pause").onclick = pauseTimer;
document.getElementById("reset").onclick = resetTimer;
document.getElementById("challenge-goal").onchange = updateChallengeProgress;

// Initial Display
updateDisplay();
