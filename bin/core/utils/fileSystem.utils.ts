import * as fs from 'fs';

export class FileSystemUtils {
  static createFileDir = (folderName: string): void => {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  };

  static fileParser = async (fileName: string): Promise<string> => {
    return fs.promises.readFile(`${process.cwd()}/${fileName}`, 'utf-8');
  };

  static removeFileExtension = (fileName: string) => ['.tsx', '.ts'].reduce((accum, ext) => {
    return accum.replace(ext, '');
  }, fileName);

  static getFileExports = async (fileName: string): Promise<string[] | undefined> => {
    const text = await this.fileParser(fileName);

    const matchResult = text.match(/export (const|function) \w*/gi);

    return matchResult?.map((methodName) =>
      methodName
        .replace('export const ', '')
        .replace('export function ', ''));
  };

  static getComponentExport = async (fileName: string): Promise<string | undefined> => {
    const exports = await this.getFileExports(fileName);

    return exports?.find((exp) => exp.toLowerCase() === this.removeFileExtension(fileName).toLowerCase());
  };
}
