import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';
import { getDirname } from '../utils/determinePath.js';

const __dirname = getDirname(import.meta.url);
const pathToTargetFile = resolve(__dirname, 'files', 'fileToCompress.txt');
const pathToCompessedFile = resolve(__dirname, 'files', 'archive.gz');

const decompress = async () => {
    try {
        await pipeline(createReadStream(pathToCompessedFile), createGunzip(), createWriteStream(pathToTargetFile));
    } catch(err) {
        throw new Error(err.message);
    }
};

await decompress();
