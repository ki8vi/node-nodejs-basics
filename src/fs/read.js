import fs from 'node:fs/promises'; 
import { determinePathToFile } from './utils/determinePathToFile.js';
import { TARGET_FOLDER_NAME, ERROR_MESSAGE, FILE_OF_READ } from './utils/constants.js';

const readFilePath = determinePathToFile(import.meta.url, FILE_OF_READ, TARGET_FOLDER_NAME);

const read = async () => {
    try {
        const contentOfFolder = await fs.readdir(determinePathToFile(import.meta.url, ''), { withFileTypes: true, recursive: true });
        const isTargetFileExist = contentOfFolder.some((el) => el.name === FILE_OF_READ && el.isFile()); 

        if(!isTargetFileExist) {
            throw new Error(ERROR_MESSAGE);
        }

        const textOfFile = await fs.readFile(readFilePath);
        console.log(textOfFile.toString());

    } catch(err) {
        throw err;
    }
};

await read();