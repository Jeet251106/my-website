let goal = 0;
let completedCycles = 0;

function startChallenge() {
    goal = parseInt(document.getElementById("goal").value, 10);
    completedCycles = 0;
    updateChallengeDisplay();
}

function completeCycle() {
    if (goal > 0) {
        completedCycles++;
        updateChallengeDisplay();
        checkChallengeCompletion();
    }
}

function updateChallengeDisplay() {
    const progress = document.getElementById("progress");
    progress.textContent = `Completed: ${completedCycles} / ${goal}`;
}

function checkChallengeCompletion() {
    const message = document.getElementById("message");

    if (completedCycles >= goal) {
        message.textContent = "🔥 Challenge Completed! Great job!";
    } else {
        message.textContent = "💪 Keep going!";
    }
}
