require('dotenv').config();
const app = require('./app');

//app.use(dbmodel);
// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
