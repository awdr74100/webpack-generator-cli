#!/usr/bin/env node

const chalk = require('chalk');
const { program } = require('commander');
const { version } = require('../package.json');
const init = require('../lib/init');

program
  .version(version)
  .name('webpack-generator')
  .usage('<command>')
  .addHelpText(
    'after',
    `\n Run ${chalk.blue(
      'webpack-generator <command> --help',
    )} for detailed of given command \n`,
  );

program
  .command('create <app-name>')
  .description('create a new webpack project')
  .action((appName) => init(appName));

program.parse(process.argv);
