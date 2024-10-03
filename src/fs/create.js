import { writeFile } from 'node:fs/promises';
import { NAME_OF_CREATED_FILE, CONTENT_OF_CREATED_FILE, ERROR_MESSAGE } from './utils/constants.js'
import { determinePathToFile } from './utils/determinePathToFile.js';




const PATH = determinePathToFile(import.meta.url, NAME_OF_CREATED_FILE, 'files');

const create = async () => {
    try {
        await writeFile(PATH, CONTENT_OF_CREATED_FILE, { flag: 'wx' });
    } catch {
        throw new Error(ERROR_MESSAGE);
    }
};

await create();