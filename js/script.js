// =====================================
// THEME TOGGLE (light / dark)
// =====================================
const bodyEl = document.body;
const themeBtn = document.getElementById("themeToggle");

function updateThemeButton() {
  const isLight = bodyEl.classList.contains("light");
  if (themeBtn) {
    themeBtn.textContent = isLight ? "Switch to Dark" : "Switch to Light";
    themeBtn.setAttribute("aria-pressed", isLight ? "false" : "true");
  }
}

function applyTheme(theme, skipSave) {
  if (theme === "dark") {
    bodyEl.classList.remove("light");
  } else {
    bodyEl.classList.add("light");
  }
  if (!skipSave) {
    localStorage.setItem("theme", theme);
  }
  updateThemeButton();
}

(function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = savedTheme || (prefersDark ? "dark" : "light");
  applyTheme(initial, true);
})();

themeBtn?.addEventListener("click", () => {
  const isLight = bodyEl.classList.contains("light");
  applyTheme(isLight ? "dark" : "light");
});

// =====================================
// USER GREETING (persisted)
// =====================================
const greetingForm = document.getElementById("greetingForm");
const greetingInput = document.getElementById("greetingInput");
const greetingMessage = document.getElementById("greetingMessage");

function renderGreeting(name) {
  if (!greetingMessage) return;
  if (name) {
    greetingMessage.textContent = `Welcome back, ${name}!`;
    if (greetingInput) {
      greetingInput.value = name;
    }
  } else {
    greetingMessage.textContent = "Welcome! Tell me your name so I can greet you next time.";
  }
}

const storedName = localStorage.getItem("greetingName") || "";
renderGreeting(storedName);

greetingForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = greetingInput?.value.trim() || "";
  if (name.length < 2) {
    greetingMessage.textContent = "Please enter at least 2 characters.";
    return;
  }
  localStorage.setItem("greetingName", name);
  renderGreeting(name);
});

// =====================================
// COLLAPSIBLE PROJECT DETAILS
// =====================================
document.querySelectorAll(".project-card").forEach((card) => {
  const btn = card.querySelector(".toggle-details");
  const details = card.querySelector(".details");

  if (!btn || !details) return;

  btn.addEventListener("click", () => {
    const nowHidden = details.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", nowHidden ? "false" : "true");
    btn.textContent = nowHidden ? "Show Details" : "Hide Details";
  });
});

// =====================================
// PROJECT FILTERING
// =====================================
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
    noResultsMsg?.classList.remove("hidden");
  } else {
    noResultsMsg?.classList.add("hidden");
  }
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const chosen = btn.getAttribute("data-filter") || "all";
    applyFilter(chosen);
  });
});

applyFilter("all");

// =====================================
// CONTACT FORM VALIDATION / FEEDBACK
// =====================================
const formEl = document.querySelector(".form");
const formStatusBox = document.querySelector(".form-status");
const MIN_MESSAGE_LENGTH = 10;

function setFieldState(fieldName, message, ok) {
  const hint = document.querySelector(`.input-hint[data-for="${fieldName}"]`);
  if (!hint) return;
  hint.textContent = message || "";
  if (ok) {
    hint.classList.add("ok");
  } else {
    hint.classList.remove("ok");
  }
}

function validateEmailFormat(email) {
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(email);
}

function resetFormStatus() {
  if (!formStatusBox) return;
  formStatusBox.textContent = "";
  formStatusBox.classList.remove("error");
  formStatusBox.classList.remove("success");
}

