import { IConfig } from '../types/config.type';
import { LibraryEnum, PackageManagerEnum } from '../enum';

export const DEFAULT_CONFIG: IConfig = {
  storePath: '',
  library: LibraryEnum.TOOLKIT,
  packageManager: PackageManagerEnum.NPM,
};
