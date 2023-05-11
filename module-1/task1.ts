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
