"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import MultipleChoiceQuestion from './multiple-choice-question'
import FreeTextQuestion from './free-text-question'
import RadioQuestion from './radio-question'
import GradeDisplay from './grade-display'

type QuestionType = 'multiple-choice' | 'free-text' | 'radio'

export interface Question {
  id: number
  type: QuestionType
  text: string
  options?: string[]
  correctAnswer: string | string[]
}

export default function AssessmentManager({ questions } : { questions: Question[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(string | string[])[]>([])
  const [showGrade, setShowGrade] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (answer: string | string[]) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answer
    setAnswers(newAnswers)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowGrade(true)
    }
  }

  const calculateGrade = () => {
    let correctAnswers = 0
    questions.forEach((question, index) => {
      const userAnswer = answers[index]
      if (Array.isArray(question.correctAnswer) && Array.isArray(userAnswer)) {
        if (question.correctAnswer.every(a => userAnswer.includes(a)) && userAnswer.every(a => question.correctAnswer.includes(a))) {
          correctAnswers++
        }
      } else if (question.correctAnswer === userAnswer) {
        correctAnswers++
      }
    })
    return (correctAnswers / questions.length) * 100
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-white flex items-center justify-center">
          <Sparkles className="w-8 h-8 mr-2 text-yellow-400" />
          Anime Quiz
          <Sparkles className="w-8 h-8 ml-2 text-yellow-400" />
        </h1>
        <AnimatePresence mode="wait">
          {showGrade ? (
            <motion.div
              key="grade"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GradeDisplay grade={calculateGrade()} />
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {currentQuestion.type === 'multiple-choice' && (
                <MultipleChoiceQuestion
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                />
              )}
              {currentQuestion.type === 'free-text' && (
                <FreeTextQuestion
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                />
              )}
              {currentQuestion.type === 'radio' && (
                <RadioQuestion
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {!showGrade && (
          <motion.div 
            className="mt-4 text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Question {currentQuestionIndex + 1} of {questions.length}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

