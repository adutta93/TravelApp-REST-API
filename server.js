const app = require('./app')

const port = process.env.port || 88; 
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
