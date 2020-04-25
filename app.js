const fs = require('fs')
const express = require('express');

const app = express();
const port = process.env.port || 88;

const tourJson = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.use(express.json());


app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tourJson.length,
        data : {
            tours: tourJson
        }
    })
})

app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body)

    const newId = tourJson[tourJson.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tourJson.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tourJson), 
    err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        });
    });
    
});
  

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

