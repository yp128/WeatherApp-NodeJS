const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoMap = require('./utilities/geoMap')
const  weatherRequest = require('./utilities/weather');
const { response, query } = require('express');

const app = express();
const port = process.env.PORT || 3000;

const publicViewPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicViewPath));
app.get('/home',(req,res) => {
    res.render('index',{
        authorName: 'Yash Patel'
    });
})

app.get('/weather',(req,res) => {
    if(!req.query.city){
        return res.send({
            error: 'please enter city name..'
        });
    }else{
        geoMap(req.query.city,(error, {lat, long, location}) => {
            if(error){
                return res.send({error});
            }else{
                weatherRequest(long,lat,(error,{ temperature, weatherCondition, precip}) => {
                    if(error){
                        return res.send({error})
                    }else{
                        res.send({
                            location,
                            temperature,
                            weatherCondition,
                            precip
                        })
                    }
                })
            }
        })
    }
       
})

app.get('',(req,res) => {
    res.redirect('/home')
})

app.get('*',(req,res) => {
    res.send("some thing is wrong");
})



app.listen(port,() => {
    console.log("listening on port " + port);
})