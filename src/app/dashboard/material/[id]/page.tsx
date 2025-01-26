import { db } from "@/db/drizzle";
import { materials as materialsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function MaterialPage({ params }: { params: { id: string } }) {
  const materials = await db.selectDistinct().from(materialsTable).where(eq(materialsTable.id, parseInt(params.id)));
  const material = materials[0];

  if(!material) {
    return (
      <div>Not found</div>
    )
  }

  const { userId } = await auth();

  if (!material.userId) {
    await db.update(materialsTable).set({ userId }).where(eq(materialsTable.id, parseInt(params.id)));
  }

  if(material.userId !== userId) {
    return (
      <div>Not found</div>
    )
  }

  return (
    <div>Material Page</div>
  )
}