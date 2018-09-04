const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');


let app = express();
let port = process.env.PORT || 3000;

//parses the body parameters
let urlencodedParser = bodyParser.urlencoded({
    extended: false
});

//register the directory templates of Handlebars
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//defines the 'root' directory for public files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.hbs');
} );

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});