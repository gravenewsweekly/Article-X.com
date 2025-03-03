import { auth, db, storage } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-storage.js";

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        document.getElementById("userEmail").innerText = user.email;
        loadUserProfile(user.uid);
    }
});

// Logout Function
document.getElementById("logoutBtn")?.addEventListener("click", () => {
    signOut(auth).then(() => window.location.href = "login.html");
});

// Load User Profile
async function loadUserProfile(userId) {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
        const userData = userDoc.data();
        document.getElementById("bioText").value = userData.bio || "";
        document.getElementById("profilePic").src = userData.profilePic || "default-avatar.png";
    }
}

// Save Profile Data
document.getElementById("saveProfile")?.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (user) {
        await setDoc(doc(db, "users", user.uid), { bio: document.getElementById("bioText").value }, { merge: true });
        alert("Profile Updated!");
    }
});

// Upload Profile Picture
document.getElementById("uploadProfilePic")?.addEventListener("change", async (event) => {
    const user = auth.currentUser;
    if (user) {
        const file = event.target.files[0];
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        document.getElementById("profilePic").src = imageUrl;
        await setDoc(doc(db, "users", user.uid), { profilePic: imageUrl }, { merge: true });
    }
});
