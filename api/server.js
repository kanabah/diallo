const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
https = require('https'),
fs = require('fs'),
helmet = require("helmet"),
mongoose = require('mongoose'),
config = require('./DB');

const app = express();
app.use(express.static(path.join(__dirname, '')));

//======================START ROUTES================
const userRoutes = require('./routes/user.route');
const clientRoutes = require('./routes/client.route');
const promoteurRoutes = require('./routes/promoteur.route');
const guichetRoutes = require('./routes/guichet.route');
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
app.use('/promoteurs', promoteurRoutes);
app.use('/guichets', guichetRoutes);

app.get('/', (request, response) => response.send("Welcome to sogma API"));

// const port = process.env.PORT || 5202;
const port = process.env.PORT || 4001;

app.listen(port, () => console.log('Listen Server in port ', port));

// https.createServer(options, app).listen(port, function(){
//   console.log('Listening on port ' + port);
// });