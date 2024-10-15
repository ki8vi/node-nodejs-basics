import { resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { EOL } from 'node:os';
import { ANSI_COLOR_PURPLE, ANSI_RESET } from '../utils/constants.js';
import { getDirname } from '../utils/determinePath.js';

const targetFilePath = resolve(getDirname(import.meta.url), 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = spawn('node', [targetFilePath, ...args]);

    process.stdin.on('data', (ch) => child.stdin.write(ch));
    child.stdout.on('data', (ch) => process.stdout.write(ch));

    child.on('close', (code) => {
        process.stdin.pause();
        process.stdout.write(`${ANSI_COLOR_PURPLE}Child process interrupted! Code: ${code}${ANSI_RESET}${EOL}`);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['Love', 'will', 'save', 'the', 'world!']);
