const fs = require('fs');
const readline = require('readline')
const ACCESS_LOG = './access.log';
const file_3448 = './34.48.240.111_requests.log';
const file_89123 = './89.123.1.41_requests.log';

const writeInFile_3448 = fs.createWriteStream(file_3448)
const writeInFile_89123 = fs.createWriteStream(file_89123)

const readStream = fs.createReadStream(ACCESS_LOG, 'utf8');

const dataFlow = readline.createInterface({
  input: readStream,
  terminal: true,
});


dataFlow.on('line', (line) => {
  if (line.includes("34.48.240.111")) {
    writeInFile_3448.write(line + "\n")
  }
  if (line.includes("89.123.1.41")) {
    writeInFile_89123.write(line + "\n")
  }
});