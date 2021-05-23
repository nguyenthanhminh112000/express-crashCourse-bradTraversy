const express = require('express');
const path = require('path');
const logger = require('./middleware/logger.js');
const users = require('./Users.js');
const apiRouter = require('./routes/api/users.js');
const staticRouter = require('./routes/static/static.js');
// create a Web Server
const app = express();
const PORT = process.env.PORT || 5000;

// //set up middleware
// app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set up the static resources
app.use(express.static(path.join(__dirname, 'public')));
//set up routes
app.use('/api/users/', apiRouter);
app.use('/', staticRouter);

/////////////////////////////App running
app.listen(PORT, () => {
  console.log('Server running on port 5000');
});
