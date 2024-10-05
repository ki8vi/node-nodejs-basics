import { fileURLToPath } from 'node:url';
import path from 'node:path';

const getDirname = (pathUrl) => path.dirname(fileURLToPath(pathUrl));

const getFilename = (pathUrl) => fileURLToPath(pathUrl);

export {
    getDirname,
    getFilename
}