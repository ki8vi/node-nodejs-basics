import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const determinePathToFile = (currPath, targetFile, targetDirectory = '') => {
    return path.resolve(path.dirname(fileURLToPath(currPath)), targetDirectory, targetFile);
};