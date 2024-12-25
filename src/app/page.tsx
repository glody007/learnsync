import { Client } from "@notionhq/client";
import AssessmentManager, { Question } from "./_components/assessment-manager";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    text: 'Which of these are popular anime genres?',
    options: ['Shonen', 'Mecha', 'Slice of Life', 'Isekai'],
    correctAnswer: ['Shonen', 'Mecha', 'Slice of Life', 'Isekai']
  },
  {
    id: 2,
    type: 'free-text',
    text: 'What is the name of the main character in "Naruto"?',
    correctAnswer: 'Naruto Uzumaki'
  },
  {
    id: 3,
    type: 'radio',
    text: 'Which studio produced "My Neighbor Totoro"?',
    options: ['Studio Ghibli', 'Kyoto Animation', 'Madhouse', 'Toei Animation'],
    correctAnswer: 'Studio Ghibli'
  }
]


export default async function Home() {
  // const db = await notion.databases.query({
  //   database_id: process.env.DB_ID || "",
  // })
  
  // const pages = await notion.pages.retrieve({
  //   page_id: process.env.PAGE_ID || "",
  // })

  const blocks = await notion.blocks.children.list({
    block_id: process.env.PAGE_ID || "",
  })

  
  return (
    <AssessmentManager questions={questions} />
  );
}
