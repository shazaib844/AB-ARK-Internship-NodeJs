const express = require("express");
const { streamFile } = require("../controllers/file.controller");

const router = express.Router();

router.get("/", streamFile);

module.exports = router;
