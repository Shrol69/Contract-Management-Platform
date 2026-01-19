# Contract Management Platform

A robust frontend application for managing the lifecycle of digital contracts, built with Next.js and TypeScript.

## 🚀 Setup Instructions
1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000

## 🛠 Tech Stack & Decisions
- **Next.js (App Router):** Chosen for modern architecture and server-side capabilities.
- **Zustand:** Selected for state management. It provides a global store without the boilerplate of Redux, perfect for handling the `blueprints` and `contracts` arrays.
- **Tailwind CSS + shadcn/ui:** Used to ensure a clean, accessible, and professional UI without writing custom CSS from scratch.

## 🏗 Architecture
- **Store (`/store`):** Holds the application state. It includes logic to prevent illegal state transitions (e.g., you cannot edit a LOCKED contract).
- **Types (`/types`):** Strict TypeScript definitions ensure data consistency across the app.

## ✅ Assumptions
- I assumed that once a contract is 'Sent', the text content cannot be edited, only signed.
- Data is persisted in memory (refreshing clears data) as per the "mocked persistence" requirement.