import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;

// Get encryption key from environment
function getEncryptionKey(): string {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error("ENCRYPTION_KEY environment variable is not set");
  }
  return key;
}

export function symmetricEncrypt(text: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const salt = randomBytes(SALT_LENGTH);

  const cipher = createCipheriv(
    ALGORITHM,
    Buffer.from(key, "hex"),
    iv
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag();

  // Return iv + salt + tag + encrypted data
  return iv.toString("hex") + salt.toString("hex") + tag.toString("hex") + encrypted;
}

export function symmetricDecrypt(encryptedText: string): string {
  const key = getEncryptionKey();

  // Extract iv, salt, tag, and encrypted data
  const iv = Buffer.from(encryptedText.slice(0, IV_LENGTH * 2), "hex");
  const salt = Buffer.from(
    encryptedText.slice(IV_LENGTH * 2, IV_LENGTH * 2 + SALT_LENGTH * 2),
    "hex"
  );
  const tag = Buffer.from(
    encryptedText.slice(
      IV_LENGTH * 2 + SALT_LENGTH * 2,
      IV_LENGTH * 2 + SALT_LENGTH * 2 + TAG_LENGTH * 2
    ),
    "hex"
  );
  const encrypted = encryptedText.slice(
    IV_LENGTH * 2 + SALT_LENGTH * 2 + TAG_LENGTH * 2
  );

  const decipher = createDecipheriv(
    ALGORITHM,
    Buffer.from(key, "hex"),
    iv
  );

  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
