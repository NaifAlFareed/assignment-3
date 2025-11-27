// ===============================
// THEME TOGGLE (light / dark)
// ===============================
const bodyEl = document.body;
const themeBtn = document.getElementById("themeToggle");

// Initialize theme from localStorage
(function initTheme() {
  const saved = localStorage.getItem("theme"); // 'dark' | 'light' | null

  if (saved === "dark") {
    // dark mode = remove .light
    bodyEl.classList.remove("light");
    updateThemeButton();
  } else {
    // default / light mode
    bodyEl.classList.add("light");
    updateThemeButton();
  }
})();

// Sync button label + aria
function updateThemeButton() {
  const isLight = bodyEl.classList.contains("light");
  themeBtn?.setAttribute("aria-pressed", isLight ? "false" : "true");
  if (themeBtn) {
    themeBtn.textContent = isLight ? "🌙 Dark" : "☀️ Light";
  }
}

// Toggle theme & save preference
themeBtn?.addEventListener("click", () => {
  const nowLight = bodyEl.classList.toggle("light"); // true => light mode after click
  const newTheme = nowLight ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  updateThemeButton();
});

// ===============================
// COLLAPSIBLE PROJECT DETAILS
// ===============================
document.querySelectorAll(".project-card").forEach((card) => {
  const btn = card.querySelector(".toggle-details");
  const details = card.querySelector(".details");

  if (!btn || !details) return;

  btn.addEventListener("click", () => {
    const nowHidden = details.classList.toggle("hidden");
    // aria-expanded for accessibility
    btn.setAttribute("aria-expanded", nowHidden ? "false" : "true");
    btn.textContent = nowHidden ? "Show Details" : "Hide Details";
  });
});

// ===============================
// PROJECT FILTERING
// ===============================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const noResultsMsg = document.getElementById("noResultsMsg");

function applyFilter(category) {
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const cardCat = card.getAttribute("data-category");
    const match = category === "all" || category === cardCat;

    if (match) {
      card.classList.remove("hidden");
      visibleCount += 1;
    } else {
      card.classList.add("hidden");
    }
  });

  if (visibleCount === 0) {
    noResultsMsg.classList.remove("hidden");
  } else {
    noResultsMsg.classList.add("hidden");
  }
}

// click handlers for filter buttons
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const chosen = btn.getAttribute("data-filter");
    applyFilter(chosen);
  });
});

// default filter state
applyFilter("all");

// ===============================
// CONTACT FORM VALIDATION / FEEDBACK
// ===============================
const formEl = document.querySelector(".form");
const formStatusBox = document.querySelector(".form-status");

function showFieldError(fieldName, message) {
  const hint = document.querySelector(`.input-hint[data-for="${fieldName}"]`);
  if (hint) {
    hint.textContent = message || "";
    hint.classList.remove("ok");
  }
}

function showFieldOK(fieldName, message) {
  const hint = document.querySelector(`.input-hint[data-for="${fieldName}"]`);
  if (hint) {
    hint.textContent = message || "";
    hint.classList.add("ok");
  }
}

function validateEmailFormat(email) {
  // simple regex, good enough for demo
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(email);
}

if (formEl) {
  formEl.addEventListener("submit", (e) => {
    e.preventDefault(); // no backend

    const nameInput = formEl.querySelector("#name");
    const emailInput = formEl.querySelector("#email");
    const msgInput = formEl.querySelector("#message");

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const msgVal = msgInput.value.trim();

    let valid = true;

    // Required check
    if (!nameVal || !emailVal || !msgVal) {
      valid = false;
      showFieldError("name", !nameVal ? "Please enter your name." : "");
      showFieldError("email", !emailVal ? "Please enter your email." : "");
      showFieldError("message", !msgVal ? "Please enter a message." : "");
    } else {
      // clear empties
      showFieldError("name", "");
      showFieldError("message", "");
    }

    // Email format check
    if (emailVal && !validateEmailFormat(emailVal)) {
      valid = false;
      showFieldError("email", "Please enter a valid email address.");
    } else if (emailVal && validateEmailFormat(emailVal)) {
      showFieldOK("email", "Looks good ✓");
    }

    // Status box
    if (!valid) {
      formStatusBox.textContent = "Please fix the errors and try again.";
      formStatusBox.classList.remove("success");
      formStatusBox.classList.add("error");
      return;
    }

    // Success path
    formStatusBox.textContent = "Thanks! (Form demo only — no backend.)";
    formStatusBox.classList.remove("error");
    formStatusBox.classList.add("success");

    // Clear inputs
    nameInput.value = "";
    emailInput.value = "";
    msgInput.value = "";

    // Clear hints
    showFieldOK("name", "");
    showFieldOK("email", "");
    showFieldOK("message", "");
  });
}

// ===============================
// FOOTER YEAR
// ===============================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ===============================
// SMOOTH SCROLL FALLBACK
// ===============================
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
