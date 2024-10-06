import { createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { EOL } from 'node:os';
import { getDirname } from '../utils/determinePath.js';
import { ANSI_COLOR_GREEN, ANSI_COLOR_PURPLE, ANSI_RESET } from '../utils/constants.js';

const __dirname = getDirname(import.meta.url);
const targetFilePath = resolve(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    process.stdout.write(`${ANSI_COLOR_PURPLE}Type text for file, for exit press CTRL + C:${ANSI_RESET}${EOL}`);

    const writeFileStream = createWriteStream(targetFilePath);

    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (data) => {
        writeFileStream.write(data);
    });

    process.on('SIGINT', () => {
        process.stdout.write(`${ANSI_COLOR_GREEN}Good job buddy!${ANSI_RESET}${EOL}`);
        writeFileStream.end();
        process.exit();
    });

    
    process.stdin.on('error', console.error);
    writeFileStream.on('error', console.error);
};

await write();