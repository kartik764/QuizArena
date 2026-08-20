# 🎯 QuizArena

> Real-time multiplayer quiz platform where users can create or join quiz rooms, compete with friends, answer questions in real time, and climb the leaderboard.

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-black?style=for-the-badge&logo=socket.io)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)

[🚀 Live Demo](https://quiz-arena-z116fpbms-kartik-jain-s-projects.vercel.app/)

## 🚀 Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes

### 🏠 Quiz Rooms
- Create and join quiz rooms
- Public and private rooms
- Share rooms using a unique Room Code
- Configurable player limits
- Configurable question count
- Multiple quiz categories
- Multiple difficulty levels

### ⚡ Real-Time Multiplayer
- Socket.IO-based real-time communication
- Real-time player updates
- Real-time question delivery
- Synchronized quiz gameplay
- Real-time score updates
- Player join and leave events
- Disconnect handling

### 🎯 Quiz Gameplay
- Timed quiz questions
- Automatic question progression
- Multiple-choice questions
- Score calculation based on correct answers
- Real-time game state synchronization
- Automatic game completion

### 💬 Real-Time Chat
- In-room multiplayer chat
- Real-time message delivery
- Player-specific chat messages

### 🏆 Leaderboard
- Live leaderboard
- Player score tracking
- Global leaderboard
- Game statistics

### 👤 User Profiles
- User profile information
- Total score tracking
- Games played statistics
- Personal performance overview

## 🏗️ Architecture

QuizArena follows a full-stack architecture where REST APIs handle persistent application data and Socket.IO handles real-time multiplayer communication.

```text
                         ┌─────────────────────┐
                         │   React + TypeScript │
                         │       Frontend      │
                         └──────────┬──────────┘
                                    │
                       ┌────────────┴────────────┐
                       │                         │
                    REST API                 Socket.IO
                       │                         │
                       ▼                         ▼
                ┌──────────────────────────────────┐
                │        Node.js + Express         │
                │                                  │
                │  Authentication                  │
                │  Room Management                 │
                │  Quiz Management                 │
                │  Leaderboard                     │
                │  Socket.IO Server                │
                └──────────────┬───────────────────┘
                               │
                               ▼
                       ┌────────────┐
                       │  MongoDB   │
                       │   Atlas    │
                       └────────────┘
```

## ⚡ Real-Time Architecture

QuizArena uses **Socket.IO** to synchronize quiz state between players connected to the same room.

The server acts as the central authority for the game. When a player joins, answers a question, sends a message, or when the timer changes the game state, Socket.IO broadcasts the required updates to other players.

```text
Player 1
   │
   │ Join / Answer / Chat
   ▼
Socket.IO Server
   │
   ├──────────────► Player 2
   │
   ├──────────────► Player 3
   │
   └──────────────► Player 4

```

## 🧠 Engineering Challenges & Solutions

### ⚡ Real-Time Multiplayer Synchronization

**Challenge:**  
Multiple players inside the same room need to receive the same game state and updates in real time.

**Solution:**  
Socket.IO is used to maintain real-time communication between the client and server. Room-based communication synchronizes player joins, questions, answers, scores, and chat messages.

### ⏱️ Timed Quiz Management

**Challenge:**  
Every player needs to follow the same question timer and quiz progression.

**Solution:**  
The server controls the quiz timer and question progression, ensuring that all connected players receive synchronized game-state updates.

### 👥 Real-Time Player Management

**Challenge:**  
Players can join, leave, refresh the page, or disconnect unexpectedly.

**Solution:**  
Socket.IO connection and disconnection events are used to maintain the active player list and keep room state synchronized.

### 🏆 Real-Time Score Tracking

**Challenge:**  
Players need to see score changes immediately after answering questions.

**Solution:**  
The server calculates scores and broadcasts updated player scores to everyone in the room.

### 🔐 Secure Authentication

**Challenge:**  
Protected routes and user-specific data require secure authentication.

**Solution:**  
JWT is used for authentication, while bcrypt is used to hash passwords before storing them in MongoDB.

### 🤖 Dynamic Question Generation

**Challenge:**  
Maintaining a large static question bank for different categories and difficulty levels can become difficult to manage.

**Solution:**  
QuizArena uses the Gemini API to dynamically generate quiz questions based on the selected category, difficulty, and question count.

## 🌍 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

### Live Application

**Frontend:** https://quiz-arena-z116fpbms-kartik-jain-s-projects.vercel.app/

**Backend:** https://kartik-qz-847291-api.onrender.com/

## 🔮 Future Improvements

- 🎮 More quiz game modes
- 👥 Team-based multiplayer quizzes
- 🥇 Advanced ranking and matchmaking
- 📊 Detailed player performance analytics
- 🏅 Achievements and badges
- 🔔 In-app notifications
- 📱 Improved mobile experience
- 🛡️ Better moderation and room controls
- 📈 Improved monitoring and error handling

- ## 👨‍💻 Author

**Kartik Jain**

[GitHub](https://github.com/kartik764) • [LinkedIn](https://www.linkedin.com/in/kartik-jain-a48b59358/)