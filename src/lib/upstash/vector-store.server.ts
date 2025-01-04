import embeddings from '@/lib/openai/embedding.server'
import { Index as UpstashIndex } from '@upstash/vector'
import { UpstashVectorStore } from '@langchain/community/vectorstores/upstash'
 
const index = new UpstashIndex({
  url: process.env.UPSTASH_VECTOR_REST_URL as string,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN as string,
})

const upstashVectorStore = new UpstashVectorStore(embeddings, { index })
 
export default upstashVectorStore