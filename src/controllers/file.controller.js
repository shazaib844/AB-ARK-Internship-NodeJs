const fs = require("fs");
const { getFilePath } = require("../models/file.model");

function streamFile(req, res) {
  const path = getFilePath();

  const readStream = fs.createReadStream(path);


  res.setHeader("Content-Type", "text/plain");

  readStream.pipe(res);

  readStream.on("error", (err) => {
    res.status(500).send("Error reading file");
  });
}

module.exports = {
  streamFile,
};
