import { db } from "@/db/drizzle"
import { questions as questionsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import AssessmentManager from "./_components/assessment-manager";


export default async function AssessmentPage({ params }: { params: { id: string } }) {
    const questions = await db.select().from(questionsTable).where(eq(questionsTable.sourceId, parseInt(params.id)));

    return (
        <AssessmentManager questions={questions} />
    )
}