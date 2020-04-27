const fs = require('fs')
const express = require('express');
const morgan = require('morgan')

const app = express();



// MIDDLEWARE(ALL)
app.use(morgan('dev'))
const tourJson = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.use(express.json());

const userJson = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`));
app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})


//HANDLER FUNCTION(ALL)

// HANDLER FUNCTIONS FOR TOURS
// to get all the tour details
const getAllTours = (req, res) => {
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
const getTour = (req, res) => {
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
const addTour = (req, res) => {
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
const updateTour = (req, res) => {

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
const deleteTour = (req, res) => {

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

// HANDLE FUNCTIONS FOR USERS

// to get all the user details
const getAllUsers = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt : req.requestTime,
        results: userJson.length,
        data : {
            users: userJson
        }
    });
};

// to get a single user details by ID
const getSingleUser = (req, res) => {
    // console.log(req.params);
    const userId = req.params.id * 1;
    const user = userJson.find(element => element.id === userId);

    if(!user){
        return res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        })
    }  
    res.status(200).json({
        status: 'success',
        data : {
            users: user
        }
    });
};


// to add new user
const createUser = (req, res) => {
    // console.log(req.body)

    const newUserId = userJson[userJson.length - 1].id + 1;
    const newUser = Object.assign({id: newUserId}, req.body);

    userJson.push(newUser);

    fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(userJson), 
    err => {
        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        })
    });
    
};

// to update a user
const updateUser = (req, res) => {

    if (req.params.id * 1 > userJson.length){
        return res.status(404).json({
            status: "Failed",
            message: "Invalid ID"
        });
    };  

    res.status(200).json({
        message: 'success',
        data: {
            user: '<User Updated..>'
        }
    });
};

// to delete an user
const deleteUser = (req, res) => {

    if (req.params.id * 1 > userJson.length){
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

//ROUTES(ALL)

// for tours
app.route('/api/v1/tours')
.get(getAllTours)
.post(addTour)

app.route('/api/v1/tours/:name')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)


// for users
app.route('/api/v1/users')
.get(getAllUsers)
.post(createUser)

app.route('/api/v1/users/:id')
.get(getSingleUser)
.patch(updateUser)
.delete(deleteUser)


// START SERVER
const port = process.env.port || 88; 
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

