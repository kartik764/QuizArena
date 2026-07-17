# 🎯 QuizArena

A real-time multiplayer quiz platform where users can create or join quiz rooms, compete with friends, and view live scores. Built using the MERN stack with Socket.IO for real-time communication.

---

## 🚀 Features

- 🔐 JWT Authentication (Register/Login)
- 🏠 Create and Join Quiz Rooms
- 👥 Public & Private Rooms
- ⚡ Real-Time Multiplayer Gameplay using Socket.IO
- 📊 Live Leaderboard
- 🎯 Dynamic Score Tracking
- 💬 In-Room Chat *(if implemented)*
- 📱 Fully Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- Socket.IO
- JWT Authentication
- Bcrypt

### Database
- MongoDB
- Mongoose

### Tools
- Git
- GitHub
- Postman
- VS Code

---

## 📂 Project Structure

```
QuizArena
│
├── Frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── Backend
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── controllers
│   ├── socket
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/QuizArena.git
```

```bash
cd QuizArena
```

---

### 2. Install Frontend Dependencies

```bash
cd Frontend
npm install
```

---

### 3. Install Backend Dependencies

```bash
cd ../Backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **Backend** directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Running the Application

### Start Backend

```bash
cd Backend
npm run dev
```

---

### Start Frontend

```bash
cd Frontend
npm run dev
```

The application will be available at:

```
Frontend : http://localhost:5173
Backend  : http://localhost:5000
```

---

## 📸 Screenshots

> Add screenshots here after deployment.

### Landing Page

<img src="screenshots/landing.png" width="800"/>

### Dashboard

<img src="screenshots/dashboard.png" width="800"/>

### Quiz Room

<img src="screenshots/room.png" width="800"/>

---

## 🔮 Future Enhancements

- AI-generated quiz questions
- Categories and difficulty levels
- Timer-based gameplay
- Spectator Mode
- Voice Chat
- Global Leaderboard
- User Profiles
- Achievements & Badges
- Match History
- Docker Deployment

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

## 📧 Contact

**Kartik Jain**

- GitHub: https://github.com/kartik764
- LinkedIn: https://linkedin.com/in/kartik-jain-a48b59358
- Email: kartikjainn2003@gmail.com

---

## ⭐ Show Your Support

If you found this project useful, consider giving it a ⭐ on GitHub.
