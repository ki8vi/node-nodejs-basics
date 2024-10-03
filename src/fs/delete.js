import fs from 'node:fs/promises'; 
import { determinePathToFile } from './utils/determinePathToFile.js';
import { TARGET_FOLDER_NAME, FILE_OF_DELETE, ERROR_MESSAGE } from './utils/constants.js';

const targetDeletePath = determinePathToFile(import.meta.url, FILE_OF_DELETE, TARGET_FOLDER_NAME);

const remove = async () => {
    try {
        const contentOfFolder = await fs.readdir(determinePathToFile(import.meta.url, ''), { withFileTypes: true, recursive: true });
        const isTargetFileExist = contentOfFolder.some((el) => el.name === FILE_OF_DELETE && el.isFile()); 

        if(!isTargetFileExist) {
            throw new Error(ERROR_MESSAGE);
        }

        await fs.rm(targetDeletePath);

    } catch(err) {
        throw err;
    }
    
};

await remove();