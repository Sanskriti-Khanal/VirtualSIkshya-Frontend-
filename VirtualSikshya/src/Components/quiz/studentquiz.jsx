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

  const getGradeColor = (percentage) => {
    if (percentage >= 80) return '#059669';
    if (percentage >= 60) return '#d97706';
    return '#dc2626';
  };

  return (
    <div className="container">
      {userRole !== 'student' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Quiz Management</h2>
          </div>
          <div className="card-content">
            <div className="management-buttons">
              {['Edit Quiz', 'View Results', 'Create New Quiz'].map((action) => (
                <button key={action} className="button outline-button">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header flex-between">
          <h1 className="card-title">{currentQuiz.title}</h1>
          <div className="timer-display">
            ⏱ <span className="timer">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
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
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(prev + 1, currentQuiz.questions.length - 1))}
                  disabled={currentQuestionIndex === currentQuiz.questions.length - 1}
                >
                  Next
                </button>
              </div>

              <div>
                <p className="question-text">
                  <span className="question-number">{currentQuestionIndex + 1}.</span>
                  {currentQuiz.questions[currentQuestionIndex].question}
                </p>
                <div>
                  {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-button ${answers[currentQuiz.questions[currentQuestionIndex].id] === index ? 'selected-option' : ''}`}
                      onClick={() => handleAnswerSelect(currentQuiz.questions[currentQuestionIndex].id, index)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}.</span> {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="results-container">
              <div className="grade-display" style={{ color: getGradeColor(result.percentage) }}>
                {result.percentage.toFixed(1)}%
              </div>
              <div className="stats-container">
                <div>
                  <div className="correct">✓</div>
                  <div>Correct: {result.correctAnswers}</div>
                </div>
                <div>
                  <div className="incorrect">✗</div>
                  <div>Incorrect: {result.totalQuestions - result.correctAnswers}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!quizSubmitted && (
        <button className="button primary-button" onClick={submitQuiz}>
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default QuizSystem;
