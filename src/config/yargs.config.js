import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const args = yargs(hideBin(process.argv))
  .default({
    port: 8080,
  })
  .alias({
    p: 'port',
  }).argv;

export { args };
