const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

function showRegister() {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  document.getElementById("formTitle").innerText = "Register";
}

function showLogin() {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  document.getElementById("formTitle").innerText = "Login";
}

/* ================= REGISTER ================= */
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = regName.value.trim();
  const email = regEmail.value.trim();
  const phone = regPhone.value.trim();
  const password = regPassword.value.trim();
  const error = document.getElementById("registerError");

  if (!name || !email || !phone || !password) {
    error.innerText = "All fields are required";
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    error.innerText = "Invalid email format";
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    error.innerText = "Phone number must be 10 digits";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(user => user.email === email)) {
    error.innerText = "Email already registered";
    return;
  }

  users.push({ name, email, phone, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful");
  showLogin();
});

/* ================= LOGIN ================= */
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();
  const error = document.getElementById("loginError");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const validUser = users.find(
    user => user.email === email && user.password === password
  );

  if (!validUser) {
    error.innerText = "Invalid email or password";
    return;
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("loggedUser", JSON.stringify(validUser));

  window.location.href = "index.html"; // ecommerce page
});





const userData = {
  name: username,      // register 
  email: email,
  phone: phone,
  password: password
};

localStorage.setItem("loggedUser", JSON.stringify(userData));
localStorage.setItem("isLoggedIn", "true");

