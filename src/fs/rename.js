import fs from 'node:fs/promises';
import path from 'node:path';
import { getDirname } from '../utils/determinePath.js';
import { ERROR_MESSAGE, TARGET_FOLDER_NAME, WRONG_FILE_TXT, PROPER_FILE_MD } from '../utils/constants.js';

const __dirname = getDirname(import.meta.url);
const sourceFilePath = path.resolve(__dirname, TARGET_FOLDER_NAME, WRONG_FILE_TXT);
const renamedFilePath = path.resolve(__dirname, TARGET_FOLDER_NAME, PROPER_FILE_MD);

const rename = async () => {
    try {
        const contentOfFolder = await fs.readdir(__dirname, { withFileTypes: true, recursive: true })
        const isTargetFileExist = contentOfFolder.some((el) => el.name === WRONG_FILE_TXT && el.isFile());
        const isRenamedFileExist = contentOfFolder.some((el) => el.name === PROPER_FILE_MD && el.isFile());
       
        if (isTargetFileExist && !isRenamedFileExist) {
            await fs.rename(sourceFilePath, renamedFilePath);
        } else {
            throw new Error(ERROR_MESSAGE);
        }
    } catch(err) {
        throw err;
    }
};

await rename();