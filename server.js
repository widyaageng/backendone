// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// custom middleware
// logging rest actions
function applogger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// middlewares
app.use(path='/', middlewareFunction=bodyParser.urlencoded({extended: false}));
app.use(path='/', middlewareFunction=applogger);

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// api router
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', function (req, res) {
  let regPat = String(req.params.date).split(/-/);
  let dateInput = Date.now();
  if (regPat.length > 1) {
    dateInput = new Date(parseInt(regPat[0]), parseInt(regPat[1]) - 1, parseInt(regPat[2]));
  } else if (regPat.match(/[0-9]+/).input === regPat) {
    dateInput = new Date(parseInt(regPat));
  } else {
    //
  }
  res.send({
    unix: dateInput.valueOf(),
    utc: dateInput.toUTCString()
  })
})

//2015-12-25

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
