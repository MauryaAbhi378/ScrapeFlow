"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteCredential(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Verify ownership before deleting
  const credential = await prisma.credential.findUnique({
    where: { id },
  });

  if (!credential || credential.userId !== userId) {
    throw new Error("Credential not found or unauthorized");
  }

  await prisma.credential.delete({
    where: {
      id,
    },
  });

  revalidatePath("/credentials");
}
