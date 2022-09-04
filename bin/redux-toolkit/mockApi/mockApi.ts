import { getCommandArgumentByName } from '../../core/utils';
import { ArgumentEnum, TestFolderNameEnum } from '../../core/enum';
import * as fs from 'fs';
import { getFileExports, createFileDir } from '../../core/utils';

const getMockApiTemplate = (methodName: string) => {
  return `export const ${methodName} = () => Promise.resolve().then(() => ({ data: '' }));`
}

const generateTestImport = (methodNames: string[], fileName: string) => {
  const methods = methodNames.reduce((accum, method, index) => {
    return accum + method + (index === methodNames.length - 1 ? ' ' : ', ')
  }, '');

  return `import { ${methods}} from '../${fileName}`
};

const generateTestBody = (methodNames: string[]) => {
  return methodNames.reduce((accum, method) => {
    return accum + `it('should return data[${method}]', async () => {
    expect.assertions(1);
    await expect(${method}()).resolves.toEqual({ data: '' });
  });` + '\n\t';
  }, '');
}

const getTestApiTemplate = (methodNames: string[], fileName: string) => {
  const fileNameWithoutExt = fileName.replace('.ts', '');

  return `${generateTestImport(methodNames, fileNameWithoutExt)}';
  
jest.mock('../${fileNameWithoutExt}');

describe('Test ${fileNameWithoutExt}', () => {

  ${generateTestBody(methodNames)}
});`
}

const createMockApiFile = (exportMethods: string[], fileName: string) => {
  createFileDir(TestFolderNameEnum.MOCK);

  const mocks = exportMethods.reduce((accum, method) => {
    return accum + getMockApiTemplate(method) + '\n';
  }, '');

  fs.writeFileSync(`./${TestFolderNameEnum.MOCK}/${fileName}`, mocks);
}


const createTestFile = (exportMethods: string[], fileName: string) => {
  createFileDir(TestFolderNameEnum.TESTS);

  const testFile = getTestApiTemplate(exportMethods, fileName)

  fs.writeFileSync(`./${TestFolderNameEnum.TESTS}/${fileName}`, testFile);
}


// --api='fileName.ts'
// TODO: add support class
export const mockApi = async () => {
  const apiFileName = getCommandArgumentByName<string>(ArgumentEnum.API);

  try {
    const exportMethods = await getFileExports(apiFileName);

    if (!exportMethods) {
      throw Error('No exports found!');
    }

    createMockApiFile(exportMethods, apiFileName);
    createTestFile(exportMethods, apiFileName);

    console.log(apiFileName, 'apiFileName');
    console.log(exports);
  } catch (error) {
    console.error(error);
  }
};

