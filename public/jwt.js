// Store the token in localStorage
if (window.token) {
  localStorage.setItem("token", window.token);
}

// Use the token for an authenticated request
const token = localStorage.getItem("token");

if (token) {
  fetch("/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Display the protected content on the dashboard
    });
}
