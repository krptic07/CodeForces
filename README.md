# Codeforces Game

## 📌 Introduction

This is a turn-based multiplayer game inspired by **Codenames**, built using **React.js, Socket.io, and Tailwind CSS**. The game follows the original Codenames rules, where players are divided into two teams, each with a captain. A minimum of **4 players** is required to start a game.

## 🎮 Game Rules

1. Players are divided into **two teams (Red & Blue)**.
2. Each team has **one Spymaster** who gives one-word clues.
3. The rest of the team (Operatives) guesses words based on the clues.
4. The goal is to uncover all of your team's words before the opposing team.
5. A neutral card ends the turn, while the assassin card results in an instant loss.
6. Turns alternate between teams, and the game ends when all words of a team are revealed or the assassin is picked.

## ✨ Features

- **Real-time multiplayer gameplay** using **Socket.io**.
- **Interactive board with flipping cards**.
- **Dynamic turn indicators**.
- **Spymaster mode with hidden images**.
- **Smooth animations and 3D effects**.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, CSS animations
- **Backend**: Node.js, Express, Socket.io

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

git clone https://github.com/krptic07/CodeForces.git
cd CodeForces

### 2️⃣ Install dependencies

- **Enter directory codeforces-backend and do npm install**
- **Enter directory codeforces-frontend and do npm install**

### 3️⃣ Setup environment variables

You need to configure the `.env` file inside the `codeforces-frontend` directory before running the project. Create a `.env` file and add:

REACT_APP_UPSHOTS_API_KEY=your_api_key_here

🔹 Make sure this file is **ignored** by Git (already added in `.gitignore`).

### 4️⃣ Start the development server

- **Enter directory codeforces-backend and do npm run start**
- **Enter directory codeforces-frontend and do npm run start**

## 💡 Contributing

Feel free to submit issues, feature requests, or pull requests. Let's build this together! 🚀
