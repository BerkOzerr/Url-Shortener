const express = require("express");
const { createUrl, getUrl, index, deleteUrl } = require("../controllers/url");
const router = express.Router();

router.route("/").get(index);
router.route("/shortUrls").post(createUrl);
router.route("/:shortUrl").get(getUrl);
router.route("/del/:id").get(deleteUrl);
module.exports = router;
