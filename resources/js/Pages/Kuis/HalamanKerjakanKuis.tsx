"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HalamanKerjakanKuis = ({ uuid }: { uuid: string }) => {
  const [quiz, setQuiz] = useState<any>(null);
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(0);

  // 🚀 FETCH DATA
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // cek localStorage dulu
        const cached = localStorage.getItem(`quiz_${uuid}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          setQuiz(parsed.quiz);
          setAttempt(parsed.attempt);
          initTimer(parsed.quiz, parsed.attempt);
          setLoading(false);
        }

        // fetch fresh data
        const res = await fetch(`${BASE_URL}/api/quiz/${uuid}/start`, {
          credentials: "include",
        });

        if (res.status === 401) {
          window.location.href = "/masuk";
          return;
        }

        const data = await res.json();

        if (data.success) {
          setQuiz(data.data.quiz);
          setAttempt(data.data.attempt);

          initTimer(data.data.quiz, data.data.attempt);

          // simpan cache
          localStorage.setItem(`quiz_${uuid}`, JSON.stringify(data.data));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [uuid]);

  // ⏱️ INIT TIMER
  const initTimer = (quizData: any, attemptData: any) => {
    const startedAt = new Date(attemptData.started_at).getTime();
    const durationMs = quizData.duration_minutes * 60 * 1000;
    const nowMs = new Date().getTime();

    const remaining = Math.max(
      Math.floor((startedAt + durationMs - nowMs) / 1000),
      0
    );

    setTimeLeft(remaining);
  };

  // ⏱️ COUNTDOWN
  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🧠 PREFILL
  useEffect(() => {
    if (!quiz) return;

    const prefill: any = {};
    quiz.questions.forEach((q: any) => {
      q.answers.forEach((a: any) => {
        if (a.selected) prefill[q.id] = a.selected;
      });
    });

    setAnswers(prefill);
  }, [quiz]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!quiz) return <div>Quiz tidak ditemukan</div>;

  const currentQuestion = quiz.questions[currentIndex];

  // HANDLE ANSWER
  const handleAnswer = (questionId: number, answerId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  // SUBMIT
  const handleSubmit = async (auto = false) => {
    const unanswered = quiz.questions.length - Object.keys(answers).length;

    if (!auto && unanswered > 0) {
      if (!confirm(`Masih ada ${unanswered} soal belum dijawab. Kirim?`)) return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/quiz/${uuid}/submit`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();

      if (data.success) {
        // hapus cache
        localStorage.removeItem(`quiz_${uuid}`);

        window.location.href = `/kuis/${uuid}/hasil/${data.data.attempt_uuid}`;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ⏱️ FORMAT
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const progressPercent = Math.round(
    (Object.keys(answers).length / quiz.questions.length) * 100
  );

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-xl font-bold">{quiz.title}</h1>

      <div className="flex items-center gap-2 mt-2">
        <Clock />
        <span>{formatTime(timeLeft)}</span>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-gray-300 mt-4 rounded">
        <div
          className="h-2 bg-blue-500 rounded"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Soal */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2>
              Soal {currentIndex + 1} / {quiz.questions.length}
            </h2>

            <p className="my-4">{currentQuestion.question_text}</p>

            {currentQuestion.answers.map((a: any) => (
              <label key={a.id} className="block mb-2">
                <input
                  type="radio"
                  checked={answers[currentQuestion.id] === a.id}
                  onChange={() => handleAnswer(currentQuestion.id, a.id)}
                />
                {a.answer_text}
              </label>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NAV */}
      <div className="flex justify-between mt-6">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          Prev
        </button>

        {currentIndex === quiz.questions.length - 1 ? (
          <button onClick={() => handleSubmit()}>Submit</button>
        ) : (
          <button onClick={() => setCurrentIndex((i) => i + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default HalamanKerjakanKuis;
