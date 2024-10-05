import path from "node:path";
import { release, version } from "node:os";
import { createServer as createServerHttp } from "node:http";
import { createRequire } from "node:module";
import { getDirname, getFilename } from "../utils/determinePath.js";

import "./files/c.js";

const random = Math.random();

let unknownObject;

const require = createRequire(import.meta.url);
const __dirname = getDirname(import.meta.url);
const __filename = getFilename(import.meta.url);

if (random > 0.5) {
  unknownObject = require(path.resolve(__dirname, "./files/a.json"));
} else {
  unknownObject = require(path.resolve(__dirname, "./files/b.json"));
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
