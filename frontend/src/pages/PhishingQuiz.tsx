import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface QuizOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

const PhishingQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Quiz questions data
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Vous recevez un e-mail de votre banque vous demandant de vérifier vos informations. Que faites-vous ?",
      options: [
        { id: 1, text: "Je clique sur le lien dans l'e-mail.", isCorrect: false },
        { id: 2, text: "Je réponds à l'e-mail avec mes informations.", isCorrect: false },
        { id: 3, text: "Je contacte ma banque directement via le site officiel ou par téléphone.", isCorrect: true },
        { id: 4, text: "Je transfère l'e-mail à mes amis pour avoir leur avis.", isCorrect: false }
      ]
    },
    {
      id: 2,
      question: "Comment reconnaître une URL suspecte ?",
      options: [
        { id: 1, text: "Elle commence toujours par http://", isCorrect: false },
        { id: 2, text: "Elle contient des fautes d'orthographe ou des caractères étranges.", isCorrect: true },
        { id: 3, text: "Elle est très courte.", isCorrect: false },
        { id: 4, text: "Elle contient le mot 'secure'.", isCorrect: false }
      ]
    },
    {
      id: 3,
      question: "Vous recevez un SMS semblant provenir de votre opérateur mobile, vous annonçant une \"facture impayée\" et vous demandant de cliquer sur un lien pour régulariser la situation. Que faites-vous ?",
      options: [
        { id: 1, text: "Je clique sur le lien pour régler le problème rapidement.", isCorrect: false },
        { id: 2, text: "Je réponds au SMS en demandant plus d'informations.", isCorrect: false },
        { id: 3, text: "Je supprime le SMS et contacte mon opérateur via son site officiel ou son numéro connu.", isCorrect: true },
        { id: 4, text: "Je transfère le SMS à un ami pour avoir son avis.", isCorrect: false }
      ]
    },
    {
      id: 4,
      question: "Qu'est-ce qu'un certificat SSL (https://) garantit ?",
      options: [
        { id: 1, text: "Que le site est authentique et sûr à 100%.", isCorrect: false },
        { id: 2, text: "Que la connexion est chiffrée, mais pas forcément que le site est légitime.", isCorrect: true },
        { id: 3, text: "Que le site ne contient pas de virus.", isCorrect: false },
        { id: 4, text: "Que vos données ne seront jamais volées.", isCorrect: false }
      ]
    },
    {
      id: 5,
      question: "Quelle est la meilleure pratique pour protéger vos comptes en ligne ?",
      options: [
        { id: 1, text: "Utiliser le même mot de passe pour tous les comptes.", isCorrect: false },
        { id: 2, text: "Activer l'authentification à deux facteurs (2FA).", isCorrect: true },
        { id: 3, text: "Partager vos mots de passe avec des personnes de confiance.", isCorrect: false },
        { id: 4, text: "Utiliser des mots de passe simples et faciles à retenir.", isCorrect: false }
      ]
    }
  ];

  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (optionId: number) => {
    setSelectedAnswer(optionId);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1]);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const calculateScore = (): number => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer !== null) {
        const question = quizQuestions[index];
        const selectedOption = question.options.find(opt => opt.id === answer);
        if (selectedOption?.isCorrect) {
          score++;
        }
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([null, null, null, null, null]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / totalQuestions) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-100">
          <div className="text-center">
            {/* Score Icon */}
            <div className="mx-auto w-24 h-24 mb-6">
              {percentage >= 80 ? (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-14 h-14 text-white" />
                </div>
              ) : percentage >= 50 ? (
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl">⚠️</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <XCircle className="w-14 h-14 text-white" />
                </div>
              )}
            </div>

            {/* Score */}
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Résultats du Quiz
            </h2>
            <div className="mb-6">
              <p className="text-6xl font-bold text-blue-600 mb-2">
                {score}/{totalQuestions}
              </p>
              <p className="text-xl text-slate-600">
                {percentage >= 80 ? '🎉 Excellent !' : percentage >= 50 ? '👍 Bien !' : '📚 Continuez à apprendre !'}
              </p>
            </div>

            {/* Message */}
            <p className="text-slate-700 mb-8 text-lg leading-relaxed">
              {percentage >= 80 
                ? "Félicitations ! Vous maîtrisez bien les bases de la protection contre le phishing."
                : percentage >= 50
                ? "Bon travail ! Vous avez de bonnes bases, mais continuez à vous former."
                : "Il est important de revoir les conseils de sécurité. Relisez l'article et réessayez !"}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetQuiz}
                className="flex-1 px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Recommencer le quiz
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 px-6 py-3 bg-white text-blue-800 font-semibold rounded-lg border-2 border-blue-800 hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Retour à l'apprentissage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Quiz Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 border border-slate-100">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
              Reconnaitre un lien Phishing
            </h1>

            {/* Progress */}
            <div className="mb-2">
              <p className="text-slate-600 font-medium mb-3">
                Question {currentQuestion + 1}/{totalQuestions}
              </p>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-medium">
              {currentQuizQuestion.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQuizQuestion.options.map((option) => (
              <label
                key={option.id}
                className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedAnswer === option.id
                    ? 'border-blue-600 bg-blue-50 shadow-md'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <input
                    type="radio"
                    name="quiz-option"
                    value={option.id}
                    checked={selectedAnswer === option.id}
                    onChange={() => handleAnswerSelect(option.id)}
                    className="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <span className="text-slate-700 text-base md:text-lg leading-relaxed">
                  {option.text}
                </span>
              </label>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentQuestion === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-800 text-white hover:bg-blue-900 shadow-md hover:shadow-lg'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedAnswer === null
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-800 text-white hover:bg-blue-900 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              <span>{currentQuestion === totalQuestions - 1 ? 'Terminer' : 'Suivant'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <p>@ 2026 AegisScan. Tous droites reserves</p>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-2"
          >
            Politique de confidentialite
          </a>
        </footer>
      </div>
    </div>
  );
};

export default PhishingQuiz;
