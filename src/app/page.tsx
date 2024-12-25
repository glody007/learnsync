"use client"


import { useState } from "react";
import AssessmentManager, { Question } from "./_components/assessment-manager";
import { generateAssessment } from "./server/actions";



export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([])

  const createNewAssessment = async () => {
    const response = await generateAssessment()
    setQuestions(response.questions)
  }
  
  return (
    <div>
      <AssessmentManager questions={questions} generateNewAssessment={createNewAssessment} />
    </div>
  );
}
