import { ERROR_MESSAGE, TARGET_FOLDER_NAME, COPIED_FOLDER_NAME, ERROR_CODE_CP_EXIST } from './utils/constants.js';
import { determinePathToFile } from './utils/determinePathToFile.js';
import fs from 'node:fs/promises';

const sourcePath = determinePathToFile(import.meta.url, TARGET_FOLDER_NAME);
const destinationPath = determinePathToFile(import.meta.url, COPIED_FOLDER_NAME);

const copy = async () => {

    try {
        const contentOfFolder = await fs.readdir(determinePathToFile(import.meta.url, ''), { withFileTypes: true, recursive: true });
        const isSourceFolderExist = contentOfFolder.some((el) => el.name === TARGET_FOLDER_NAME && el.isDirectory());
        
        if(!isSourceFolderExist) {
            throw new Error(ERROR_MESSAGE);
        } 

        await fs.cp(sourcePath, destinationPath, { recursive: true, force: false, errorOnExist: true })

    } catch(err) {
        if(err.code === ERROR_CODE_CP_EXIST) {
            throw new Error(ERROR_MESSAGE);
        }
        throw err;
    }
};

await copy();
