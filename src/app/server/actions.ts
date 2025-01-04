"use server";

import { getNotionPageContent } from '@/lib/ingestion/notion.server';
import { generateQuestions } from '@/lib/assessment.server';
import { db } from '@/db/drizzle';
import { sources as sourcesTable, questions as questionTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getUrlContent } from '@/lib/ingestion/url.server';

export async function generateAssessment(sourceId: number) {
  const sources = await db.select().from(sourcesTable).where(eq(sourcesTable.id, sourceId));
  const source = sources[0];

  if(!source) {
      throw new Error('Source not found');
  }

  const questions = await db.select().from(questionTable).where(eq(questionTable.sourceId, sourceId)).limit(5);
  return { questions }
}

export async function generateQuestionsFromSource(sourceId: number, metadata?: { url: string }) {
    const sources = await db.select().from(sourcesTable).where(eq(sourcesTable.id, sourceId));
    const source = sources[0];

    if(!source) {
        throw new Error('Source not found');
    }

    if(source.type === 'notion') {
        const material = await getNotionPageContent(source.identifier, process.env.NOTION_TOKEN!)
        const questions = await generateQuestions(material.content);

        await db
          .insert(questionTable)
          .values(questions.map(question => ({ ...question, sourceId })))

        return {
          success: true,
          questions
        }
    }

    if (source.type === 'url') {
      const material = await getUrlContent(metadata?.url ?? source.identifier);
      const questions = await generateQuestions(material.content);

      await db
        .insert(questionTable)
        .values(questions.map(question => ({ ...question, sourceId })))

      return {
        success: true,
        questions
      }
    }

    throw new Error('Unsupported source type');
}