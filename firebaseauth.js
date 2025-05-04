// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn2z0khaLNLUtx54TeuxzyGnP3ypZFsKI",
  authDomain: "regis-4308d.firebaseapp.com",
  projectId: "regis-4308d",
  storageBucket: "regis-4308d.firebasestorage.app",
  messagingSenderId: "810804248185",
  appId: "1:810804248185:web:2297197ba78cf159811ea8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submission handler
document.getElementById("registration-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Collect form data
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const classValue = document.getElementById("class").value;
  const section = document.getElementById("section").value;
  const termsAccepted = document.getElementById("terms").checked;

  // Get selected laptop radio button value safely
  const laptopInput = document.querySelector('input[name="laptop"]:checked');
  const laptop = laptopInput ? laptopInput.value : null;

  if (!laptop) {
    alert("Please select whether you have a laptop.");
    return;
  }

  if (!termsAccepted) {
    alert("Please agree to the Terms and Conditions.");
    return;
  }

  try {
    await addDoc(collection(db, "registrations"), {
      name,
      email,
      mobile,
      class: classValue,
      section,
      laptop,
      timestamp: serverTimestamp()
    });

    alert("Registration successful! Your data has been saved.");
    document.getElementById("registration-form").reset();
  } catch (error) {
    console.error("Firebase error:", error);
    alert("Error saving data. Check console for details.");
  }
});
