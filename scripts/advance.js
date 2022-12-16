const { resolve } = require('path');
const { spawn } = require('child_process');
const dictionary = resolve(__dirname, '../packages/advance');
const argvs = process.argv.slice(2);

spawn('vite', ['build'].concat(argvs), {
  cwd: dictionary,
  stdio: 'inherit',
})