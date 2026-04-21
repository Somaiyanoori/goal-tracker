# GoalTracker Dashboard

**GoalTracker** is a modern, responsive, and multilingual web application built with React and Material-UI. It's designed to help users create, track, and manage their personal and professional goals in a clean, gamified, and intuitive interface.

This project was built as a comprehensive assignment for a React class, demonstrating a wide range of modern front-end development skills and best practices.

## Live Demo

https://goal-tracker-six-neon.vercel.app

## 📸 Screenshots

### Desktop View

![alt text](../goal-tracker/src/assets/image-3.png)

### RTL Layout (Persian)

![alt text](../goal-tracker/src/assets/image-4.png)

### Mobile View

![alt text](../goal-tracker/src/assets/image-2.png)

## Features Checklist

- **Full CRUD for Goals:** Create, Read, Update, and Delete goals with a clean and validated form.
- **Multi-Page Routing:** A seamless multi-page experience using React Router.
- **Responsive Design:** A beautiful and functional UI that works on both desktop and mobile devices.
- **Dual Language Support:** Full internationalization (i18n) for **English (EN)** and **Persian (FA)**.
- **RTL/LTR Layout Switching:** The entire application layout automatically flips from Left-to-Right (LTR) for English to Right-to-Left (RTL) for Persian.
- **Advanced Progress Tracking:** Track goals by daily check-ins, counts, or time. Progress is visualized with dynamic progress bars.
- **Gamification System:**
  - **XP Points:** Earn XP for logging progress and completing goals.
  - **Streak Counter:** Build a daily streak by logging progress on consecutive days.
- **Persistent Data:** All user goals and stats are saved locally in the browser's LocalStorage, so your data is preserved across sessions.
- **Light & Dark Themes:** Easily toggle between a light and dark mode for comfortable viewing in any environment.
- **Categorization and Filtering:**
  - Assign categories to goals (Health, Study, Work, etc.).
  - View category-specific statistics.
  - Filter goals by status (All, Active, Paused, Completed).
  - Sort goals by creation date or progress.
  - Search goals by title.
- **Modern & Polished UI:** Built with the latest version of Material-UI, following modern design principles with smooth animations and a focus on user experience.

## Tech Stack

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **UI Library:** [Material-UI (MUI)](https://mui.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Schema Validation:** [Yup](https://github.com/jquense/yup)
- **Internationalization (i18n):** [react-i18next](https://react.i18next.com/)
- **Styling:** [Emotion](https://emotion.sh/) & `stylis-plugin-rtl` for RTL support.
- **Utilities:** [date-fns](https://date-fns.org/) for date management, [uuid](https://www.npmjs.com/package/uuid) for unique ID generation.

## How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Somaiyanoori/goal-tracker
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd goal-tracker
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Start the development server:**
    ```sh
    npm run dev
    ```
5.  Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal).

## Language & RTL/LTR Implementation

This application fully supports two languages: English (LTR) and Persian (RTL). This was a core requirement and was implemented using the following tools and techniques:

1.  **`react-i18next`:** This library handles the translation of all text strings in the UI. Language files (`en.json`, `fa.json`) are stored in the `src/locales` directory.
2.  **`@emotion/react` & `stylis-plugin-rtl`:** The key to a flawless RTL layout.
    - We use Emotion's `<CacheProvider>` to dynamically switch the CSS rendering engine based on the selected language.
    - When the language is Persian (`fa`), we provide a cache configured with `stylis-plugin-rtl`. This plugin automatically mirrors all CSS properties (e.g., `padding-left` becomes `padding-right`, `flex-direction: row` behaves correctly, etc.).
    - This ensures the UI is not just translated, but the entire layout structure is correctly adapted for a right-to-left reading direction.
3.  **Dynamic `dir` Attribute:** The `dir="rtl"` or `dir="ltr"` attribute on the `<html>` tag is updated automatically when the language is changed, ensuring global browser and component styles respect the current direction.

## Streak & XP Rules

The gamification system is designed to encourage consistent user engagement.

### Streak System

- A **streak** represents the number of consecutive days a user has logged progress on **any** goal.
- The streak increases by 1 if you log progress on a day after your last active day (e.g., log on Monday, then log on Tuesday).
- Logging progress multiple times on the same day does **not** increase the streak.
- If you miss a day (e.g., log on Monday, then log on Wednesday), the streak resets to **1**.

### XP (Experience Points) System

- **Logging Progress:** You earn **+10 XP** each time you log progress on an active goal.
- **Completing a Goal:** When a goal's progress reaches its target (or is marked as complete manually), you receive a **+50 XP** completion bonus.
- Your total XP is displayed on the Dashboard and in the sidebar.

## Team Contributions

This project was a collaborative effort between two developers. We practiced paired programming, code reviews, and distributed feature ownership to build the application.

- **Somaiya Noori** ([Somaiyanoori](https://github.com/Somaiyanoori))
- **Tamana Fazel** ([fazeltamana](https://github.com/fazeltamana))

### Git Commit Evidence

Both team members contributed actively to the project's codebase. The commit history reflects our individual contributions and collaborative efforts throughout the development process.

- **[View Commit History](https://github.com/Somaiyanoori/goal-tracker/commits/main)**
- **[View Contributors Page](https://github.com/Somaiyanoori/goal-tracker/graphs/contributors)**

## License

Distributed under the MIT License. See `LICENSE` for more information.
