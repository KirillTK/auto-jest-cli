import { LibraryEnum, PackageManagerEnum } from '../enum';

export interface IConfig {
  storePath: string,
  library: LibraryEnum,
  packageManager: PackageManagerEnum,
}
