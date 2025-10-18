const express = require("express");
const { connectToMongoDb } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

const cors = require("cors");
app.use(cors());


connectToMongoDb("mongodb+srv://stuntersingh81:stunter@stunter.zu3siu2.mongodb.net/urlShortener?retryWrites=true&w=majority&appName=stunter").then(() =>
  console.log("connected to database successfully")
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp:Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL)
});

app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
