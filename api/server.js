const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./DB');

const app = express();
app.use(express.static(path.join(__dirname, '')));
// app.use(express.static(__dirname+'/images'));
// var logger = require('morgan');  
// var cookieParser = require('cookie-parser');
var passport = require('passport');

//======================START ROUTES================
const userRoutes = require('./routes/user.route');
const clientRoutes = require('./routes/client.route');
//======================END ROUTES================

mongoose.Promise = global.Promise;
mongoose.connect(config.DBDEV, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => console.log('Database is connected'),
  err => console.log('Can not connect to the database'+ err)
);

app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/clients', clientRoutes);

const port = process.env.PORT || 5202;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});