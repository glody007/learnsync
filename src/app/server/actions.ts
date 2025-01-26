"use server";

import { generateQuestions } from '@/lib/assessment.server';
import { db } from '@/db/drizzle';
import { questions as questionTable, materials as materialTable, SourceType } from '@/db/schema';
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

export async function generateMaterial(sourceType: SourceType, metadata?: { url: string }) {
    if(sourceType !== 'notion' && sourceType !== 'url') {
        throw new Error('Unsupported source type');
    }

    let materialData = { content: '' }

    if (sourceType === 'url' && metadata?.url) {
      materialData = await getUrlContent(metadata?.url);
    }

    const insertedMaterials = await db.insert(materialTable).values({ 
      sourceType, 
      metadata: metadata
    }).returning();

    const material = insertedMaterials[0]

    if(!material) {
      throw new Error('Failed to insert material');
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 4000,
      chunkOverlap: 400,
    });
    
    const documents = await splitter.splitDocuments([
      new Document({ pageContent: materialData.content, metadata: { ...metadata, materialId: material.id } }),
    ]);

    const questions = await generateQuestions(materialData.content);

    await upstashVectorStore.addDocuments(documents)

    await db
      .insert(questionTable)
      .values(questions.map(question => ({ ...question, materialId: material.id })))

    return {
      success: true,
      material
    }
}