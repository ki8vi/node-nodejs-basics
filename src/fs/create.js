import { writeFile } from 'node:fs/promises';
import { NAME_OF_CREATED_FILE, CONTENT_OF_CREATED_FILE, ERROR_MESSAGE, TARGET_FOLDER_NAME } from './utils/constants.js'
import { determinePathToFile } from './utils/determinePathToFile.js';




const pathOfCreatedFile = determinePathToFile(import.meta.url, NAME_OF_CREATED_FILE, TARGET_FOLDER_NAME);

const create = async () => {
    try {
        await writeFile(pathOfCreatedFile, CONTENT_OF_CREATED_FILE, { flag: 'wx' });
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await create();