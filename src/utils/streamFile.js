import fs from "fs";
import path from "path";

/**
 * Streams a file to the response safely
 * @param {string} filePath
 * @param {object} res - Express response
 */
export const streamFile = (filePath, res) => {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  let fileName = path.basename(absolutePath);

  fileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");

  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.setHeader("Content-Type", "application/octet-stream");

  const readStream = fs.createReadStream(absolutePath);
  readStream.pipe(res);
};
