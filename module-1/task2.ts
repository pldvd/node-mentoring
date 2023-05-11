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
