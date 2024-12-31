"use client"

import { useRouter } from "next/navigation"
import { generateQuestionsFromSource } from "../server/actions"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function GenerateQuestions() {
    const router = useRouter()
    const [sourceId, setSourceId] = useState('')
    const generateQuestions = async (sourceId: string) => {
        await generateQuestionsFromSource(parseInt(sourceId))
        router.replace('/')
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans text-white">
          <div className="max-w-2xl w-full bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-center text-white flex items-center justify-center">
              Generate Questions
            </h1>
            <div className="flex justify-center">
              <Input placeholder='Enter a source identifier' value={sourceId} onChange={e => setSourceId(e.target.value)} />
              <Button onClick={() => generateQuestions(sourceId)} variant="secondary">
                Generate Question
              </Button>
            </div>
          </div>
        </div>
    )
}