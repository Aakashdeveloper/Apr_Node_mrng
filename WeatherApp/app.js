import express from 'express';
import request from 'request';
const app = express();
const port = 7600;

const WeatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?id=5308655&appid=fbf712a5a83d7305c3cda4ca8fe7ef29&cnt=5"

app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

app.get('/',(req,res) => {
    request(WeatherUrl,(err,response,body) => {
        if(err) throw err
        const output = JSON.parse(body)
        console.log(output)
        res.render('weatherViews',{output:output,
            title:'****Weather App***'})
    })
});


app.listen(port,(err)=>{
    console.log(`server is running on port ${port}`)
});
