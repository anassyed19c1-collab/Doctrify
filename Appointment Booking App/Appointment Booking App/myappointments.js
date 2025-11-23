import { supabaseAPI } from "./supabase.js";

import { initNavbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
});

const currentUser = JSON.parse(localStorage.getItem("user"));

// Auth Check
if (!currentUser) {
  alert("Please login first!");
  window.location.href = "login.html";
}

// Header Logout Functionality

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

// DOM Elements

const logoutBtn = document.getElementById("loginLink");
const appointmentsContainer = document.getElementById("appointmentsContainer");

// Load Appointments
const loadAppointments = async () => {
  appointmentsContainer.innerHTML = `<p class="no-data">Loading your appointments...</p>`;

  // Get current user's username from "users" table
  const { data: userData, error: userError } = await supabaseAPI
    .from("users")
    .select("user_name")
    .eq("id", currentUser.id)
    .single();

  const { data: appointments, error } = await supabaseAPI
    .from("appointments")
    .select("*")
    .eq("user_id", currentUser.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading appointments:", error.message);
    appointmentsContainer.innerHTML = `<p class="no-data">Failed to load appointments.</p>`;
    return;
  }

  console.log("Fetched appointments:", appointments);

  if (!appointments || appointments.length === 0) {
    appointmentsContainer.innerHTML = `<p class="no-data">No appointments found.</p>`;
    return;
  }

  appointmentsContainer.innerHTML = "";

  for (let appt of appointments) {
    const { data: diseaseData } = await supabaseAPI
      .from("diseases")
      .select("disease_name")
      .eq("id", appt.disease_id)
      .single();

    const { data: doctorData } = await supabaseAPI
      .from("doctors")
      .select("dr_name, dr_specialization")
      .eq("id", appt.doctor_id)
      .single();

    const disease = diseaseData?.disease_name || "N/A";
    const doctor = doctorData?.dr_name || "N/A";
    const specialization = doctorData?.dr_specialization || "N/A";
    const username = userData?.user_name || "Unknown Patient";

    let statusClass = "pending";
    if (appt.status === "Confirmed") statusClass = "confirmed";
    if (appt.status === "Cancelled") statusClass = "cancelled";

    const card = document.createElement("div");
    card.className = "card";
    card.className = `card ${statusClass}`;
    card.innerHTML = `
    <h3>${doctor}</h3>
      <p><strong>Specialization:</strong> ${specialization}</p>
      <p><strong>Patient:</strong> ${username}</p>
      <p><strong>Disease:</strong> ${disease}</p>
      <p><strong>Day:</strong> ${appt.day}</p>
      <p><strong>Time:</strong> ${appt.time_slot}</p>
      <span class="status ${statusClass}"> <b> Status: </b> ${
      appt.status
    }</span>
      ${
        appt.status === "Pending"
          ? `<button class="cancel-btn" data-id="${appt.id}">Cancel</button>`
          : ""
      }
        
        ${
          appt.status === "Cancelled"
            ? `<button class="delete-btn" data-id="${appt.id}">Delete</button>`
            : ""
        }

    `;
    appointmentsContainer.appendChild(card);
  }

  // Cancel button
  document.querySelectorAll(".cancel-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      if (confirm("Cancel this appointment?")) {
        const { error } = await supabaseAPI
          .from("appointments")
          .update({ status: "Cancelled" })
          .eq("id", id);
        if (error) {
          alert("Error cancelling appointment");
          console.error(error.message);
          return;
        }
        alert("Appointment cancelled!");
        loadAppointments();
      }
    });
  });

  // Step: Delete Button Functionality
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      if (confirm("Delete this appointment permanently?")) {
        const { error } = await supabaseAPI
          .from("appointments")
          .delete()
          .eq("id", id);
        if (error) {
          alert("Error deleting appointment");
          console.error(error.message);
          return;
        }
        alert("Appointment deleted!");
        loadAppointments();
      }
    });
  });
};

loadAppointments();
