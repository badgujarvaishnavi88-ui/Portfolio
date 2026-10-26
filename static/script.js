// ---------- 1. DARK / LIGHT MODE ----------
const themeBtn = document.getElementById("themeBtn");
const html = document.documentElement;

function updateButtonText(theme) {
  themeBtn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
}

// Load the saved theme (if the visitor chose one earlier)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-bs-theme", savedTheme);
}
updateButtonText(html.getAttribute("data-bs-theme"));

themeBtn.addEventListener("click", function () {
  const current = html.getAttribute("data-bs-theme");
  const newTheme = current === "light" ? "dark" : "light";

  html.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateButtonText(newTheme);
});


// ---------- 2. FORM VALIDATION ----------
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", function (event) {
  event.preventDefault();                    // stop the page reload

  if (form.checkValidity()) {
    successMsg.classList.remove("d-none");   // show success
    form.reset();                            // clear the fields
    form.classList.remove("was-validated");
  } else {
    successMsg.classList.add("d-none");      // hide success
    form.classList.add("was-validated");     // show red error messages
  }
});


// ---------- 3. BACK TO TOP BUTTON ----------
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ---------- 4. AUTO FOOTER YEAR ----------
document.getElementById("year").textContent = new Date().getFullYear();


// ---------- 5. ROTATING ROLE TEXT (slide, fade, flip) ----------
const roles = [
  { text: "Fresher",          effect: "effect-slide" },
  { text: "Web Developer",    effect: "effect-fade"  },
  { text: "Python Developer", effect: "effect-flip"  }
];

const roleText = document.getElementById("roleText");
let index = 0;

function showRole() {
  const role = roles[index];

  roleText.className = "role-text";        // 1. remove the old effect
  void roleText.offsetWidth;               // 2. force the browser to reset
  roleText.textContent = role.text;        // 3. change the words
  roleText.classList.add(role.effect);     // 4. start the new effect

  index = (index + 1) % roles.length;      // 5. next role (loops back to 0)
}

showRole();
setInterval(showRole, 2500);


// ---------- 6. SCROLL REVEAL ----------
const revealItems = document.querySelectorAll(
  ".section-title, section .row > *, .timeline-item"
);

revealItems.forEach(function (item) {
  item.classList.add("reveal");
});

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);    // animate only once
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(function (item) {
  observer.observe(item);
});