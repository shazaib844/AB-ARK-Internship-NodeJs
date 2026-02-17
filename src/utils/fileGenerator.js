const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../large.txt");

function generateLargeFile() {
  const writeStream = fs.createWriteStream(filePath);

  for (let i = 0; i < 1_000; i++) {
    writeStream.write(`This is line number ${i}\n`);
  }

  writeStream.end();
}

module.exports = {
  generateLargeFile,
  filePath,
};
