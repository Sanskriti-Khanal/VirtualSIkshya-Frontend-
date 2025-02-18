import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, CheckCircle, XCircle, AlertCircle, ChevronRight, Timer, Star } from 'lucide-react';

const sampleQuiz = {
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
};

const QuizSystem = ({ userRole = 'student' }) => {
  const [currentQuiz, setCurrentQuiz] = useState(sampleQuiz);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(currentQuiz.duration * 60);
  const [result, setResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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
    setIsAnimating(true);
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    setTimeout(() => setIsAnimating(false), 300);
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
    if (quizResult.percentage >= 70) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const navigateQuestion = (direction) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuestionIndex(prev => 
        direction === 'next' 
          ? Math.min(prev + 1, currentQuiz.questions.length - 1)
          : Math.max(prev - 1, 0)
      );
      setIsAnimating(false);
    }, 300);
  };

  const QuizManagement = () => {
    if (userRole === 'student') return null;
    
    return (
      <Card className="mb-6 bg-indigo-50 transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-800">Quiz Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {['Edit Quiz', 'View Results', 'Create New Quiz'].map((action) => (
              <Button 
                key={action}
                variant="outline" 
                className="bg-white hover:bg-indigo-100 transition-colors duration-300"
              >
                {action}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const ResultsDisplay = () => {
    if (!result) return null;

    const getGradeColor = (percentage) => {
      if (percentage >= 80) return 'text-emerald-600';
      if (percentage >= 60) return 'text-amber-600';
      return 'text-rose-600';
    };

    return (
      <Card className="mt-6 border-t-4 border-t-indigo-500 transform transition-all duration-500 hover:scale-102">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className={`text-4xl font-bold text-center ${getGradeColor(result.percentage)} 
              transform transition-all duration-500 hover:scale-110`}>
              {result.percentage.toFixed(1)}%
              {result.percentage >= 70 && <Star className="inline-block ml-2 text-yellow-400" />}
            </div>
            <div className="flex justify-center gap-8">
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-emerald-500 mb-2">
                  <CheckCircle className="w-8 h-8 mx-auto" />
                </div>
                <div className="text-lg font-medium">Correct: {result.correctAnswers}</div>
              </div>
              <div className="text-center transform transition-all duration-300 hover:scale-105">
                <div className="text-rose-500 mb-2">
                  <XCircle className="w-8 h-8 mx-auto" />
                </div>
                <div className="text-lg font-medium">
                  Incorrect: {result.totalQuestions - result.correctAnswers}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <QuizManagement />
      
      <Card className="shadow-xl transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="border-b bg-white">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <CardTitle className="text-2xl text-indigo-800">{currentQuiz.title}</CardTitle>
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full 
              transform transition-all duration-300 hover:scale-105">
              <Timer className="w-5 h-5 text-indigo-600" />
              <span className="font-mono text-lg text-indigo-600">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {!quizSubmitted ? (
            <div className={`space-y-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex justify-between mb-4">
                <Button 
                  onClick={() => navigateQuestion('prev')}
                  disabled={currentQuestionIndex === 0}
                  className="text-indigo-600"
                >
                  Previous
                </Button>
                <span className="text-indigo-600">
                  Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                </span>
                <Button 
                  onClick={() => navigateQuestion('next')}
                  disabled={currentQuestionIndex === currentQuiz.questions.length - 1}
                  className="text-indigo-600"
                >
                  Next
                </Button>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-lg font-medium mb-4 flex gap-2">
                  <span className="text-indigo-600">{currentQuestionIndex + 1}.</span>
                  {currentQuiz.questions[currentQuestionIndex].question}
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={answers[currentQuiz.questions[currentQuestionIndex].id] === index ? "default" : "outline"}
                      className={`justify-start text-left p-4 h-auto transform transition-all duration-300
                        ${answers[currentQuiz.questions[currentQuestionIndex].id] === index 
                          ? 'bg-indigo-500 hover:bg-indigo-600 text-white scale-102' 
                          : 'hover:bg-indigo-50 hover:scale-101'
                        }`}
                      onClick={() => handleAnswerSelect(currentQuiz.questions[currentQuestionIndex].id, index)}
                    >
                      <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  className="w-full py-6 text-lg font-medium bg-indigo-500 hover:bg-indigo-600
                    transform transition-all duration-300 hover:scale-102"
                  onClick={submitQuiz}
                  disabled={Object.keys(answers).length !== currentQuiz.questions.length}
                >
                  {Object.keys(answers).length === currentQuiz.questions.length 
                    ? 'Submit Quiz' 
                    : `Answer all questions (${Object.keys(answers).length}/${currentQuiz.questions.length})`
                  }
                </Button>
              </div>
            </div>
          ) : (
            <ResultsDisplay />
          )}
        </CardContent>
      </Card>

      {!quizSubmitted && timeLeft <= 300 && (
        <Alert className="mt-4 border-amber-200 bg-amber-50 transform transition-all duration-300 hover:scale-102">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <AlertDescription className="text-amber-600">
            Less than {Math.ceil(timeLeft / 60)} minutes remaining!
          </AlertDescription>
        </Alert>
      )}

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Add confetti effect here */}
        </div>
      )}
    </div>
  );
};

export default QuizSystem;