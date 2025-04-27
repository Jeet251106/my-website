// suggested.js

const suggestions = [
    "Take a walk 🚶‍♂️",
    "Stretch your body 🧘‍♀️",
    "Drink water 💧",
    "Listen to a song 🎵",
    "Do some breathing exercises 🌬️",
    "Grab a healthy snack 🍎",
    "Step outside for fresh air 🌳"
  ];
  
  export function showSuggestions() {
    const box = document.getElementById('suggestionsBox');
    const list = document.getElementById('suggestionsList');
    
    list.innerHTML = ''; // Clear existing
    
    suggestions.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
  
    box.classList.remove('hidden');
  }
  
  export function hideSuggestions() {
    const box = document.getElementById('suggestionsBox');
    box.classList.add('hidden');
  }
  
