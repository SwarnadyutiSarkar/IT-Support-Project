const express = require('express');
const ping = require('ping');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/ping', async (req, res) => {
    const { host } = req.body;
    try {
        const result = await ping.promise.probe(host);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error pinging the host' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
