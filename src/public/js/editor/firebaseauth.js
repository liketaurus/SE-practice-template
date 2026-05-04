// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVhJoj2QCmOlWAc9EgvcFFldD8yLp1l64",
  authDomain: "login-form-ee124.firebaseapp.com",
  projectId: "login-form-ee124",
  storageBucket: "login-form-ee124.firebasestorage.app",
  messagingSenderId: "259752683163",
  appId: "1:259752683163:web:b27897c06bfe6c62de483e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window._firebaseAuth = auth;
window._firebaseDb = db;
window._firestoreFns = { doc, setDoc };

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      document.querySelectorAll('.name-user').forEach(el => {
        el.textContent = data.username || 'User';
      });
      document.querySelectorAll('.email-user').forEach(el => {
        el.textContent = data.email || user.email;
      });
      localStorage.setItem('tasks', JSON.stringify(data.tasks || []));
      if (typeof sortGrid === 'function') sortGrid();
    }
  } else {
    if (window.location.pathname.includes("home.html")) {
      window.location.href = "index.html";
    }
  }
});

const submit_R = document.getElementById('submit-r');
const submit_L = document.getElementById('submit-l');

if (submit_R) {
  submit_R.addEventListener('click', async (e) => {
    e.preventDefault();
    const username = document.getElementById('user-register').value;
    const email_r = document.getElementById('email-register').value;
    const password_r = document.getElementById('password-register').value;
    const wrapper = document.querySelector('.wrapper');

    if (!username || !email_r || !password_r) {
      alert("Fill in all fields");
      return;
    }
    if (password_r.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    createUserWithEmailAndPassword(auth, email_r, password_r)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData = { email: email_r, username: username };
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, userData);
        await auth.signOut();
        wrapper.classList.remove('active');
      })
      .catch((error) => {
         const errorCode = error.code;
        if(errorCode == "auth/email-already-in-use"){
          alert("This email is already registered");
        }
        else if(errorCode == "auth/invalid-email"){
          alert("Invalid email format");
        }
        else if(errorCode == "auth/invalid-credential"){
          alert("Wrong email or password");
        }
      });
  });

}

if (submit_L) {
  submit_L.addEventListener('click', (event) => {
    event.preventDefault();
    const password_l = document.getElementById('login-password').value;
    const email_l = document.getElementById('login-email').value.trim().toLowerCase();

    signInWithEmailAndPassword(auth, email_l, password_l)
      .then((userCredential) => {
        window.location.href = "home.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-email") {
          alert("Invalid email format");
        } 
        else if (errorCode === "auth/user-not-found") {
          alert("User not found");
        } 
        else if (errorCode === "auth/wrong-password") {
          alert("Wrong password");
        } 
        else if (errorCode === "auth/invalid-credential") {
          alert("Invalid email or password");
        } 
        else if (errorCode === "auth/too-many-requests") {
          alert("Too many attempts, try again later");
        }
      });
  });
}