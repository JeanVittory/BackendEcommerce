import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const args = yargs(hideBin(process.argv))
  .default({
    port: 8080,
    mode: 'fork',
  })

  .alias({
    p: 'port',
    m: 'mode',
  })
  .choices({
    m: ['fork', 'cluster', 'native_cluster'],
  }).argv;

export { args };
