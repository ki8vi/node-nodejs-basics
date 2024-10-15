import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  NAME_OF_CREATED_FILE,
  CONTENT_OF_CREATED_FILE,
  ERROR_MESSAGE,
  TARGET_FOLDER_NAME,
} from "../utils/constants.js";
import { getDirname } from "../utils/determinePath.js";

const pathOfCreatedFile = path.resolve(
  getDirname(import.meta.url),
  TARGET_FOLDER_NAME,
  NAME_OF_CREATED_FILE
);

const create = async () => {
  try {
    await writeFile(pathOfCreatedFile, CONTENT_OF_CREATED_FILE, { flag: "wx" });
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await create();
