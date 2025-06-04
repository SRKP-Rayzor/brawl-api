
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

const API_TOKEN = API_TOKEN.env;

app.use(cors());

app.get("/player/:tag", async (req, res) => {
  const tag = req.params.tag;
  try {
    const response = await axios.get(`https://api.brawlstars.com/v1/players/${tag}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).send("Erreur API : " + (err.response?.data?.message || err.message));
  }
});

app.get('/players/:tag/battlelog', async (req, res) => {
  const tag = req.params.tag.replace("#", "%23");
  try {
    const response = await axios.get(`https://api.brawlstars.com/v1/players/${tag}/battlelog`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/clubs/:tag', async (req, res) => {
  const tag = req.params.tag.replace("#", "%23");
  try {
    const response = await axios.get(`https://api.brawlstars.com/v1/clubs/${tag}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/events/rotation', async (req, res) => {
  try {
    const response = await axios.get(`https://api.brawlstars.com/v1/events/rotation`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy en écoute sur http://localhost:${port}`);
});
