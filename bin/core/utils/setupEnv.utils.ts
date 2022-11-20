import * as shelljs from 'shelljs';
import { IConfig } from '../types/config.type';
import { PackageManagerEnum } from '../enum';

export class SetupEnvUtils {
  private static requiredDeps = 'redux-mock-store @types/redux-mock-store redux-thunk';

  private static installDeps(packageManager: PackageManagerEnum) {
    const mapExecScript = new Map<PackageManagerEnum, string>([
      [PackageManagerEnum.NPM, `npm i --save-dev ${this.requiredDeps}`],
      [PackageManagerEnum.YARN, `yarn add ${this.requiredDeps} -D`],
    ]);
    const executionCommand = mapExecScript.get(packageManager);

    if (!executionCommand) {
      throw new Error('No package manager found');
    }

    shelljs.exec(executionCommand);
  }

  private generateTestUtils = () => {

  };

  static setup = ({ packageManager, library }: IConfig) => {
    try {
      this.installDeps(packageManager);
    } catch (error) {
      console.error(error);
    }
  };
}
