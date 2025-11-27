# Technical Documentation — Assignment 2

## 1. Overview
This project extends **Assignment 1** by adding **interactive, data-driven features** and polished **UX animations** while maintaining accessibility and responsive design.

---

## 2. File Structure
├── README.md
├── index.html # Main page markup and ARIA tags
├── css/
│ └── styles.css # Styling and transitions
├── js/
│ └── script.js # Interactive logic (JS events + validation)
├── assets/
│ └── images/ # Profile and project images
├── docs/ # Documentation (AI usage + technical)
│ ├── ai-usage-report.md
│ └── technical-documentation.md
└── .gitignore

---

## 3. Technologies Used
- **HTML5** (semantic structure, accessibility)  
- **CSS3** (Grid/Flexbox, animations, dark mode)  
- **JavaScript ES6+** (for DOM manipulation and localStorage)  

No external frameworks were used — pure HTML/CSS/JS to demonstrate core skills.

---

## 4. Key Functionalities
| Feature | Implementation Details |
|----------|------------------------|
| Theme Toggle | `body.dark` class + `localStorage` to save user preference. |
| Project Toggle | Each card has button that adds/removes `.hidden` class for details. |
| Filter Bar | Buttons with `data-filter` attributes show/hide matching cards and display “No projects found.” |
| Form Validation | JS checks empty fields + email pattern; inline errors and status message box replace `alert()`. |
| Animations | CSS transitions (`opacity`, `transform`) on hover, fade-in details, and smooth theme switching. |

---

## 5. Accessibility & Performance
- Semantic HTML tags and `aria-` attributes.  
- Keyboard-focus visibility via `:focus-visible`.  
- Alt text on images and aria-live region for form status.  
- Optimized assets (images compressed, lazy loading possible).

---

## 6. AI Integration
AI (ChatGPT GPT-5) assisted in planning, structuring, and improving code readability and docs.  
All final code was reviewed and tested manually.

---

## 7. Deployment
Deployed on **GitHub Pages**  
Steps:
1. Push repo to GitHub.  
2. Enable Pages → Source: `main`.  
3. Access live site via `https://<username>.github.io/assignment-2/`.

---

## 8. Maintenance Notes
- New projects can be added by duplicating the `.project-card` structure and assigning a `data-category`.  
- CSS transitions and JS functions are modular to extend easily for future React migration.

---

© 2025 Naif Al-Fareed