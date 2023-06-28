const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/quotes', async (req, res) => {
  try {
    const title = req.query.title;
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: `quotes about ${title}`,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const quotes = response.data.choices[0].text.trim();
    res.json({ quotes });
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
