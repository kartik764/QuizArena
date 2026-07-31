import { useEffect, useState } from "react";
import socket from "../socket/socket";

interface useRoomSocketProps {
  roomCode: string;
  userId: string;
  username: string;
}

interface RoomUser {
  socketId: string;
  userId: string;
  username: string;
}

interface HostInfo {
  socketId: string;
  userId: string;
  username: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionResult {
  yourAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
}

interface QuestionPayload {
  question: Question;
  currentQuestionNumber: number;
  totalQuestions: number;
}

interface ChatMessage{
  userId : string;
  username : string;
  text : string;
}

export function useRoomSocket({
  roomCode,
  userId,
  username,
}: useRoomSocketProps) {
  const [roomUsers, setRoomUsers] = useState<RoomUser[] | null>(null);

  const [hostInfo, setHostInfo] = useState<HostInfo | null>(null);

  const [gameStarted, setGameStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const [scores, setScores] = useState<Record<string, number>>({});

  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const [questionResult, setQuestionResult] = useState<QuestionResult | null>(
    null,
  );

  const [gameOver, setGameOver] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  const [totalQuestions, setTotalQuestions] = useState(0);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // some emit events which need no useEffect as they are from frontend
  const startGame = () => {
    socket.emit("start_game", {
      roomId: roomCode,
    });
  };

  const submitAnswer = (answer: string) => {
    socket.emit("submit_answer", {
      roomId: roomCode,
      answer,
    });
  };

  const sendMessage = (text : string) => {
    socket.emit("send_message",{
      roomId : roomCode,
      text,
    });
  };

  // Join room when component mounts
  useEffect(() => {
    socket.emit("join_room", {
      roomId: roomCode,
      userId,
      username,
    });

    return () => {
      socket.emit("leave_room", {
        roomId: roomCode,
      });
    };
  }, [roomCode, userId, username]);

  // Listen for room users
  useEffect(() => {
    const handleRoomUsers = (users: RoomUser[]) => {
      console.log("Room Users :", users);
      setRoomUsers(users);
    };

    socket.on("room_users", handleRoomUsers);

    return () => {
      socket.off("room_users", handleRoomUsers);
    };
  }, []);

  // Listen for host changes
  useEffect(() => {
    const handleHostInfo = (host: HostInfo) => {
      console.log("Host :", host);
      setHostInfo(host);
    };

    socket.on("host_info", handleHostInfo);

    return () => {
      socket.off("host_info", handleHostInfo);
    };
  }, []);

  // Listen for game start
  useEffect(() => {
    const handleGameStarted = () => {
      console.log("Game Started!");
      setGameStarted(true);
    };

    socket.on("game_started", handleGameStarted);

    return () => {
      socket.off("game_started", handleGameStarted);
    };
  }, []);

  //Listen for question
  useEffect(() => {
    const handleCurrentQuestion = (data: QuestionPayload) => {
      setCurrentQuestion(data.question);
      setCurrentQuestionNumber(data.currentQuestionNumber);
      setTotalQuestions(data.totalQuestions);

      setAnswerSubmitted(false);
      setQuestionResult(null);
    };

    socket.on("current_question", handleCurrentQuestion);

    return () => {
      socket.off("current_question", handleCurrentQuestion);
    };
  }, []);

  useEffect(() => {
    const handleScoreUpdate = (scores: Record<string, number>) => {
      console.log("Scores: ", scores);
      setScores(scores);
    };

    socket.on("score_update", handleScoreUpdate);

    return () => {
      socket.off("score_update", handleScoreUpdate);
    };
  }, []);

  useEffect(() => {
    const handleAnswerSubmitted = () => {
      setAnswerSubmitted(true);
    };

    socket.on("answer_submitted", handleAnswerSubmitted);

    return () => {
      socket.off("answer_submitted", handleAnswerSubmitted);
    };
  }, []);

  useEffect(() => {
    const handleQuestionResult = (result: QuestionResult) => {
      setQuestionResult(result);
    };

    socket.on("question_result", handleQuestionResult);

    return () => {
      socket.off("question_result", handleQuestionResult);
    };
  }, []);

  useEffect(() => {
    const handleTimerUpdate = (time: number) => {
      setTimeLeft(time);
    };

    socket.on("timer_update", handleTimerUpdate);

    return () => {
      socket.off("timer_update", handleTimerUpdate);
    };
  }, []);

  useEffect(() => {
    const handleGameOver = () => {
      setGameOver(true);
    };

    socket.on("game_over", handleGameOver);

    return () => {
      socket.off("game_over", handleGameOver);
    };
  }, []);

  useEffect(()=> {
    const handleRoomMessage = (message : ChatMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        message,
      ]);
    };

    socket.on("room_message", handleRoomMessage);

    return () => {
      socket.off("room_message", handleRoomMessage);
    }
  },[]);

  return {
    roomUsers,
    hostInfo,
    gameStarted,
    currentQuestion,
    startGame,
    submitAnswer,
    scores,
    answerSubmitted,
    timeLeft,
    questionResult,
    gameOver,
    currentQuestionNumber,
    totalQuestions,
    messages,
    sendMessage,
  };
}
