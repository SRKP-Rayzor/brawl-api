
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjFhYTdmMjhmLTRjOTYtNDVlNy1iOGVkLWY2MGFmNDI1YTUyMSIsImlhdCI6MTc0ODY3OTE1NCwic3ViIjoiZGV2ZWxvcGVyLzEyN2M0OTQzLWI3MTEtNDlhYy03ZDEzLTQ0OTYzNTUxYTNlMCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTEuMTc0LjI0OS42NSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.sxUTj1w_-gW2SR0fjAIxcbjxpiJEitVdELXF5GqGQWEdaLf_cJ2wWvJgMM4aH7c_L1m1fmSSBTYrZjNdYWaK6w"; // remplace ceci

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