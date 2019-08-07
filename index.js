const express = require('express');
var router = require('./router')

var app = express()

app.use(express.static(__dirname + "/public"));

app.listen(3000, () => console.log('hello bitches'));