if (formEl) {
  formEl.addEventListener("input", resetFormStatus);

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    resetFormStatus();

    const nameInput = formEl.querySelector("#name");
    const emailInput = formEl.querySelector("#email");
    const msgInput = formEl.querySelector("#message");

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const msgVal = msgInput.value.trim();

    let valid = true;

    if (!nameVal) {
      valid = false;
      setFieldState("name", "Please enter your name.", false);
    } else if (nameVal.length < 2) {
      valid = false;
      setFieldState("name", "Name must be at least 2 characters.", false);
    } else {
      setFieldState("name", "Looks good.", true);
    }

    if (!emailVal) {
      valid = false;
      setFieldState("email", "Please enter your email.", false);
    } else if (!validateEmailFormat(emailVal)) {
      valid = false;
      setFieldState("email", "Please enter a valid email address.", false);
    } else {
      setFieldState("email", "Looks good.", true);
    }

    if (!msgVal) {
      valid = false;
      setFieldState("message", "Please enter a message.", false);
    } else if (msgVal.length < MIN_MESSAGE_LENGTH) {
      valid = false;
      setFieldState("message", `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`, false);
    } else {
      setFieldState("message", "Thanks for the details.", true);
    }

    if (!valid) {
      if (formStatusBox) {
        formStatusBox.textContent = "Please fix the errors and try again.";
        formStatusBox.classList.remove("success");
        formStatusBox.classList.add("error");
      }
      return;
    }

    if (formStatusBox) {
      formStatusBox.textContent = "Thanks! Your message has been recorded locally.";
      formStatusBox.classList.remove("error");
      formStatusBox.classList.add("success");
    }

    nameInput.value = "";
    emailInput.value = "";
    msgInput.value = "";

    setFieldState("name", "", false);
    setFieldState("email", "", false);
    setFieldState("message", "", false);
  });
}

// =====================================
// FOOTER YEAR
// =====================================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// =====================================
// SMOOTH SCROLL FALLBACK
// =====================================
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

// =====================================
// GITHUB API: FETCH + FILTER + SORT
// =====================================
const githubUserForm = document.getElementById("githubUserForm");
const githubUsernameInput = document.getElementById("githubUsername");
const repoListEl = document.getElementById("repoList");
const repoStatusEl = document.getElementById("repoStatus");
const repoErrorEl = document.getElementById("repoError");
const repoEmptyEl = document.getElementById("repoEmpty");
const languageFilterSelect = document.getElementById("languageFilter");
const sortSelect = document.getElementById("sortSelect");

let reposCache = [];
let currentUsername = "";

function setRepoStatus(message) {
  if (repoStatusEl) {
    repoStatusEl.textContent = message;
  }
}

function showRepoError(message) {
  if (!repoErrorEl) return;
  repoErrorEl.textContent = message;
  repoErrorEl.classList.remove("hidden");
}

function clearRepoError() {
  if (!repoErrorEl) return;
  repoErrorEl.textContent = "";
  repoErrorEl.classList.add("hidden");
}

function updateLanguageOptions(repos) {
  if (!languageFilterSelect) return;

  const languages = new Set();
  let hasOther = false;
  repos.forEach((repo) => {
    if (repo.language) {
      languages.add(repo.language);
    } else {
      hasOther = true;
    }
  });

  const sorted = Array.from(languages).sort((a, b) => a.localeCompare(b));
  languageFilterSelect.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All languages";
  languageFilterSelect.appendChild(allOption);

  sorted.forEach((lang) => {
    const opt = document.createElement("option");
    opt.value = lang;
    opt.textContent = lang;
    languageFilterSelect.appendChild(opt);
  });

  if (hasOther) {
    const otherOpt = document.createElement("option");
    otherOpt.value = "Other";
    otherOpt.textContent = "Other";
    languageFilterSelect.appendChild(otherOpt);
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.valueOf())) return "Unknown";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function buildRepoCard(repo) {
  const li = document.createElement("li");
  li.className = "repo-card";

  const titleRow = document.createElement("div");
  titleRow.className = "repo-title";

  const link = document.createElement("a");
  link.href = repo.html_url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = repo.name;
  titleRow.appendChild(link);

  const visibility = document.createElement("span");
  visibility.className = "repo-chip";
  visibility.textContent = repo.private ? "Private" : "Public";
  titleRow.appendChild(visibility);

  li.appendChild(titleRow);

  const desc = document.createElement("p");
  desc.className = "repo-desc";
  desc.textContent = repo.description || "No description provided.";
  li.appendChild(desc);

  const meta = document.createElement("div");
  meta.className = "repo-meta";

  const lang = document.createElement("span");
  lang.className = "repo-chip";
  lang.textContent = repo.language || "Other";
  meta.appendChild(lang);

  const stars = document.createElement("span");
  stars.className = "repo-chip";
  stars.textContent = `Stars: ${repo.stargazers_count}`;
  meta.appendChild(stars);

  const updated = document.createElement("span");
  updated.className = "repo-chip";
  updated.textContent = `Updated ${formatDate(repo.updated_at)}`;
  meta.appendChild(updated);

  li.appendChild(meta);
  return li;
}

