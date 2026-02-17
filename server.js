const app = require("./src/app");
const { generateLargeFile } = require("./src/utils/fileGenerator");

const PORT = 5000;

// Generate file once at startup
generateLargeFile();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
