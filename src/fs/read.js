import fs from 'node:fs/promises';
import path from 'node:path';
import { getDirname } from '../utils/determinePath.js';
import { TARGET_FOLDER_NAME, ERROR_MESSAGE, FILE_OF_READ } from '../utils/constants.js';

const __dirname = getDirname(import.meta.url);
const readFilePath = path.resolve(__dirname, TARGET_FOLDER_NAME, FILE_OF_READ);

const read = async () => {
    try {
        const contentOfFolder = await fs.readdir(__dirname, { withFileTypes: true, recursive: true });
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