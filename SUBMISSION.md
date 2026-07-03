# 📋 Submission Details

---

## 👤 Candidate Information

| Field                   | Your Details                   |
| ----------------------- | ------------------------------ |
| **Full Name**           | Vijay Patil                    |
| **Email**               | vijayptl0106@gmail.com         |
| **Phone**               | +91 70573 31995                |
| **GitHub Username**     | vijaypatil2003                 |
| **LinkedIn (optional)** | linkedin.com/in/vijaypatil0106 |
| **Current Location**    | Pune, Maharashtra              |

---

## 🔗 Repository & Deployment Links

| Link                              | URL                                                            |
| --------------------------------- | -------------------------------------------------------------- |
| **GitHub Repo** (forked)          | https://github.com/vijaypatil2003/cadmech-fullstack-assessment |
| **Live Frontend** (GitHub Pages)  | https://vijaypatil2003.github.io/cadmech-fullstack-assessment/ |
| **Live Backend** (Render/Railway) | https://cadmech-backend.onrender.com                           |

---

## 🛠️ Tech Choices

| Choice                            | Your Answer                           |
| --------------------------------- | ------------------------------------- |
| **Database Used**                 | SQLite                                |
| **ORM / Query Builder**           | Raw SQL via better-sqlite3            |
| **Additional Frontend Libraries** | react-hot-toast, Tailwind CSS         |
| **Additional Backend Libraries**  | better-sqlite3, cors, dotenv, express |
| **CSS Approach**                  | Tailwind CSS                          |

---

## ✅ Features Implemented

- [x] Dashboard with summary statistics
- [x] Equipment list view (table/grid)
- [x] Add new equipment with validation
- [x] Edit existing equipment
- [x] Delete equipment with confirmation dialog
- [x] Search by name
- [x] Filter by type and/or status
- [x] Responsive design (desktop + mobile)
- [x] REST API with proper error handling
- [x] Database with schema
- [x] Frontend deployed to GitHub Pages
- [x] Backend deployed to Render
- [x] View equipment detail modal
- [x] Extended search (name, serial number, location)
- [x] Date range filter by installed date

---

## 💬 Self Assessment

### What went well?

The service layer architecture came together cleanly — separating business logic (equipmentService), validation (equipmentValidator), and custom error classes (AppError) kept the codebase maintainable and made error handling consistent across all endpoints. The responsive table with progressive column hiding on smaller screens also worked well without a UI library.

### What was the hardest part?

Integrating SQLite with the starter schema.sql file was tricky — the file contained multiple DB variants (SQLite and MySQL) and required careful parsing to extract only the relevant SQLite block. Handling partial updates correctly (merging incoming payload with existing DB record before writing) also required attention to avoid accidentally overwriting fields with null.

### What would you do differently with more time?

I would add pagination to the equipment list for large datasets, implement proper input sanitization on the search parameter, and replace the schema.sql string-marker parsing in connection.js with a dedicated migrate.js file for a more robust DB setup.
The original assessment also included Tier 2 (bug fixing, CSV data import, data visualization) and Tier 3 (IoT simulation, health scoring). Given more time I would have implemented CSV bulk import for equipment data and a simple status breakdown chart on the dashboard as a Tier 2 contribution.

### AI Tools Usage

I used Claude (Anthropic) as a pair-programming assistant to review code structure, catch edge cases, and validate error handling. Every suggestion was reviewed and understood before applying — I can explain every decision and line of code in the follow-up interview.

---

## ⏱️ Time Spent

| Area                                   | Hours |
| -------------------------------------- | ----- |
| **Frontend UI/UX & Responsive Design** |   9   |
| **Backend API Development & DB**       |   8   |
| **Deployment (FE + BE)**               |   3   |
| **Documentation & Cleanup**            |   3   |
| **Total**                              |  23   |

---

## 📌 Additional Notes

- Backend is hosted on Render free tier — first request may take 30-60 seconds to wake up after inactivity. Subsequent requests are fast.
- Schema parser in `db/connection.js` extracts the SQLite block from the provided `schema.sql` using string markers. This works reliably with the starter file as provided.
- Serial number uniqueness is enforced at both API and DB level.
- All API errors return consistent JSON with appropriate HTTP status codes (400, 404, 409, 500).

---

> **⚠️ Checklist before submitting:**
>
> - [x] All links are working and publicly accessible
> - [x] Code is pushed to your forked repo
> - [x] Commit history shows progressive development

<!-- # 📋 Submission Details

> **Instructions:** Fill out every section below before submitting. Replace all placeholder text. Check boxes for features you implemented. Be honest — your self-assessment matters.

---

## 👤 Candidate Information

| Field | Your Details |
|-------|-------------|
| **Full Name** | |
| **Email** | |
| **Phone** | |
| **GitHub Username** | |
| **LinkedIn (optional)** | |
| **Current Location** | |

---

## 🔗 Repository & Deployment Links

| Link | URL |
|------|-----|
| **GitHub Repo** (forked) | `https://github.com/YOUR-USERNAME/cadmech-fullstack-assessment` |
| **Live Frontend** (GitHub Pages) | `https://YOUR-USERNAME.github.io/cadmech-fullstack-assessment` |
| **Live Backend** (Render/Railway) | `https://your-backend-url.onrender.com` |

---

## 🛠️ Tech Choices

| Choice | Your Answer |
|--------|------------|
| **Database Used** | MySQL / PostgreSQL / SQLite *(pick one)* |
| **ORM / Query Builder** | *(e.g., Sequelize, Knex, raw SQL)* |
| **Additional Frontend Libraries** | *(list all)* |
| **Additional Backend Libraries** | *(list all)* |
| **CSS Approach** | *(e.g., Vanilla CSS, CSS Modules, Tailwind)* |

---

## ✅ Features Implemented

- [ ] Dashboard with summary statistics
- [ ] Equipment list view (table/grid)
- [ ] Add new equipment with validation
- [ ] Edit existing equipment
- [ ] Delete equipment with confirmation dialog
- [ ] Search by name
- [ ] Filter by type and/or status
- [ ] Responsive design (desktop + mobile)
- [ ] REST API with proper error handling
- [ ] Database with schema
- [ ] Frontend deployed to GitHub Pages
- [ ] Backend deployed to Render/Railway

---

## 💬 Self Assessment

### What went well?

> *(2–3 sentences about what you're proud of)*

### What was the hardest part?

> *(2–3 sentences — be specific. What got you stuck? How did you push through?)*

### What would you do differently with more time?

> *(2–3 sentences about improvements, refactors, or features you'd add)*

### AI Tools Usage

> *(Which tools did you use? For what tasks? What did you learn vs. what did AI generate?)*

---

## ⏱️ Time Spent

| Area | Hours |
|------|-------|
| **Frontend UI/UX & Responsive Design** | |
| **Backend API Development & DB** | |
| **Deployment (FE + BE)** | |
| **Documentation & Cleanup** | |
| **Total** | |

---

## 📌 Additional Notes

> *(Known issues, design trade-offs, things you'd like the evaluator to know)*

---

> **⚠️ Checklist before submitting:**
> - [ ] All links are working and publicly accessible
> - [ ] Code is pushed to your forked repo
> - [ ] Commit history shows progressive development -->
