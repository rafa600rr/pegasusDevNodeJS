const express = require("express");
const exHandlebars = require("express-handlebars");
const bodyParser  = require("body-parser");
const nodeFetch = require("node-fetch");
const { json } = require("body-parser");

const app = express();

//ORGANOZATION WICH HANDLEBARS
app.engine('handlebars', exHandlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// DIRECTORY PUBLIC
app.use(express.static(__dirname + '/public'));

// MANIPULATION / JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// ROTES
app.get('/inicio', (req, res) =>{

    res.render('index');
});

app.get('/contato', (req, res) =>{

    res.render('contact');
});

app.get('/sobre', (req, res) =>{

    res.render('about');
});

app.get('/login', (req, res) =>{

    res.render('login');
});

app.get('/apiSW', (req, res) =>{

    res.render('apiSW');
});

app.get('/registerAPI', (req, res) =>{

    res.render('registerAPI');
});

app.get('/listAPI', (req, res) => {

    nodeFetch('http://54.207.196.78:4432/sistemSolar', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('listAPI', {list:listSistem}));

});

app.post('/register', (req, res) => {

    let starNature = req.body.starNature;
    let starName = req.body.starName;
    let starTemperature = req.body.starTemperature;
    let starOrbit = req.body.starOrbit;
    let starDistance = req.body.starDistance;
    let starAtsmophere = req.body.starAtsmophere;
    let starComposition = req.body.starComposition;

    let registerSistem = {
        'starNature':starNature,
        'starName':starName,
        'starTemperature':starTemperature,
        'starOrbit':starOrbit,
        'starDistance':starDistance,
        'starAtsmophere':starAtsmophere,
        'starComposition':starComposition,
    };

    nodeFetch('http://54.207.196.78:4432/sistemSolar',{
        method:"POST",
        body: JSON.stringify(registerSistem),
        headers: {'Content-Type' : 'application/json'}
    })

    .then(res.redirect('/registerAPI'));

})

app.get('/removeAPI', (req, res) => {

    nodeFetch('http://54.207.196.78:4432/sistemSolar', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('removeAPI', {list:listSistem}));

});

app.get('/remove/:id', (req, res) => {

    let id = req.params.id;

    nodeFetch('http://54.207.196.78:4432/sistemSolar/'+id, {
        method:"DELETE",
        headers: {'Content-Type' : 'application/json'}
    })

    .then(res.redirect('/removeAPI'));

});

app.get('/editAPI', (req, res) => {

    nodeFetch('http://54.207.196.78:4432/sistemSolar', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('editAPI', {list:listSistem}));

});

app.get('/edit/:id', (req, res) => {
    let id = req.params.id;

    nodeFetch('http://54.207.196.78:4432/sistemSolar/'+id, {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('edit', {list:listSistem}));

});

app.post('/actualize', (req, res) => {

    let starNature = req.body.starNature;
    let starName = req.body.starName;
    let starTemperature = req.body.starTemperature;
    let starOrbit = req.body.starOrbit;
    let starDistance = req.body.starDistance;
    let starAtsmophere = req.body.starAtsmophere;
    let starComposition = req.body.starComposition;
    let id = req.body.id;

    let registerSistem = {
        'starNature':starNature,
        'starName':starName,
        'starTemperature':starTemperature,
        'starOrbit':starOrbit,
        'starDistance':starDistance,
        'starAtsmophere':starAtsmophere,
        'starComposition':starComposition,
        'id':id,
    };

    nodeFetch('http://54.207.196.78:4432/sistemSolar/'+id,{
        method:"PUT",
        body: JSON.stringify(registerSistem),
        headers: {'Content-Type' : 'application/json'}
    })

    .then(res.redirect('/editAPI'));

});

// API REQUIREMENT STAR WARS - PLEOPLE
app.get('/swPeople', (req, res) => {

    nodeFetch('https://swapi.dev/api/people', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('swPeople', {list:listSistem}));

});

// API REQUIREMENT STAR WARS - PLANETS
app.get('/swPlanets', (req, res) => {

    nodeFetch('https://swapi.dev/api/planets/', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('swPlanets', {list:listSistem}));

});

// API REQUIREMENT STAR WARS - STARSHIPS
app.get('/swStarships', (req, res) => {

    nodeFetch('https://swapi.dev/api/starships/', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('swStarships', {list:listSistem}));

});

// API REQUIREMENT STAR WARS - FILMS
app.get('/swFilms', (req, res) => {

    nodeFetch('https://swapi.dev/api/starships/', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('swFilms', {list:listSistem}));

});

// API REQUIREMENT STAR WARS - SPECIES
app.get('/swSpecies', (req, res) => {

    nodeFetch('https://swapi.dev/api/starships/', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('swSpecies', {list:listSistem}));

});

// API REQUIREMENT STAR WARS - VEHICLES
app.get('/swVehicles', (req, res) => {

    nodeFetch('https://swapi.dev/api/vehicles/', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('swVehicles', {list:listSistem}));

});

// SERVER
app.listen(4431);