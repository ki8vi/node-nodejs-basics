import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import { EOL } from 'node:os';
import { getDirname } from '../utils/determinePath.js';

const __dirname = getDirname(import.meta.url);
const targetFilePath = resolve(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    try {
        const readFileStream = createReadStream(targetFilePath, { encoding: 'utf8' });
        readFileStream.on('data', (data) => {
            process.stdout.write(data.concat(EOL));
        });
        
        readFileStream.on('error', console.error);
        process.stdout.on('error', console.error);

    } catch(err) {
        throw new Error(err.message);
    }
};

await read();