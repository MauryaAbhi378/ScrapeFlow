"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";

export async function GetCredentialValue(credentialId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const credential = await prisma.credential.findUnique({
    where: {
      id: credentialId,
      userId, // Ensure user owns this credential
    },
  });

  if (!credential) {
    throw new Error("Credential not found");
  }

  // Decrypt the value before returning
  const decryptedValue = symmetricDecrypt(credential.value);

  return decryptedValue;
}
