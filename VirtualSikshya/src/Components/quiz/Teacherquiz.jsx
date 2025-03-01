import React, { useState } from "react";
import "../../styles/quiz.css";

const TeacherQuizSystem = () => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      duration: 30, // Duration in minutes
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
        },
      ],
    },
  ]);
  
  const [newQuiz, setNewQuiz] = useState({ title: "", duration: 0, questions: [] });
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Add a new question
  const addQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [
        ...newQuiz.questions,
        { id: Date.now(), question: "", options: ["", "", "", ""], correctAnswer: 0 },
      ],
    });
  };

  // Update a question text
  const updateQuestion = (qIndex, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[qIndex].question = value;
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  // Update an option text
  const updateOption = (qIndex, optIndex, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  // Set correct answer
  const setCorrectAnswer = (qIndex, value) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  // Save new quiz
  const saveQuiz = () => {
    setQuizzes([...quizzes, { ...newQuiz, id: quizzes.length + 1 }]);
    setNewQuiz({ title: "", duration: 0, questions: [] });
    setShowCreateForm(false);
  };

  // Delete quiz
  const deleteQuiz = (id) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  // Edit existing quiz
  const editQuiz = (quiz) => {
    setNewQuiz(quiz);
    setShowCreateForm(true);
  };

  return (
    <div className="quiz-management">
      <h1>📚 Teacher Quiz Management</h1>

      {/* Create Quiz Button */}
      <button onClick={() => setShowCreateForm(!showCreateForm)} className="button primary-button">
        {showCreateForm ? "Cancel" : "➕ Create New Quiz"}
      </button>

      {/* Quiz Creation Form */}
      {showCreateForm && (
        <div className="create-quiz-form">
          <input
            type="text"
            placeholder="Quiz Title"
            value={newQuiz.title}
            onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Duration (Minutes)"
            value={newQuiz.duration}
            onChange={(e) => setNewQuiz({ ...newQuiz, duration: e.target.value })}
          />
          {newQuiz.questions.map((q, qIndex) => (
            <div key={q.id} className="question-section">
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) => updateQuestion(qIndex, e.target.value)}
              />
              {q.options.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                />
              ))}
              <select onChange={(e) => setCorrectAnswer(qIndex, Number(e.target.value))}>
                {q.options.map((_, optIndex) => (
                  <option key={optIndex} value={optIndex}>
                    Correct Answer: {optIndex + 1}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button onClick={addQuestion} className="button outline-button">
            ➕ Add Question
          </button>
          <button onClick={saveQuiz} className="button success-button">
            ✅ Save Quiz
          </button>
        </div>
      )}

      {/* Quiz List */}
      <div className="quiz-list">
        <h2>📝 Available Quizzes</h2>
        {quizzes.length === 0 ? (
          <p>No quizzes available. Create one!</p>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <h3>{quiz.title} ({quiz.duration} min)</h3>
              <button className="button edit-button" onClick={() => editQuiz(quiz)}>
                ✏️ Edit
              </button>
              <button className="button danger-button" onClick={() => deleteQuiz(quiz.id)}>
                ❌ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherQuizSystem;
