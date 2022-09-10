import * as fs from 'fs';


const fileParser = async (fileName: string): Promise<string> => {
  return fs.promises.readFile(`${process.cwd()}/${fileName}`, 'utf-8');
};

export const createFileDir = (folderName: string): void => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
};

export const getFileExports = async (fileName: string): Promise<string[] | undefined> => {
  const text = await fileParser(fileName);

  const matchResult = text.match(/export (const|function) \w*/gi);

  return matchResult?.map((methodName) =>
    methodName
      .replace('export const ', '')
      .replace('export function ', ''));
};

export const removeFileExtension = (fileName: string) => fileName.replace('.ts', '');
