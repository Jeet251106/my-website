import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7jf2EEt78PfwRo-GG5wiw_lddKQWZnDw",
  authDomain: "databaseorwot.firebaseapp.com",
  databaseURL: "https://databaseorwot-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "databaseorwot",
  storageBucket: "databaseorwot.appspot.com",
  messagingSenderId: "669163374689",
  appId: "1:669163374689:web:ede81234a6a8b675d5c220"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup function
window.signup = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
};

// Login function
window.login = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
};

// Logout function
window.logout = async () => {
  await signOut(auth);
};

// Firebase Auth State Change Listener
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById('authStatus');
  const authInputs = document.getElementById('authInputs');
  const authButtons = document.getElementById('authButtons');
  const logoutBtn = document.getElementById('logoutBtn');
  const appSection = document.getElementById('appSection');

  if (user) {
    status.textContent = `Logged in as ${user.email}`;
    authInputs.classList.add('hidden');
    authButtons.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    appSection.classList.remove('hidden');
  } else {
    status.textContent = 'Not logged in';
    authInputs.classList.remove('hidden');
    authButtons.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    appSection.classList.add('hidden');
  }
});
