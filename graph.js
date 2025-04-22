// Initialize data
document.addEventListener("DOMContentLoaded", () => {
    loadGraphData();
});

function loadGraphData() {
    const graph = document.getElementById("graph");
    graph.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("progressData")) || Array(30).fill(0);

    for (let i = 0; i < 30; i++) {
        const day = document.createElement("div");
        day.classList.add("graph-day");

        let level = Math.min(4, Math.floor(data[i] / 2));  // Darker with more cycles
        day.dataset.level = level;

        day.title = `Day ${i + 1}: ${data[i]} cycles`;
        graph.appendChild(day);
    }
}

function trackCycle() {
    let data = JSON.parse(localStorage.getItem("progressData")) || Array(30).fill(0);
    
    const todayIndex = new Date().getDate() - 1;
    data[todayIndex]++;
    
    localStorage.setItem("progressData", JSON.stringify(data));
    loadGraphData();
}
