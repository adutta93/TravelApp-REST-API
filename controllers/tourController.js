const fs = require('fs')

const tourJson = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt : req.requestTime,
        results: tourJson.length,
        data : {
            tours: tourJson
        }
    });
};

// to get a single tour details by ID
exports.getTour = (req, res) => {
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
    });
};

// to add new tours
exports.addTour = (req, res) => {
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
    });
    
};

// to update a tour
exports.updateTour = (req, res) => {

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
};

// to delete a tour
exports.deleteTour = (req, res) => {

    if (req.params.id * 1 > tourJson.length){
        return res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    };  

    res.status(204).json({
        message: 'success',
        data: null
    });
};