
const { nanoid } = require("nanoid"); // for generating short unique IDs
const Url = require("../models/url"); // import your mongoose model

async function handleGenerateShortUrl(req, res) {
  try {
    const { url } = req.body;

    // Validation
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
    // Generate unique short ID (6 chars long)
    const shortId = nanoid(6);
    console.log(shortId)

    // Save to MongoDB
    const newurl=await Url.create({
      shortId: shortId,
      redirectURL: url,
      visitHistory: [],
    });

    // Return the shortened URL
    return res.json({
      id: shortId,
      shortUrl: `http://localhost:8001/${shortId}`,
    });

  } catch (err) {
    console.error("Error generating short URL:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { handleGenerateShortUrl };
