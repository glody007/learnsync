import { useState } from 'react'
import { motion } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface MultipleChoiceQuestionProps {
  question: {
    text: string
    options?: string[]
  }
  onAnswer: (answer: string[]) => void
}

export default function MultipleChoiceQuestion({ question, onAnswer }: MultipleChoiceQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleOptionChange = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    )
  }

  const handleSubmit = () => {
    onAnswer(selectedOptions)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold  mb-4">{question.text}</h2>
      {question.options?.map((option, index) => (
        <motion.div 
          key={index} 
          className="flex items-center space-x-2  p-3 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Checkbox
            id={`option-${index}`}
            checked={selectedOptions.includes(option)}
            onCheckedChange={() => handleOptionChange(option)}
            className="border-gray-600 text-blue-500"
          />
          <label htmlFor={`option-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500">
            {option}
          </label>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button onClick={handleSubmit} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}

