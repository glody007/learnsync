"use server";

import { getNotionPageContent } from '@/lib/ingestion/notion.server';
import { generateQuestions } from '@/lib/assessment.server';
import { db } from '@/db/drizzle';
import { sources as sourcesTable, questions as questionTable, materials as materialTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getUrlContent } from '@/lib/ingestion/url.server';
import { Document } from 'langchain/document'
import upstashVectorStore from '@/lib/upstash/vector-store.server';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function generateAssessment(materialId: number) {
  const materials = await db.select().from(materialTable).where(eq(materialTable.id, materialId));
  const material = materials[0];

  if(!material) {
    throw new Error('Material not found');
  }

  const questions = await db.select().from(questionTable).where(eq(questionTable.materialId, materialId)).limit(5);
  return { questions }
}

export async function generateMaterial(sourceId: number, metadata?: { url: string }) {
    const sources = await db.select().from(sourcesTable).where(eq(sourcesTable.id, sourceId));
    const source = sources[0];

    if(!source) {
        throw new Error('Source not found');
    }

    if(source.type !== 'notion' && source.type !== 'url') {
        throw new Error('Unsupported source type');
    }

    let materialData = { content: '' }

    if(source.type === 'notion') {
      materialData = await getNotionPageContent(source.identifier, process.env.NOTION_TOKEN!)
    }

    if (source.type === 'url') {
      materialData = await getUrlContent(metadata?.url ?? source.identifier);
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 4000,
      chunkOverlap: 400,
    });
    
    const documents = await splitter.splitDocuments([
      new Document({ pageContent: materialData.content, metadata: { sourceId } }),
    ]);

    const insertedMaterials = await db.insert(materialTable).values({ 
      sourceId, 
      metadata: metadata
    }).returning();

    const questions = await generateQuestions(materialData.content);

    await upstashVectorStore.addDocuments(documents)

    const material = insertedMaterials[0]

    if(!material) {
      throw new Error('Failed to insert material');
    }

    await db
      .insert(questionTable)
      .values(questions.map(question => ({ ...question, materialId: material.id })))

    return {
      success: true,
      material
    }
}