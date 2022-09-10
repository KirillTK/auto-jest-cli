export const generateTestImport = (methodNames: string[], fileName: string) => {
  const methods = methodNames.reduce((accum, method, index) => {
    return accum + method + (index === methodNames.length - 1 ? ' ' : ', ');
  }, '');

  return `import { ${methods}} from '../${fileName}';`;
};