function sortRepos(repos, sortBy) {
  const copy = [...repos];
  if (sortBy === "stars") {
    copy.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sortBy === "name") {
    copy.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    copy.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }
  return copy;
}

function renderRepos() {
  if (!repoListEl) return;
  const chosenLang = languageFilterSelect?.value || "all";
  const sortBy = sortSelect?.value || "updated";

  const filtered = reposCache.filter((repo) => {
    const lang = repo.language || "Other";
    return chosenLang === "all" || lang === chosenLang;
  });

  const sorted = sortRepos(filtered, sortBy);
  repoListEl.innerHTML = "";

  if (sorted.length === 0) {
    repoEmptyEl?.classList.remove("hidden");
    if (currentUsername) {
      setRepoStatus(`No repos match the filters for ${currentUsername}.`);
    }
    return;
  }

  repoEmptyEl?.classList.add("hidden");
  if (currentUsername) {
    setRepoStatus(`Showing ${sorted.length} repos for ${currentUsername}.`);
  }
  const frag = document.createDocumentFragment();
  sorted.forEach((repo) => {
    frag.appendChild(buildRepoCard(repo));
  });
  repoListEl.appendChild(frag);
}

async function fetchRepos(username) {
  if (!username) {
    showRepoError("Please enter a GitHub username.");
    return;
  }

  if (!repoListEl) return;

  currentUsername = username;
  localStorage.setItem("githubUser", username);
  clearRepoError();
  repoEmptyEl?.classList.add("hidden");
  repoListEl.innerHTML = "";
  setRepoStatus("Loading repositories...");

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=20`,
    );

    if (!response.ok) {
      let message = "Unable to load repositories right now.";
      if (response.status === 404) {
        message = "GitHub user not found.";
      } else if (response.status === 403) {
        message = "Rate limit reached. Please try again later.";
      }
      throw new Error(message);
    }

    const data = await response.json();
    reposCache = Array.isArray(data) ? data.filter((repo) => !repo.archived) : [];
    updateLanguageOptions(reposCache);
    renderRepos();

    if (!reposCache.length) {
      repoEmptyEl?.classList.remove("hidden");
    }
    setRepoStatus(`Showing ${reposCache.length} repos for ${username}.`);
  } catch (error) {
    repoListEl.innerHTML = "";
    repoEmptyEl?.classList.add("hidden");
    showRepoError(error.message || "Unable to load repositories.");
    setRepoStatus("Could not load repositories.");
  }
}

githubUserForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = githubUsernameInput?.value.trim();
  fetchRepos(username);
});

languageFilterSelect?.addEventListener("change", renderRepos);
sortSelect?.addEventListener("change", renderRepos);

// Kick off initial load with remembered username or default value in the input
const initialUsername =
  localStorage.getItem("githubUser") ||
  (githubUsernameInput ? githubUsernameInput.value.trim() : "") ||
  "NaifAlFareed";

if (githubUsernameInput) {
  githubUsernameInput.value = initialUsername;
}
fetchRepos(initialUsername);
