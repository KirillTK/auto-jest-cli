#! /usr/bin/env node

import { MockThunk  } from './redux-toolkit';

export const mock = () => {};

new MockThunk().mockThunk();

console.log(process.argv);
