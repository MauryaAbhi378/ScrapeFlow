"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { symmetricEncrypt } from "@/lib/encryption";
import { revalidatePath } from "next/cache";

export async function CreateCredential(name: string, value: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Encrypt the credential value before storing
  const encryptedValue = symmetricEncrypt(value);

  const result = await prisma.credential.create({
    data: {
      userId,
      name,
      value: encryptedValue,
    },
  });

  if (!result) {
    throw new Error("Failed to create credential");
  }

  revalidatePath("/credentials");

  return result;
}
