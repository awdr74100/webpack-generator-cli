const chalk = require('chalk');
const inquirer = require('inquirer');
const clone = require('./clone');

const init = async (appName) => {
  try {
    const { chooseVersion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'chooseVersion',
        choices: [5],
        message: 'Choose a version of Webpack',
      },
    ]);
    let repoUrl = '';
    if (chooseVersion === 5) {
      repoUrl = 'github:awdr74100/webpack5-init-template';
    }
    await clone(repoUrl, appName);
  } catch (error) {
    console.log(chalk.red(error.message));
  }
};

module.exports = init;
