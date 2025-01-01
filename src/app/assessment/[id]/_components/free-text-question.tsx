import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface FreeTextQuestionProps {
  question: {
    text: string
  }
  onAnswer: (answer: string) => void
}

export default function FreeTextQuestion({ question, onAnswer }: FreeTextQuestionProps) {
  const [answer, setAnswer] = useState('')

  const handleSubmit = () => {
    onAnswer(answer)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">{question.text}</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here"
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button onClick={handleSubmit} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}

