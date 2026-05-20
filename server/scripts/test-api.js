
const axios = require('axios');

const randomHour = Math.floor(Math.random() * (22 - 10) + 10); // 10:00 to 22:00
const randomMinute = Math.floor(Math.random() * 59);
const timeString = `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;

const testReservation = {
    guestName: "API Test User " + Math.floor(Math.random() * 1000),
    phone: "+905551234567",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: timeString,
    guestCount: 2
};

console.log("Sending POST request to http://localhost:5000/api/reservations...");

axios.post('http://localhost:5000/api/reservations', testReservation)
    .then(response => {
        console.log("✅ Success! Status:", response.status);
        console.log("Response:", response.data);
    })
    .catch(error => {
        console.error("❌ Failed!");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    });
