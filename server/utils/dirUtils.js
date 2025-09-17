import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../uploads");

export async function createDir(folderName) {
  const dirPath = path.join(uploadsDir, String(folderName));
  await fs.mkdir(dirPath, { recursive: true });
  return dirPath;
}

export async function deleteDir(folderName) {
  const dirPath = path.join(uploadsDir, String(folderName));
  await fs.rm(dirPath, { recursive: true, force: true });
}
