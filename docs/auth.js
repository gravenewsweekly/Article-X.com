import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Signup Function
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();  // Prevent Refresh

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), { email, bio: "", website: "", profilePic: "" });

        alert("Signup Successful! Redirecting to Dashboard...");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(error.message);
    }
});

// Login Function
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();  // Prevent Refresh

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
