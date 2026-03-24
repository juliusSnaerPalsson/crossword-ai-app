const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.post('/generate', async (req, res) => {
  try {
    const { theme } = req.body;
    if (!theme) return res.status(400).json({ error: 'Missing theme' });



const prompt = `Create a small themed crossword puzzle for the theme: "${theme}". Return valid JSON with:
{
  "title": "string",
  "size": number,
  "grid": ["string", ...], // use '.' for empty cells
  "clues": {
    "across": [{"num": number, "clue": "string", "answer": "string"}],
    "down": [{"num": number, "clue": "string", "answer": "string"}]
  }
}
Keep it short and return only JSON.`;



const completion = await openai.createChatCompletion({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: prompt }],
  max_tokens: 800,
  temperature: 0.7,
});

const text = completion.data.choices[0].message.content;
let data;
try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }

res.json({ ok: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(API listening on ${PORT}));
