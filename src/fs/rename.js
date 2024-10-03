import fs from 'node:fs/promises'; 
import { determinePathToFile } from './utils/determinePathToFile.js';
import { ERROR_MESSAGE, TARGET_FOLDER_NAME, WRONG_FILE_TXT, PROPER_FILE_MD } from './utils/constants.js';

const sourceFilePath = determinePathToFile(import.meta.url, WRONG_FILE_TXT, TARGET_FOLDER_NAME);
const renamedFilePath = determinePathToFile(import.meta.url, PROPER_FILE_MD, TARGET_FOLDER_NAME);

const rename = async () => {
    try {
        const contentOfFolder = await fs.readdir(determinePathToFile(import.meta.url, ''), { withFileTypes: true, recursive: true })
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