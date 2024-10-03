import fs from 'node:fs/promises'; 
import { determinePathToFile } from './utils/determinePathToFile.js';
import { TARGET_FOLDER_NAME, ERROR_MESSAGE } from './utils/constants.js';

const list = async () => {
    try {
        const contentOfFolder = await fs.readdir(determinePathToFile(import.meta.url, TARGET_FOLDER_NAME));
        
        if(!contentOfFolder) {
            throw new Error(ERROR_MESSAGE);
        } 

        console.log(contentOfFolder);

    } catch(err) {
        if(err.code === 'ENOENT') {
            throw new Error(ERROR_MESSAGE);
        }
        throw err;
    }
};

await list();