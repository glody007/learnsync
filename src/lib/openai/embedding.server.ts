import { OpenAIEmbeddings } from '@langchain/openai'

const openAIEmbeddings  = new OpenAIEmbeddings({
    modelName: 'text-embedding-3-small',
    openAIApiKey: process.env.OPENAI_API_KEY,
})

export default openAIEmbeddings 