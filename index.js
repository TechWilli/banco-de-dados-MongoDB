// cabeçalho padrao para acessar o MongoBD
// basicamente um ctrl c e v nesse cabeçalho nas aplicações em Mongo

const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');

const app = express();

app.use(expressMongoDb('mongodb://localhost/churros'));
app.use(bodyParser.json());

app.get('/churros', (req, res) => {
    req.db.collection('sabores').find().toArray((err, data) => {
        if(err){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }
        
        res.send(data);
    });     
});

app.post('/churro', (req, res) => {
    req.db.collection('sabores').insert(req.body, (err) => {
        if(err){
            res.status(500).send('Erro ao acessar o banco de dados');
            return;
        }
        res.send(req.body);
    });     
});

app.listen(3000);