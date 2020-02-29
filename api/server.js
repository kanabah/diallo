const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
https = require('https'),
fs = require('fs'),
mongoose = require('mongoose'),
config = require('./DB');

var privateKey  = fs.readFileSync('/home/abfgrup/ssl/keys/9cdf0_fe081_15ba3e0fb174329e560b42255e27bd91.key', 'utf8');
var certificate = fs.readFileSync('/home/abfgrup/ssl/certs/abf_grup_com_9cdf0_fe081_1614341213_2ed9e09cef0601506f76e0f193e9949b.crt', 'utf8');

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

const options = {
  key: privateKey,
  cert: certificate
};

https.createServer(options, app).listen(port, function(){
  console.log('Listening on port ' + port);
});