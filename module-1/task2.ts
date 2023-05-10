// Write a program which should do the following:
// • Read the content of csv file from ./csv directory. Example: https://epa.ms/nodejs19-hw1-ex1
// • Use the csvtojson package (https://github.com/Keyang/node-csvtojson) to convert csv file to
// json object.
// • Write the csv file content to a new txt file.
// Use the following format: https://epa.ms/nodejs19-hw1-ex2.
// • Do not load all the content of the csv file into RAM via stream (read/write file content line by
// line). - THIS MUST BE A TYPO, streams should not load everything into memory anyway, so I will use streams...line by line ie: chunk by chunk?
// • In case of read/write errors, log them in the console.
// • The program should be started via npm script using nodemon (i.e. npm run task2).

/*
COMMONJS

const path = require('path');
const csv = require('csvtojson');
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('node:stream/promises');

*/

/*
ES MODULES
*/

import path from 'path';
import csv from 'csvtojson';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';

async function writeCSVToText(): Promise<void> {
  await pipeline(
    createReadStream(path.resolve(__dirname, './csv/example.csv')),
    csv(),
    createWriteStream(path.resolve(__dirname, './csv/new.txt'))
  );
}

writeCSVToText()
  .then(() => console.log('Pipeline succeeded'))
  .catch((e: { code: string }) => console.log(e.code));
