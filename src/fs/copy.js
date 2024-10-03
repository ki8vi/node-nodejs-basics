import { ERROR_MESSAGE } from './utils/constants.js';
import { determinePathToFile } from './utils/determinePathToFile.js';
import fs from 'node:fs/promises';

const sourcePath = determinePathToFile(import.meta.url, 'files');
const destinationPath = determinePathToFile(import.meta.url, 'files_copy');

const copy = async () => {

    try {
        const contentOfFolder = await fs.readdir(determinePathToFile(import.meta.url, ''), { withFileTypes: true, recursive: true });
        const isSourceFolderExist = contentOfFolder.some((el) => el.name === 'files' && el.isDirectory());
        
        if(!isSourceFolderExist) {
            throw new Error(ERROR_MESSAGE);
        } 

        await fs.cp(sourcePath, destinationPath, { recursive: true, force: false, errorOnExist: true })

    } catch(err) {
        if(err.code === 'ERR_FS_CP_EEXIST') {
            throw new Error(ERROR_MESSAGE);
        }
        throw err;
    }
};

await copy();
