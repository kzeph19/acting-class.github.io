// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Handle form submission
  const form = document.getElementById("applyForm");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popupMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent actual form submission
    popup.style.display = "block"; // Show popup
    popupMessage.innerText = "Congratulations! You have successfully applied."; // Set message
  });

  // Close popup when clicking outside the message box
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none"; // Hide popup
    }
  });

  // Integrate intl-tel-input for the phone input field
  const phoneInputField = document.querySelector("#phone");
  const iti = window.intlTelInput(phoneInputField, {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback("US"));
    },
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js", // for validation and formatting
  });


document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const phoneNumber = document.getElementById("phone").value;

    const data = {
      name: name,
      phoneNumber: phoneNumber,
    };

    // Replace the URL below with your Google Apps Script Web App URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbyNoAEeT9OOIrkl_-SZyjHUMNjqG10Kn1ImRK3AMThoF6PE-tvgtGbr8Yi9gH9AijSDUA/exec";

    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((response) => {
        alert("Your registration was successful!");
        document.getElementById("registrationForm").reset();
      })
      .catch((error) => console.error("Error!", error.message));
  });
