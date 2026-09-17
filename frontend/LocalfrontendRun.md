# Frontend Setup Guide (Vite + TypeScript)

This guide will walk you through setting up and running the **React + TypeScript** frontend application on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (comes bundled with Node) or **yarn** / **pnpm**

## 🚀 Getting Started

Follow these step-by-step instructions to get the development server running.

### 1. Navigate to the Frontend Directory/ do it in your terminal
If the React application is inside a subfolder (e.g., `frontend` or `client`), navigate into it from the root of the repository:
```bash
cd frontend
```
*(Skip this step if the Vite app is at the root of the repository).*

### 2. Install Dependencies , Do it in your terminal
Install all the required packages, types, and libraries specified in the `package.json` file:
```bash
npm install

``


### 3. Set Up Environment Variables (Optional)
Vite requires environment variables to be prefixed with `VITE_`. If your project connects to an API, look for a `.env.example` file, duplicate it, and name it `.env`:
```bash
cp .env.example .env
```
Open the `.env` file and add your configurations (e.g., `VITE_API_URL=http://localhost:5000`).

### 4. Run the Development Server
Start the Vite local development server:
```bash
npm run dev

```

Once started, the application will be accessible at the URL shown in your terminal, typically:
👉 **[http://localhost:5173](http://localhost:5173)**

## 🛠️ Available Scripts

In the project directory, you can run the following commands:

* **`npm run dev`**: Starts the Vite development server with lightning-fast Hot Module Replacement (HMR).
* **`npm run build`**: Runs the TypeScript compiler (`tsc`) to check for type errors and builds the optimized production assets into the `dist/` folder.
* **`npm run preview`**: Locally previews the production build created by the build command.
* **`npm run lint`**: Runs ESLint to check the code for styling and syntax issues.
