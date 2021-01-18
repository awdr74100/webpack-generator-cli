const { promisify } = require('util');
const ora = require('ora');
const chalk = require('chalk');
const download = promisify(require('download-git-repo'));
const generator = require('./generator');

const clone = async (repoUrl, appName, options = {}) => {
  console.log(
    `Creating project in ${chalk.yellow(`${process.cwd()}/${appName}`)}`,
  );
  const spinner = ora('Initializing git repository...');
  spinner.start();
  spinner.color = 'blue';
  try {
    await download(repoUrl, appName, options);
    await generator(appName);
    spinner.color = 'green';
    spinner.text = 'Done';
    spinner.succeed();
    console.log(`
    Get started with the following commands:

    $ ${chalk.blue(`cd ${appName}`)}
    $ ${chalk.blue('npm run dev')}
    
    `);
  } catch (error) {
    spinner.color = 'red';
    spinner.text = error.message;
    spinner.fail();
  }
};

module.exports = clone;
