import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'

interface GradeDisplayProps {
  grade: number
}

export default function GradeDisplay({ grade }: GradeDisplayProps) {
  return (
    <div className="text-center">
      <motion.h2 
        className="text-2xl font-bold mb-4 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Quiz Complete!
      </motion.h2>
      <motion.div 
        className="text-xl text-gray-300 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Trophy className="w-16 h-16 text-yellow-400 mb-4" />
        <p>Your score:</p>
        <span className="font-bold text-3xl text-blue-400 mt-2">
          {grade.toFixed(2)}%
        </span>
      </motion.div>
    </div>
  )
}

