const fs = require('fs')
const express = require('express');

const app = express();
const port = process.env.port || 88;

const tourJson = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tourJson.length,
        data : {
            tours: tourJson
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

