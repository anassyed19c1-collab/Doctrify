import { supabaseAPI } from "./supabase.js";


import { checkUserLogin } from "./app.js";


checkUserLogin();


import { initNavbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
});



const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();



    if (!email || !password) {
        alert("Please fill in all fields!");
        return;
    }


    if (!email.includes("@") || password.length < 6) {
        alert("Invalid email or password must be at least 6 characters!");
        return;
    }


    // Create user in Supabase Auth
    const { data, error } = await supabaseAPI.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("Error: " + error.message);
      return;
    } 



        const user = data.user;

    // Step 2: Insert into custom users table
    if (user) {
      const { error: insertError } = await supabaseAPI
        .from('users')
        .insert([
          {
            id: user.id, // same as auth user id
            user_name: name,
            user_email: email,
            user_role: 'patient'
          }
        ]);

      if (insertError) {
        console.error("Insert Error:", insertError.message);
        alert("Database insert failed: " + insertError.message);
        return;
      }

      alert('Signup successful! Please login now.');
      window.location.href = 'login.html';
}})
}   