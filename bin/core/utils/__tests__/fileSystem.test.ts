import * as utils from '../fileSystem.utils';

describe('FileSystem utils', () => {
  let fileParser: jest.SpyInstance;

  const mockFileParser = (mockResult: string) => {
    fileParser = jest.spyOn(utils.FileSystemUtils, 'fileParser').mockImplementation(async () => mockResult);
  };

  afterEach(() => {
    fileParser?.mockClear();
  });

  describe('removeFileExtension', () => {
    it('should remove ts ext', () => {
      expect(utils.FileSystemUtils.removeFileExtension('file.ts')).toStrictEqual('file');
    });

    it('should remove tsx ext', () => {
      expect(utils.FileSystemUtils.removeFileExtension('file.tsx')).toStrictEqual('file');
    });
  });

  it('should get function exports', async () => {
    mockFileParser("export const testFunction = () => '1'; export function testFunction2() { return '2'}");

    expect(await utils.FileSystemUtils.getFileExports('testFile.ts')).toStrictEqual(['testFunction', 'testFunction2']);
  });

  it('should get function component name', async () => {
    mockFileParser('export const Component = () => asd');

    expect(await utils.FileSystemUtils.getComponentExport('component.tsx')).toStrictEqual('Component');
  });
});
