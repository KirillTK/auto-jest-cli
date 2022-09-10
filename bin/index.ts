#! /usr/bin/env node
import * as minimist from 'minimist';
import * as process from 'process';

// export { mock } from './initConfig';
// export { MockThunk } from './redux-toolkit';


const args = minimist(process.argv.slice(2));

console.log(args, 'asd');
