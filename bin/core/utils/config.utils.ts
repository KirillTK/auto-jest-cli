import { IConfig } from '../types/config.type';
import * as process from 'process';
import * as minimist from 'minimist';
import { DEFAULT_CONFIG } from '../const/config.const';
import { ArgumentEnum } from '../enum';
import { sync } from 'find-up';


export const getConfig = (): IConfig => {
  try {
    const configFilePath = sync('auto-jest-config.ts');

    if (!configFilePath) {
      throw new Error('No config found');
    }

    const file = require(configFilePath);

    return file as IConfig;
  } catch (error) {
    console.error(error);

    return DEFAULT_CONFIG;
  }
};

export const getCommandArgumentByName = <R, T = keyof ArgumentEnum>(argument: ArgumentEnum): R => {
  const argv = minimist<T>(process.argv.slice(2));

  return argv[argument];
};
