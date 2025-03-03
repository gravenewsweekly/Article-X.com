import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.href = "index.html";
        } else {
            document.getElementById("userName").innerText = user.displayName || "User";

            // Fetch additional profile data
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.profilePic) {
                    document.getElementById("profilePic").src = userData.profilePic;
                }
            }
        }
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "index.html";
        });
    });
});
