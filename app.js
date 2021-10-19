const express = require('express');
const path = require('path');
const morgan =  require('morgan')
const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"public"))