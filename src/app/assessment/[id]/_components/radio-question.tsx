import { useState } from 'react'
import { motion } from 'framer-motion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface RadioQuestionProps {
  question: {
    text: string
    options?: string[]
  }
  onAnswer: (answer: string) => void
}

export default function RadioQuestion({ question, onAnswer }: RadioQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">{question.text}</h2>
      <RadioGroup onValueChange={setSelectedOption} className="space-y-2">
        {question.options?.map((option, index) => (
          <motion.div 
            key={index} 
            className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RadioGroupItem value={option} id={`option-${index}`} className="border-gray-600 text-blue-500" />
            <Label htmlFor={`option-${index}`} className="text-gray-300">{option}</Label>
          </motion.div>
        ))}
      </RadioGroup>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button onClick={handleSubmit} disabled={!selectedOption} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}

