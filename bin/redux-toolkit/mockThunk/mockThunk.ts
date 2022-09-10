import * as fs from 'fs';
import {
  createFileDir,
  generateTestImport,
  getCommandArgumentByName,
  getFileExports, removeFileExtension,
} from '../../core/utils';
import { ArgumentEnum, TestFolderNameEnum } from '../../core/enum';


export class MockThunk {
  private generateFileTemplate = (thunks: string[], fileName: string, mockApiFile: string) => {
    const tests = this.generateTestTemplate(thunks);
    const imports = generateTestImport(thunks, fileName);

    const mockApiImport = !!mockApiFile ? `jest.mock('../${mockApiFile}');` : '';

    return `
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'

${imports}
${mockApiImport}

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Thunks [${fileName}]', () => {
${tests}
});`.trim();
  };

  private generateTestTemplate = (thunks: string[]): string => {
    return thunks.reduce((accum, thunkName) => {
      return accum + `
  it('${thunkName}', async () => {
    await store.dispatch(${thunkName}() as any);
    
    const actions = store.getActions();

    expect(actions[0].type).toStrictEqual(''); // pendingAction
    expect(actions[1].type).toStrictEqual(''); // fulfilledAction
    expect(actions[1].payload).toStrictEqual('');
  });      
      ` + '\n';
    }, '').trim();
  };

  private writeFile = (thunks: string[], fileName: string, mockApiFile: string): void => {
    createFileDir(TestFolderNameEnum.TESTS);
    const testFile = this.generateFileTemplate(thunks, removeFileExtension(fileName), removeFileExtension(mockApiFile || ''));

    fs.writeFileSync(`./${TestFolderNameEnum.TESTS}/${fileName}`, testFile);
  };

  mockThunk = async (): Promise<void> => {
    const thunkFileName = getCommandArgumentByName<string>(ArgumentEnum.THUNK);
    const apiFileName = getCommandArgumentByName<string>(ArgumentEnum.API);

    console.log(apiFileName, 'apiFileName');

    try {
      const exportMethods = await getFileExports(thunkFileName);

      if (!exportMethods) {
        throw Error('No exports found!');
      }

      this.writeFile(exportMethods, thunkFileName, apiFileName);
    } catch (error) {
      console.error(error);
    }
  };
}
