import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import Navbar from "../components/ui/Navbar";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Quiz() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); 
  const [selectedOption, setSelectedOption] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const QUESTIONS_AMOUNT = import.meta.env.VITE_QUESTIONS_AMOUNT || 10;
  const QUESTIONS_TYPE = import.meta.env.VITE_QUESTIONS_TYPE || "multiple";


  useEffect(() => {
    const saved = localStorage.getItem("currentQuiz");
    if (saved) {
      const quizData = JSON.parse(saved);
      if (quizData.categoryId === parseInt(id)) {
        setQuestions(quizData.questions);
        setCurrentIndex(quizData.currentIndex);
        setAnswers(quizData.answers);
        setTimeLeft(quizData.timeLeft);
        setSelectedOption(quizData.answers[quizData.currentIndex]?.answer || null);
        return;
      }
    }

    axios.get(`${API_BASE_URL}/api.php`, {
      params: { amount: QUESTIONS_AMOUNT, category: id, type: QUESTIONS_TYPE }
    })
    .then(res => {
      const formatted = res.data.results.map(q => ({
        ...q,
        options: shuffle([...q.incorrect_answers, q.correct_answer])
      }));
      setQuestions(formatted);
    });
  }, [id, API_BASE_URL, QUESTIONS_AMOUNT, QUESTIONS_TYPE]);

  useEffect(() => {
    if (timeLeft <= 0) return handleFinish();
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (!questions.length) return;
    localStorage.setItem("currentQuiz", JSON.stringify({
      categoryId: parseInt(id),
      questions,
      currentIndex,
      answers,
      timeLeft
    }));
  }, [currentIndex, answers, timeLeft, questions, id]);

  const handleNext = () => {
    const currentQ = questions[currentIndex];
    if (selectedOption) {
      setAnswers(prev => [
        ...prev.filter(a => a.question !== currentQ.question),
        { question: currentQ.question, correct: currentQ.correct_answer, answer: selectedOption }
      ]);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(answers.find(a => a.question === questions[currentIndex + 1].question)?.answer || null);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(prev => prev - 1);
    const prevAnswer = answers.find(a => a.question === questions[currentIndex - 1].question);
    setSelectedOption(prevAnswer?.answer || null);
  };

  const handleFinish = () => {
    localStorage.removeItem("currentQuiz"); 
    localStorage.setItem("lastQuiz", JSON.stringify(answers)); 
    navigate("/dashboard", { state: { results: answers } });
  };

  if (!questions.length) return <p className="p-6">Loading questions...</p>;

  const currentQ = questions[currentIndex];

  return (
    <div>
      <Navbar />
      <div className="p-6 pt-28 max-w-2xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold" dangerouslySetInnerHTML={{ __html: currentQ.question }} />
          <span className="font-mono bg-gray-100 px-3 py-1 rounded">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2,'0')}
          </span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded mb-4">
          <div className="bg-blue-500 h-2 rounded" style={{ width: `${((currentIndex+1)/questions.length)*100}%` }} />
        </div>

        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={currentQ.question}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4"
          >
            {currentQ.options.map((opt, idx) => (
              <Button
                key={idx}
                onClick={() => setSelectedOption(opt)}
                className={`text-left ${selectedOption === opt ? "bg-blue-500 text-white" : ""}`}
                dangerouslySetInnerHTML={{ __html: opt }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button onClick={handlePrev} disabled={currentIndex === 0} variant="outline">Prev</Button>
          <Button onClick={handleNext} disabled={!selectedOption}>{currentIndex + 1 === questions.length ? "Finish" : "Next"}</Button>
        </div>

        <p className="mt-4 text-center text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
