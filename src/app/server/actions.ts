"use server";

import { getNotionPageContent } from '@/lib/content';
import { generateQuestions } from '@/lib/assessment';

const fakeMaterial = `
    # Naruto

    Naruto Uzumaki is a fictional character in the manga and anime series Naruto. He is the main protagonist of the series and the seventh Hokage of the village of Konoha. He is a ninja and a shinobi, a member of the Uzumaki clan, and the son of Sasuke and Sakura Haruno. Naruto is known for his skills in ninjutsu, the art of ninja-like combat, as well as his ability to use the ninja code, the fabled technique of summoning demons from the underworld. He is also known for his loyalty to his friends and family, and his dedication to the cause of justice and righteousness.

    ## Character Background
    From village life, Naruto is a quiet and reserved individual, often seen sitting alone in his room. He is a skilled ninja and a master of the ninja code, which allows him to summon demons from the underworld. Naruto is also a devoted student of the ninja arts, and he is known for his dedication to the cause of justice and righteousness.

    ## Character Development
    Naruto's character development is a central theme in the series. He is initially portrayed as a young boy who is forced to become a ninja to protect his village from the threat of the evil organization, the Akatsuki. Naruto's journey is marked by his struggles with his own personal demons, as well as his interactions with his friends and family.

    ## Character Traits
    Naruto is a skilled ninja and a master of the ninja code. He is also a devoted student of the ninja arts, and he is known for his dedication to the cause of justice and righteousness. Naruto is a loyal and dedicated friend to his friends and family, and he is willing to do whatever it takes to protect them.

    ## Character Motivation 
    to protect his village from the threat of the evil organization, the Akatsuki. Naruto's journey is marked by his struggles with his own personal demons, as well as his interactions with his friends and family.
`

export async function generateAssessment() {
  const material = fakeMaterial //await getNotionPageContent(process.env.PAGE_ID || "", process.env.NOTION_TOKEN!)
  const questions = await generateQuestions(material);

  return { questions }
}