const ShortUrl = require("../models/shortUrl");
const { StatusCodes } = require("http-status-codes");

const index = async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.status(StatusCodes.OK).render("index", { shortUrls: shortUrls });
};

const createUrl = async (req, res) => {
  const { fullUrl } = req.body;
  const shortUrl = await ShortUrl.create({ full: fullUrl });
  res.status(StatusCodes.OK).redirect("/");
};

const getUrl = async (req, res) => {
  const { shortUrl } = req.params;
  console.log(shortUrl);
  const shorterUrl = await ShortUrl.findOne({ short: shortUrl });
  if (shorterUrl === null) {
    return res.status(StatusCodes.NOT_FOUND).send(`
    <p>Short Url : ${shortUrl.short} not found...<p>
    <a href="/">Click Homa page</a>
    `);
  }
  shorterUrl.clicks++;
  shorterUrl.save();
  res.redirect(shorterUrl.full);
};
const deleteUrl = async (req, res) => {
  const { id: urlId } = req.params;
  console.log(urlId);
  if (!urlId) {
    return;
  }
  const shorterId = await ShortUrl.findByIdAndDelete({ _id: urlId });
  if (!shorterId) {
    return res.status(StatusCodes.NOT_FOUND).redirect("/");
  }
  res.redirect("/");
};
module.exports = { createUrl, getUrl, index, deleteUrl };
