#! /usr/bin/env node
import * as minimist from 'minimist';
import * as process from 'process';

import { mockApi, MockComponent, MockThunk } from './redux-toolkit';
import { getConfig } from './core';
import { ArgumentEnum, LibraryEnum } from './core/enum';
import { SetupEnvUtils } from './core/utils';


const autoJestConfig = getConfig();
const args = minimist(process.argv.slice(2));

console.log(args, 'asd');

if (args[ArgumentEnum.INIT]) {
  SetupEnvUtils.setup(autoJestConfig);
}

if (autoJestConfig.library === LibraryEnum.TOOLKIT) {
  if (args[ArgumentEnum.API]) {
    mockApi();
  }

  if (args[ArgumentEnum.THUNK]) {
    new MockThunk().mockThunk();
  }

  if (args[ArgumentEnum.COMPONENT]) {
    new MockComponent().mockComponent();
  }
}

console.log(autoJestConfig, 'getConfig');

