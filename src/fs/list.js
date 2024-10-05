import fs from 'node:fs/promises'; 
import path from 'node:path';
import { getDirname } from '../utils/determinePath.js';
import { TARGET_FOLDER_NAME, ERROR_MESSAGE } from '../utils/constants.js';

const list = async () => {
    try {
        const contentOfFolder = await fs.readdir(path.resolve(getDirname(import.meta.url), TARGET_FOLDER_NAME));

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