import { pipeline } from 'node:stream/promises';
import { EOL } from 'node:os';
import { Transform } from 'node:stream';
import { ANSI_COLOR_PURPLE, ANSI_RESET } from '../utils/constants.js';


const reverseStr = (str) => str.split('').reverse().join('').concat(EOL);

const reverseStream = {
    transform(chunk, _, cb) {
        cb(null, reverseStr(chunk.toString()));
    }, 
}

const transform = async () => {
    try {
        process.stdout.write(`${ANSI_COLOR_PURPLE}Type your text for reversing:${ANSI_RESET}${EOL}`);
        await pipeline(process.stdin, new Transform(reverseStream), process.stdout);
    } catch(err) {
        throw new Error(err.message);
    }
};

await transform();