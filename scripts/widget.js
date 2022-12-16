const { resolve } = require('path');
const { spawn } = require('child_process');
const dictionary = resolve(__dirname, '../packages/widget');
const argvs = process.argv.slice(2);

spawn('tsc', ['-d'].concat(argvs), {
  cwd: dictionary,
  stdio: 'inherit',
})