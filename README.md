# 🧠 Mynoto — Quick Idea Notes App

**Mynoto** is a minimalist web application that helps you quickly jot down and manage your ideas. Built with Motoko on the Internet Computer backend and React for the frontend, it supports creating, editing, and deleting notes with ease.

> “The faintest ink is better than the best memory.” – Chinese Proverb

## ✨ Features

- Add and edit notes with titles and content
- Automatically saves timestamps
- Simple, clean, and responsive UI
- Powered by Motoko backend on the Internet Computer

## 🚀 Getting Started

### Prerequisites

- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) (for local development)
- Node.js (for frontend development)

### Clone the repository

```
git clone https://github.com/duminufarlis/Mynoto-ICP.git
cd mynoto
```

### Start in local environment
```
npm install
dfx start --background
dfx deploy
```
Then open the app at http://localhost:5173

## 📁 Project Structure
```
mynoto/
├── backend/
│   └── app.mo
├── frontend/
│   ├── app.jsx
│   ├── main.jsx
│   ├── index.html
│   └── style.css
└── README.md
```

## 🛠 Technologies Used

- **Motoko** – Programming language for the Internet Computer
- **React + Vite** – Fast and modern frontend framework
- **IC Canisters** – Deployed smart contracts for persistent storage

## 📄 License

MIT License. Feel free to use modify, and build upon this project.
