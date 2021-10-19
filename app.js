const express = require('express');
const path = require('path');
const morgan =  require('morgan')
const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(require('./path/rutas'))
app.use=((err,req,res,next)=>{
    res.send({err:err.message})
})

//sesion si se usa

//servidor

app.set('port', process.env.PORT || 3000);

app.listen(app.get("port"),()=>{
    console.log(`En el servidor ${app.get('port')}`)
})
