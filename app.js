const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;
app.set('port', PORT);

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', true);
        return res.status(200).json({});
    }
    next();
    });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get('/Map/RequestRetailersNearBy', async (req, res) => {
    const { maplat, maplng } = req.query;
    const url = `https://retailers.hemamaps.com/Map/RequestRetailersNearBy?maplat=${maplat}&maplng=${maplng}`;
    const response = await fetch(url);
    let data = await response.json();
    data = JSON.parse(data);
    console.log(data)

    res.json({ data })
});

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT: ${PORT}`));