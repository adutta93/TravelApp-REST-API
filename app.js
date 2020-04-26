const fs = require('fs')
const express = require('express');

const app = express();
const port = process.env.port || 88;

const tourJson = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.use(express.json());


// to get all the tour details
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tourJson.length,
        data : {
            tours: tourJson
        }
    })
})


// to get a single tour details by ID
app.get('/api/v1/tours/:id', (req, res) => {
    // console.log(req.params);
    const id = req.params.id * 1;
    const tour = tourJson.find(element => element.id === id);

    if(!tour){
        return res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        })
    }  
    res.status(200).json({
        status: 'success',
        data : {
            tours: tour
        }
    })
})

// to add new tours
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
        })
    })
    
});

// update a tour
app.patch('/api/v1/tours/:id', (req, res) => {

    if (req.params.id * 1 > tourJson.length){
        return res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    };  

    res.status(200).json({
        message: 'success',
        data: {
            tour: '<Updated Tour!>'
        }
    });
});
  

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

