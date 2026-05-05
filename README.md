#  Elevate - PostStyle Application

**Live Demo:** [ لينك الـ Vercel هنا]

A professional, high-performance ReactJS application built as part of the **Elevate Frontend Advanced Bootcamp**. This project implements a real-world social feed experience with a focus on pixel-perfect UI, clean architecture, and robust form management.

## Project Overview
This application serves as a dynamic post management dashboard where users can browse, view, and create posts. It integrates with the **JSONPlaceholder API** for data fetching and implements local persistence using `LocalStorage` to ensure a seamless user experience even after page refreshes.

## Tech Stack
* **Core:** React 18+ (Vite)
* **Styling:** Tailwind CSS (Pixel-perfect implementation)
* **Navigation:** React Router DOM
* **Form Management:** React Hook Form
* **Validation:** Zod Schema Validation
* **Icons:** Lucide React
* **API Client:** Axios

## Key Features
* **Pixel-Perfect Implementation:** Strictly followed the provided Figma design for every screen and state.
* **Persistent Data:** Integrated `LocalStorage` to maintain new posts across sessions.
* **Advanced Validation:** Real-time form validation with descriptive error messages using React Hook Form and Zod.
* **Loading & Error States:** Graceful handling of API fetch states, including customized loaders and server error feedback.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
* **Toast Notifications:** Instant feedback for user actions like publishing or errors.

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/CodeHanaa/Elevate-PostStyle-Application.git]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the project locally:**
    ```bash
    npm run dev
    ```

## Project Structure
```text
src/
├── components/     # Reusable UI components (Header, PostCard, etc.)
├── Pages/          # Main application pages (Home, CreatePost, PostDetails)
├── services/       # API services (getUsers, getPosts)
├── Types/          # TypeScript interfaces and post types
├── App.tsx         # Root component with Routing and State logic
└── main.tsx        # Entry point
