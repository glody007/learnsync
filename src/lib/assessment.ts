import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';


export async function generateQuestions(material: string) {
    const result = await generateObject({
        model: openai('gpt-4-turbo'),
        output: 'array',
        schema: z.object({
          id: z.number().describe('The id of the assessment question.'),
          type: z.enum(['multiple-choice', 'free-text', 'radio']),
          text: z.string().describe('The text of the assessment question.'),
          options: z.array(z.string()).describe('The options for the assessment question.'),
          correctAnswer: z.array(z.string()).describe('The correct answer for the assessment question.'),
        }),
        prompt: `For the material input into brackets generate 5 assessment questions with id, type(multiple-choice, free-text or radio), question text, options and correctAnswer [${material}] `,
    });

    return result.object
}