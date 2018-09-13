const hbs = require('hbs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const marvelAPI = require('marvel-api');
//file with the keys to Marvel API
const keys = require('./keys.json');
const noImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';

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

//does the character search 
app.get('/search', urlencodedParser, (req, res) => {
    // starts the Marvel API
    let Marvel = marvelAPI.createClient({
        publicKey: keys.public_key,
        privateKey: keys.private_key
    });
    //get the value of the query
    let query = req.query;
    
    //do the request to find the user
    Marvel.characters.findNameStartsWith(query.hero)
        .then((result) => {
            res.render('search.hbs', {
                data : result.data
            });
        })
        .fail((error) => {
            console.log('Not able to retrieve the result');
        });
    
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});