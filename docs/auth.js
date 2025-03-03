import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCQBM2lJabF0jiQeBp0R5RAA0BnGDjZuLY",
    authDomain: "articlex-f2b8f.firebaseapp.com",
    projectId: "articlex-f2b8f",
    storageBucket: "articlex-f2b8f.appspot.com",
    messagingSenderId: "392539639323",
    appId: "1:392539639323:web:2dfbf35b2b4adfa70ef2be",
    measurementId: "G-5E5TYNZJQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// Ensure DOM is loaded before executing authentication checks
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = "login.html";
        } else {
            document.getElementById("userName").innerText = user.displayName || "User";
            loadUserProfile(user.uid);
        }
    });

    // Logout Button - Ensure it exists before adding event listener
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            signOut(auth).then(() => {
                window.location.href = "login.html";
            });
        });
    }

    // Save Bio
    document.getElementById("saveBio").addEventListener("click", async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                bio: document.getElementById("bioText").value
            }, { merge: true });
            alert("Bio saved!");
        }
    });

    // Save Links
    document.getElementById("saveLinks").addEventListener("click", async () => {
        const user = auth.currentUser;
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                website: document.getElementById("websiteLink").value,
                twitter: document.getElementById("twitterLink").value
            }, { merge: true });
            alert("Links saved!");
        }
    });

    // Upload Profile Picture
    document.getElementById("uploadProfilePic").addEventListener("change", async (event) => {
        const user = auth.currentUser;
        if (user) {
            const file = event.target.files[0];
            const storageRef = ref(storage, `profilePictures/${user.uid}`);
            await uploadBytes(storageRef, file);
            const imageUrl = await getDownloadURL(storageRef);
            document.getElementById("profilePic").src = imageUrl;
            await setDoc(doc(db, "users", user.uid), { profilePic: imageUrl }, { merge: true });
            alert("Profile picture updated!");
        }
    });
});

// Load Profile Data Function
async function loadUserProfile(userId) {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById("bioText").value = userData.bio || "";
        document.getElementById("websiteLink").value = userData.website || "";
        document.getElementById("twitterLink").value = userData.twitter || "";
        if (userData.profilePic) {
            document.getElementById("profilePic").src = userData.profilePic;
        }
    }
}
