const path = require('path');
const { readFile, writeFile } = require('fs').promises;

const replaceFile = async (appName) => {
  try {
    const [pkgData, pkgLockData] = await Promise.all([
      readFile(path.resolve(process.cwd(), appName, 'package.json')),
      readFile(path.resolve(process.cwd(), appName, 'package-lock.json')),
    ]);
    const replacePkgData = {
      ...JSON.parse(pkgData),
      name: appName,
      version: '0.1.0',
    };
    const replacePkgLockData = {
      ...JSON.parse(pkgLockData),
      name: appName,
      version: '0.1.0',
    };
    return await Promise.all([
      writeFile(
        path.resolve(process.cwd(), appName, 'package.json'),
        JSON.stringify(replacePkgData, null, 2),
      ),
      writeFile(
        path.resolve(process.cwd(), appName, 'package-lock.json'),
        JSON.stringify(replacePkgLockData, null, 2),
      ),
    ]);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = replaceFile;
