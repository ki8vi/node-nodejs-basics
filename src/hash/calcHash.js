import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { getDirname } from '../utils/determinePath.js';

const __dirname = getDirname(import.meta.url);
const targetFilePath = resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const readFileStream = createReadStream(targetFilePath);
    const hasher = createHash('sha256');
    try {
        await pipeline(readFileStream, hasher);
        const hash = hasher.digest('hex');
        console.log(hash);
    } catch(err) {
        throw new Error(err.message);
    }
};

await calculateHash();