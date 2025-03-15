Overview

This project is a simplified Admin Dashboard for managing investment portfolios. It provides an intuitive interface for tracking total investments, average ROI, and ROI trends over time. The dashboard is built with modern front-end technologies to ensure high performance, scalability, and a smooth user experience.

Features

📊 Investment Table – Displays a list of investments with key details.

📈 ROI Trend Line Chart – Shows the performance of investments over time.

🌍 Internationalization (i18n) – Supports both English (LTR) and Arabic (RTL).

🎨 Responsive UI – Built with Tailwind CSS and ShadCN UI components.

🔄 State Management – Powered by Redux Toolkit for efficient data handling.

⚡ Form Handling & Validation – Uses React Hook Form + Yup for seamless form submissions.

🔍 Server-Side Data Fetching – Investment data is fetched and managed using RTK Query.

Tech Stack

The project is built with the following technologies:

Technology

Purpose

React 19 + Vite

Frontend framework for building the UI

TypeScript

Strongly typed JavaScript for better reliability

Redux Toolkit + RTK Query

State management and data fetching

Tailwind CSS + ShadCN

Styling and UI components

React Hook Form + Yup

Form validation and handling

Recharts

Data visualization for ROI trends

i18next

Internationalization (i18n) support

Folder Structure

src/
├── components/       # UI components & reusable elements
│   ├── ui/          # ShadCN UI components
│   ├── ...
├── lib/             # Utility functions & TypeScript types
│   ├── types.ts
│   ├── utils.ts
├── pages/           # Page components (Dashboard, Investment Table)
│   ├── dashboard.tsx
│   ├── investmenttable.tsx
├── redux/           # State management
│   ├── store.ts
│   ├── slices/      # API & feature slices
│       ├── investmentApi.ts

Installation & Setup

Follow these steps to run the project locally:

Clone the repository:

git clone <your-repo-url>
cd <project-folder>

Install dependencies:

npm install

Run the development server:

npm run dev

Visit the app: Open http://localhost:5173 in your browser.

MockAPI.io Note

This project uses MockAPI.io for backend data storage. Please note:

When adding a new investment, MockAPI.io replaces the existing data instead of preserving all previous entries.

File uploads are not supported by MockAPI.io. While the file upload functionality is implemented in the code, it has been made optional to ensure smooth usage.

GitHub Repository: https://github.com/Phaxe/vite-practice