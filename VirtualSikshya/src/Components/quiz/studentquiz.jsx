import React, { useState, useEffect } from 'react';
import "../../styles/quiz.css";

const QuizSystem = ({ userRole = 'student' }) => {
  const [currentQuiz] = useState({
    id: 1,
    title: "JavaScript Fundamentals",
    duration: 30,
    questions: [
      {
        id: 1,
        question: "What is the output of typeof null?",
        options: ["undefined", "object", "null", "number"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Which method is used to add elements to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0,
      }
    ]
  });

  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(currentQuiz.duration * 60);
  const [result, setResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (!quizSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            submitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, quizSubmitted]);

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateResult = () => {
    let correct = 0;
    currentQuiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      totalQuestions: currentQuiz.questions.length,
      correctAnswers: correct,
      percentage: (correct / currentQuiz.questions.length) * 100
    };
  };

  const submitQuiz = () => {
    const quizResult = calculateResult();
    setResult(quizResult);
    setQuizSubmitted(true);
  };

  const ResultsDisplay = () => {
    if (!result) return null;

    return (
      <div className="results-container">
        <div className="grade-display">
          {result.percentage.toFixed(1)}%
        </div>
        <div className="stats-container">
          <div>
            <div style={{ color: '#059669', fontSize: '1.5rem' }}>✓</div>
            <div>Correct: {result.correctAnswers}</div>
          </div>
          <div>
            <div style={{ color: '#dc2626', fontSize: '1.5rem' }}>✗</div>
            <div>Incorrect: {result.totalQuestions - result.correctAnswers}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="flex-between">
            <h1 className="card-title">{currentQuiz.title}</h1>
            <div className="timer-display">
              <span>⏱</span>
              <span style={{ fontFamily: 'monospace', fontSize: '1.125rem', color: '#4f46e5' }}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
        <div className="card-content">
          {!quizSubmitted ? (
            <div>
              <div className="navigation">
                <button 
                  className="button outline-button"
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(prev - 1, 0))}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <span>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</span>
                <button 
                  className="button outline-button"
                  onClick={() => setCurrentQuestionIndex(prev => 
                    Math.min(prev + 1, currentQuiz.questions.length - 1))}
                  disabled={currentQuestionIndex === currentQuiz.questions.length - 1}
                >
                  Next
                </button>
              </div>

              <p className="question-text">
                <span style={{ color: '#4f46e5', marginRight: '0.5rem' }}>
                  {currentQuestionIndex + 1}.
                </span>
                {currentQuiz.questions[currentQuestionIndex].question}
              </p>

              {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${answers[currentQuiz.questions[currentQuestionIndex].id] === index ? 'selected-option' : ''}`}
                  onClick={() => handleAnswerSelect(currentQuiz.questions[currentQuestionIndex].id, index)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <ResultsDisplay />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSystem;
