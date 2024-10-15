import fs from 'node:fs/promises';
import path from 'node:path';
import { getDirname } from '../utils/determinePath.js';
import { TARGET_FOLDER_NAME, FILE_OF_DELETE, ERROR_MESSAGE } from '../utils/constants.js';

const __dirname = getDirname(import.meta.url);
const targetDeletePath = path.resolve(__dirname, TARGET_FOLDER_NAME, FILE_OF_DELETE);

const remove = async () => {
    try {
        const contentOfFolder = await fs.readdir(__dirname, { withFileTypes: true, recursive: true });
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