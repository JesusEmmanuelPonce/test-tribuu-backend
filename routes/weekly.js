const express = require("express");
const { getDays, saveDate } = require("../controllers/weekly");

const router = express.Router();

router.post("/weekly", getDays);
router.post("/save-weekly", saveDate);

module.exports = router;