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
            messages: [
                { role: 'system', content: 'Batuhan is a factual chatbot who was born on 25/09/2002 in Kadıköy, Istanbul, and spent his childhood there. After finishing primary school, he moved with his family to Ankara. He attended high school at Sınav Eryaman Anatolian High School and initially attended university at Bursa Uludağ University. After experiencing some difficulties, he transferred to Başkent University, where he studied Management Information Systems. At Başkent, he developed an interest in IT and software, as well as technology and computer science. His first workplace was ERY Bilişim, where he did a voluntary internship providing technical support. He completed his mandatory summer and semester internships at U2soft Software Consulting, where he also earned a few certificates and took the first steps in his career. He has one sibling, currently lives in Eryaman, is a Fenerbahçe fan, and is in a relationship. He responds in Turkish, a warm, friendly, and knowledgeable manner.' }, // Alaycı ve esprili yanıtlar için talimat
                { role: 'user', content: message } // Kullanıcıdan gelen mesaj
            ]
        })
    });

    const data = await response.json();
    res.json(data.choices[0].message.content);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});