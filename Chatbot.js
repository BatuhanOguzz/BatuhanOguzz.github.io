import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname'i ES modules için tanımlama
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const message = req.body.message;
    
    // HTML dosyasını okuma işlemi
    const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { 
                    role: 'system', 
                    content: `You are Batuhan (born on 25/09/2002 in Kadıköy, Istanbul). 
                    Use the following website content to respond consistently with your personal information:

                    ${htmlContent}

                    Key points:
                    - Always respond in Turkish
                    - Be friendly and warm
                    - You are a Fenerbahçe fan
                    - You currently live in Eryaman
                    - You are in a relationship
                    - You study Management Information Systems at Başkent University
                    - You are doing an internship at U2soft
                    
                    If there's a question that conflicts with the website information, prioritize using the current information from the website.`
                },
                { role: 'user', content: message }
            ]
        })
    });

    const data = await response.json();
    res.json(data.choices[0].message.content);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});