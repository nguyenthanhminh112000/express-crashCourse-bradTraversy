////////////////////////////////IMPORT AND READ FILE
const express = require('express');
const path = require('path');
const logger = require('./middleware/logger.js');
const apiRouter = require('./routes/api/users.js');
const exphbs = require('express-handlebars');
const users = require('./Users');
////////////////////////////////// create a Web Server
const app = express();
const PORT = process.env.PORT || 5000;

// /////////////////////////////////////SET UP MIDDLEWARE
// app.use(logger);
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//////////////////////////////////////SET UP ROUTES
// //SET UP FOR STATIC RESOURCES
// app.use(express.static(path.join(__dirname, 'public')));
//  SET UP API ROUTER
app.use('/api/users/', apiRouter);
// SET ROUTE FOR SEVER-SIDE APP
app.get('/', (req, res) => {
  res.render('index', { title: 'Nguyen Thanh Minh', users });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'Nguyen Thanh Dat' });
});
/////////////////////////////App running
app.listen(PORT, () => {
  console.log('Server running on port 5000');
});
