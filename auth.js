document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let user = {
    username: username,
    password: password,
    progress: {}
  };

  localStorage.setItem("user_" + username, JSON.stringify(user));

  alert("Signup successful!");
  window.location.href = "login.html";
});