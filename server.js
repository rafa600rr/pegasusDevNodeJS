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

    nodeFetch('http://localhost:3000/sistemaSolar', {method:"GET"})
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
        'natureza':starNature,
        'nome':starName,
        'temperatura':starTemperature,
        'orbita':starOrbit,
        'distancia':starDistance,
        'atsmofera':starAtsmophere,
        'compossicao':starComposition,
    };

    nodeFetch('http://localhost:3000/sistemaSolar',{
        method:"POST",
        body: JSON.stringify(registerSistem),
        headers: {'Content-Type' : 'application/json'}
    })

    .then(res.redirect('/registerAPI'));

})

app.get('/removeAPI', (req, res) => {

    nodeFetch('http://localhost:3000/sistemaSolar', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('removeAPI', {list:listSistem}));

});

app.get('/remove/:id', (req, res) => {

    let id = req.params.id;

    nodeFetch('http://localhost:3000/sistemaSolar/'+id, {
        method:"DELETE",
        headers: {'Content-Type' : 'application/json'}
    })

    .then(res.redirect('/removeAPI'));

});

app.get('/editAPI', (req, res) => {

    nodeFetch('http://localhost:3000/sistemaSolar', {method:"GET"})
    .then(jsonBody => jsonBody.json())
    .then(listSistem => res.render('editAPI', {list:listSistem}));

});

app.get('/edit/:id', (req, res) => {
    let id = req.params.id;

    nodeFetch('http://localhost:3000/sistemaSolar/'+id, {method:"GET"})
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
        'natureza':starNature,
        'nome':starName,
        'temperatura':starTemperature,
        'orbita':starOrbit,
        'distancia':starDistance,
        'atsmofera':starAtsmophere,
        'compossicao':starComposition,
        'id':id,
    };

    nodeFetch('http://localhost:3000/sistemaSolar/'+id,{
        method:"PUT",
        body: JSON.stringify(registerSistem),
        headers: {'Content-Type' : 'application/json'}
    })

    .then(res.redirect('/editAPI'));

});

// SERVER
app.listen(8080);