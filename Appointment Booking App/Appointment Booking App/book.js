import { supabaseAPI } from "./supabase.js";


import { initNavbar } from "./navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
});


  
  

// Header

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


//  DOM Elements
const diseaseSelect = document.getElementById("diseaseSelect");
const doctorSelect = document.getElementById("doctorSelect");
const daySelect = document.getElementById("daySelect");
const timeSelect = document.getElementById("timeSelect");
const appointmentForm = document.getElementById("appointmentForm");
const logoutBtn = document.getElementById("loginLink");

const currentUser = JSON.parse(localStorage.getItem("user"));

// Auth Check
if (!currentUser) {
  alert("Please login first!");
  window.location.href = "login.html";
}

// Load Diseases
const loadDiseases = async () => {
  const { data, error } = await supabaseAPI.from("diseases").select("*");

  if (error) {
    console.error("Error loading diseases:", error);
    return;
  }

  diseaseSelect.innerHTML = '<option value="">Select Disease</option>';
  data.forEach((disease) => {
    const option = document.createElement("option");
    option.value = disease.id;
    option.textContent = disease.disease_name;
    diseaseSelect.appendChild(option);
  });
};

// Load Doctors
diseaseSelect.addEventListener("change", async (e) => {
  const diseaseId = e.target.value;
  doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
  daySelect.disabled = true;
  timeSelect.disabled = true;

  if (!diseaseId) {
    doctorSelect.disabled = true;
    return;
  }

  const { data, error } = await supabaseAPI.from("doctors").select("*");

  if (error) {
    console.error("Error loading doctors:", error);
    return;
  }

  data.forEach((doc) => {
    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = `${doc.dr_name} (${doc.dr_specialization})`;
    doctorSelect.appendChild(option);
  });

  doctorSelect.disabled = false;
});

// Enable Day Select
doctorSelect.addEventListener("change", () => {
  if (doctorSelect.value) {
    daySelect.disabled = false;
  } else {
    daySelect.disabled = true;
    timeSelect.disabled = true;
  }
});

// Load Available Time Slots
daySelect.addEventListener("change", async () => {
  const selectedDoctor = doctorSelect.value;
  const selectedDay = daySelect.value;

  // Reset time slots before fetch
  timeSelect.disabled = true;
  for (let option of timeSelect.options) {
    option.disabled = option.value === "";
  }

  if (!selectedDoctor || !selectedDay) {
    return;
  }

  // Fetch already booked slots
  const { data: booked, error } = await supabaseAPI
    .from("appointments")
    .select("time_slot")
    .eq("doctor_id", selectedDoctor)
    .eq("day", selectedDay)
    .eq("status", "Pending");
    
    if (error) {
    console.error("Error fetching booked slots:", error);
    return;
  }

  const bookedSlots = booked.map((a) => a.time_slot);

  // Disable already booked ones
  for (let option of timeSelect.options) {
    if (bookedSlots.includes(option.value)) {
      option.disabled = true;
    }
  }

  // Finally enable dropdown
  timeSelect.disabled = false;
});

// Submit Appointment
appointmentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const disease_id = diseaseSelect.value;
  const doctor_id = doctorSelect.value;
  const day = daySelect.value;
  const time_slot = timeSelect.value;

  if (!disease_id || !doctor_id || !day || !time_slot) {
    alert("Please fill all fields!");
    return;
  }

  const { data, error } = await supabaseAPI
    .from("appointments")
    .insert([
      {
        user_id: currentUser.id,
        disease_id,
        doctor_id,
        day,
        time_slot,
        status: "Pending",
      },
    ])
    .select(); // ensures inserted data is returned

    if (error) {
      console.error("Booking Error:", error);
      alert(`Error booking appointment: ${error.message}`);
      return;
  }
  
  console.log("Inserted Appointment:", data);
  alert("Appointment booked successfully!");
  
  // Reset form
  appointmentForm.reset();
  doctorSelect.disabled = true;
  daySelect.disabled = true;
  timeSelect.disabled = true;
});

// Logout
loginLink.addEventListener("click", async () => {
  await supabaseAPI.auth.signOut();
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

// Initialize
const init = async () => {
  await loadDiseases();
};

init();