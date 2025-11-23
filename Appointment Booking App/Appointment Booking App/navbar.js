// navbar.js

export const initNavbar = () => {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector("nav");

  // agar kisi page me ye elements hi na hon (for safety)
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
};
