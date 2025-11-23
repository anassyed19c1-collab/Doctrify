import { supabaseAPI } from "./supabase.js";

import { checkUserLogin } from "./app.js";


checkUserLogin();


import { initNavbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
});



const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    const { data, error } = await supabaseAPI.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
      return;
    }

    const { user, session } = data;

    if (user) {
      // Store user + session in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("session", JSON.stringify(session));

      alert("Login successful!");
      window.location.href = "index.html";
    }
  });
}