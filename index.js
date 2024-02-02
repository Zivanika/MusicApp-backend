const express = require("express");
const cors = require("cors");
const Genius = require("genius-lyrics");
const app = express();
app.use(cors());
app.use(express.json())

app.post("/api/lyrics", async (req, res) => {
  const { track } = req.body;
  if (!track) {
    return res
      .status(400)
      .json({ error: "Missing artist or track parameters" });
  }

  try {
    const Client = new Genius.Client("gRnO96N8pwgpac_3wjeqJ6fqVOkRmHaNhPMMjczBgtGcaIkfvF754n4O4urGlKCq");
    const searches = await Client.songs.search(track);

    // Pick first one
    const firstSong = searches[0];
    // console.log("About the Song:\n", firstSong, "\n");

    const lyrics = await firstSong.lyrics();
    // console.log("Lyrics of the Song:\n", lyrics, "\n");
    res.json(lyrics);
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[+] Listening on port: ${PORT}`);
});
