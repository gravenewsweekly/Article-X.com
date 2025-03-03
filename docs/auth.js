import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Redirect function after login or signup
const redirectToDashboard = () => {
    console.log("Redirecting to dashboard...");
    window.location.href = "dashboard.html";  // Ensure dashboard.html exists
};

// Check authentication state and redirect if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user);
        redirectToDashboard();
    } else {
        console.log("No user logged in.");
    }
});

// Signup Function
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page refresh

    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user profile with username
        await updateProfile(user, { displayName: username });

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            username,
            email,
            bio: "",
            website: "",
            profilePic: ""
        });

        alert("Signup Successful! Redirecting...");
        redirectToDashboard();
    } catch (error) {
        alert(error.message);
    }
});

// Login Function
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page refresh

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful! Redirecting...");
        redirectToDashboard();
    } catch (error) {
        alert(error.message);
    }
});
