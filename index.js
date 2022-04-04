const fsp = require('fs').promises;
const {
  lstatSync
} = require('fs');
const inquirer = require('inquirer');
const yargs = require('yargs');
const path = require('path');
const colors = require('colors')
let currentDirectory = process.cwd();
const options = yargs
  .positional('d', {
    describe: 'Path to directory',
    default: process.cwd(),
  })
  .positional('s', {
    describe: 'Match string',
    default: '',
  }).argv;

class FileItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }

  get isDir() {
    return lstatSync(this.path).isDirectory();
  }
}

const run = async () => {
  const list = await fsp.readdir(currentDirectory);
  const items = list.map(fileName =>
    new FileItem(path.join(currentDirectory, fileName), fileName));

  const item = await inquirer
    .prompt([{
      name: 'fileName',
      type: 'list',
      message: `Choose: ${currentDirectory}`,
      choices: items.map(item => ({
        name: item.fileName,
        value: item
      })),
    }])
    .then(answer => answer.fileName);

  if (item.isDir) {
    currentDirectory = item.path;
    return await run();
  } else {
    const data = await fsp.readFile(item.path, 'utf-8');

    if (options.s == null) console.log(data);
    else {
      const regExp = new RegExp(options.s, 'igm');
      console.log(colors.green(data.match(regExp)));
    }
  }
}

run();