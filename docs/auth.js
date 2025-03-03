import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Signup Function
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page refresh

    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

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

        alert("Signup Successful! Redirecting to Dashboard...");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});

// Login Function
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page refresh

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful! Redirecting to Dashboard...");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});
