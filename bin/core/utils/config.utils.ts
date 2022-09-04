import { IConfig } from '../types/config.type';
import * as process from 'process';
import * as minimist from 'minimist';
import { CONFIG_NAME } from '../const';
import { DEFAULT_CONFIG } from '../const/config.const';
import { ArgumentEnum } from '../enum';


export const getConfig = async (): Promise<IConfig> => {
  try {
    return await import(`${process.cwd()}/${CONFIG_NAME}`) as IConfig;
  } catch (error) {
    console.error(error);

    return DEFAULT_CONFIG;
  }
};

export const getCommandArgumentByName = <R, T = keyof ArgumentEnum>(argument: ArgumentEnum): R => {
  const argv = minimist<T>(process.argv.slice(2));

  return argv[argument];
};
