const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const compression = require('compression');

//port config
let port = process.env.PORT || 3000;
let app = express();

//parses the body parameters
let urlencodedParser = bodyParser.urlencoded({
    extended: false
});

//register the directory templates of Handlebars
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//use Gzip to compress files
app.use(compression());
//defines the 'root' directory for public files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=604800');
    next();
});

app.get('/', (req, res) => {
    res.render('index.hbs');
} );

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});