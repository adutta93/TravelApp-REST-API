const app = require('./app');

const port = 88;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
