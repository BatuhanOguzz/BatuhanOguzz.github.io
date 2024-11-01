import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const message = req.body.message;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        })
    });

    const data = await response.json();
    res.json(data.choices[0].message.content);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});