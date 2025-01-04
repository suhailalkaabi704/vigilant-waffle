const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    try {
        const response = await fetch(url);
        const data = await response.text();
        res.send(data);
    } catch (error) {
        res.status(500).send('Error loading content');
    }
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
