import Room from "../models/Room.js";

const rooms = {};

function sendNextQuestion(io, roomId) {
  const room = rooms[roomId];
  if (!room) return;

  room.game.currentQuestionIndex++;

  if (room.game.currentQuestionIndex >= room.game.questions.length) {
    io.to(roomId).emit("game_over");
    return;
  }

  //Prepare state for the new question
  room.game.submittedUsers.clear();
  room.game.answers = {};
  room.game.questionEnded = false;

  const nextQuestion = room.game.questions[room.game.currentQuestionIndex];

  io.to(roomId).emit("current_question", {
    question: nextQuestion,
    currentQuestionNumber: room.game.currentQuestionIndex + 1,
    totalQuestions: room.game.questions.length,
  });

  startQuestionTimer(io, roomId);
}

function startQuestionTimer(io, roomId) {
  const room = rooms[roomId];
  if (!room) return;

  let timeLeft = 15;

  io.to(roomId).emit("timer_update", timeLeft);

  room.game.timer = setInterval(() => {
    timeLeft--;

    io.to(roomId).emit("timer_update", timeLeft);

    if (timeLeft <= 0) {
      clearInterval(room.game.timer);
      room.game.timer = null;

      console.log(`Time up in room ${roomId}`);

      endQuestion(io, roomId);
    }
  }, 1000);
}

function endQuestion(io, roomId) {
  const room = rooms[roomId];
  if (!room) return;

  //Prevent the same question from ending twice
  if (room.game.questionEnded) {
    return;
  }

  // Question is now closed
  room.game.questionEnded = true;

  // Stop the current question timer
  if (room.game.timer) {
    clearInterval(room.game.timer);
    room.game.timer = null;
  }

  // Get the current question
  const currentQuestion = room.game.questions[room.game.currentQuestionIndex];

  // Process every player's result
  room.users.forEach((user) => {
    const userAnswer = room.game.answers[user.userId];

    const isCorrect = userAnswer === currentQuestion.correctAnswer;

    const pointsEarned = isCorrect ? 10 : 0;

    // Initialize score if user doesn't have one yet
    room.game.scores[user.userId] = room.game.scores[user.userId] || 0;

    // Update score
    room.game.scores[user.userId] += pointsEarned;

    // Send personalized result to this player
    io.to(user.socketId).emit("question_result", {
      yourAnswer: userAnswer || null,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      pointsEarned,
    });
  });

  io.to(roomId).emit("score_update", room.game.scores);

  setTimeout(() => {
    sendNextQuestion(io, roomId);
  }, 3000);
}

export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("join_room", ({ roomId, userId, username }) => {
      socket.roomId = roomId;
      socket.userId = userId;
      socket.username = username;

      socket.join(roomId);

      if (!rooms[roomId]) {
        rooms[roomId] = {
          users: [],
          host: {
            socketId: socket.id,
            userId,
            username,
          },
          game: {
            started: false,
            questions: [],
            currentQuestionIndex: 0,
            timer: null,
            scores: {},
            submittedUsers: new Set(),
            answers: {},
            questionEnded: false,
          },
        };
      }

      const existingUser = rooms[roomId].users.find(
        (user) => user.userId === socket.userId,
      );

      if (!existingUser) {
        rooms[roomId].users.push({
          socketId: socket.id,
          userId,
          username,
        });
      }

      io.to(roomId).emit("room_users", rooms[roomId].users);

      io.to(roomId).emit("host_info", rooms[roomId].host);
    });

    socket.on("disconnect", () => {
      const roomId = socket.roomId;

      const room = rooms[roomId];

      if (!room) return;

      room.users = room.users.filter((u) => u.userId !== socket.userId);

      if (room.users.length === 0) {
        delete rooms[roomId];
        return;
      }

      if (room.host.userId === socket.userId) {
        room.host = room.users[0];

        io.to(roomId).emit("host_info", room.host);
      }

      io.to(roomId).emit("room_users", room.users);
    });

    socket.on("leave_room", ({ roomId }) => {
      const room = rooms[roomId];

      if (!room) return;

      room.users = room.users.filter((u) => u.socketId !== socket.id);

      socket.leave(roomId);

      if (room.users.length === 0) {
        delete rooms[roomId];
        return;
      }

      if (room.host.socketId === socket.id) {
        room.host = room.users[0];

        io.to(roomId).emit("host_info", room.host);
      }

      io.to(roomId).emit("room_users", room.users);
    });

    socket.on("start_game", ({ roomId }) => {
      const room = rooms[roomId];

      if (!room) return;

      if (room.host.socketId !== socket.id) return;

      if (room.game.started) return;

      room.game.started = true;

      const questions = [
        {
          id: 1,
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Jupiter", "Venus"],
          correctAnswer: "Mars",
        },
        {
          id: 2,
          question: "Which is not the name of Lord Vishnu?",
          options: ["Ram", "Krishna", "Vaman", "Mahakaal"],
          correctAnswer: "Mahakaal",
        },
        {
          id: 3,
          question: "Which place is not part of CharDham?",
          options: ["Kedarnath", "Gangotri", "Haridwar", "Badrinath"],
          correctAnswer: "Haridwar",
        },
      ];

      room.game.questions = questions;
      room.game.currentQuestionIndex = 0;

      io.to(roomId).emit("game_started");

      io.to(roomId).emit("current_question", {
        question : room.game.questions[0],
        currentQuestionNumber : 1,
        totalQuestions : room.game.questions.length,
      });

      startQuestionTimer(io, roomId);

      console.log(`Game started in room ${roomId}`);
    });

    socket.on("submit_answer", ({ roomId, answer }) => {
      const room = rooms[roomId];

      if (!room) return;

      //prevent duplicate submission
      if (room.game.submittedUsers.has(socket.userId)) {
        return;
      }

      // add users who submit the answers
      room.game.submittedUsers.add(socket.userId);

      // store the answers of users in "answers"
      room.game.answers[socket.userId] = answer;

      // Answer accepted and locked
      socket.emit("answer_submitted");

      // ONLY AFTER processing the answer,
      // check whether everyone has submitted
      if (room.game.submittedUsers.size === room.users.length) {
        endQuestion(io, roomId);
      }
    });

    socket.on("send_message", ({roomId, text}) => {
      const room = rooms[roomId];
      if(!room) return;

      const message = {
        userId : socket.userId,
        username : socket.username,
        text,
      };

      io.to(roomId).emit("room_message", message);
    })
  });
};
