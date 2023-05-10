/*
Write a program which reads a string from the standard input stdin, reverses it and then writes it to 
the standard output stdout.
• The program should be started from npm script via nodemon (i.e. npm run task1).
• The program should be running in a stand-by mode and should not be terminated after the 
first-string processing.
*/
const readline = require('readline');

function reverseInput(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  rl.on('line', (input: string) => {
    const output = input.split('').reverse().join('');
    console.log(output);
  });
}

reverseInput();
