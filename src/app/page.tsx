import { db } from "@/db/drizzle";
import AssessmentManager from "./_components/assessment-manager";
import GenerateQuestions from "./_components/generate-questions";
import { 
  questions as questionsTable,
} from "@/db/schema";


export default async function Home() {
  const question = await db.select().from(questionsTable).limit(5)
  const hasQuestions = question.length > 0

  if(!hasQuestions) return <GenerateQuestions />

  return (
    <div>
      <AssessmentManager questions={question} />
    </div>
  );
}
