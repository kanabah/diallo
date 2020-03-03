const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
https = require('https'),
fs = require('fs'),
helmet = require("helmet"),
mongoose = require('mongoose'),
config = require('./DB');

var privateKey  = fs.readFileSync('/home/abfgrup/ssl/keys/c8623_ee753_d616ac42867c5843a60743bca9679c69.key', 'utf8');
var certificate = fs.readFileSync('/home/abfgrup/ssl/certs/abf_grup_com_c8623_ee753_1590600121_4be0e232f39ea057c10617c6d1bce4aa.crt', 'utf8');

var privateKey  = fs.readFileSync('/etc/apache2/conf.d/ssl.key/server.key', 'utf8');
var certificate = fs.readFileSync('/etc/apache2/conf.d/ssl.crt/server.crt', 'utf8');

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

app.get('/', (request, response) => response.send("Welcome to sogma API"));

const port = process.env.PORT || 5202;

const options = {
  key: privateKey,
  cert: certificate
};

https.createServer(options, app).listen(port, function(){
  console.log('Listening on port ' + port);
});