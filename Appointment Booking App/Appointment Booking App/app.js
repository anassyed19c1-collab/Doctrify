import { supabaseAPI } from "./supabase.js";

import { initNavbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
});

// Scroll JS

let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  if (scrollTop > lastScrollTop) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
  lastScrollTop = scrollTop;
});

const logout = async () => {
  await supabaseAPI.auth.signOut();
  localStorage.removeItem("user");
  localStorage.removeItem("session");
  alert("Logged out successfully!");
  window.location.href = "login.html";
};

// Dynamic Navbar update
document.addEventListener("DOMContentLoaded", async () => {
  const loginLink = document.getElementById("loginLink");
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData && loginLink) {
    loginLink.textContent = "Logout";
    loginLink.href = "#";
    loginLink.addEventListener("click", logout);
  }
});

export const checkUserSession = async () => {
  // First check Supabase session
  const { data, error } = await supabaseAPI.auth.getSession();

  // If no session, check localStorage
  const localUser = JSON.parse(localStorage.getItem("user"));

  if (!data.session && !localUser) {
    alert("Please login first!");
    window.location.href = "login.html";
  }

  // Return user for future use
  return localUser || data.session?.user;
};

// Ye function check karega agar user already logged in hai
export const checkUserLogin = async () => {
  const { data } = await supabaseAPI.auth.getSession();
  const session = data.session;
  const localUser = JSON.parse(localStorage.getItem("user"));

  // Agar session aur local storage dono me user milta hai
  if (session && localUser) {
    // Redirect user to homepage if already logged in
    window.location.href = "index.html";
  }
};

// // Hamburger menu toggle JS

// const menuToggle = document.getElementById("menuToggle");
// const nav = document.querySelector("nav");

// menuToggle.addEventListener("click", () => {
//   nav.classList.toggle("show");
// });
