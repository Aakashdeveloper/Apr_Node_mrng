import express from 'express';
const app = express();
const port = 7600;
import mongoConnect from './database/mongoConnect';

app.post('/addData',(req,res) => {
    var myData = {"name":"john","email":"j@j.com"}
    mongoConnect.prototype.postData('user',myData)
});

app.get('/',(req,res) => {
    let out = mongoConnect.prototype.getData('user');
    res.send(out)
});


app.listen(port,(err)=>{
    console.log(`server is running on port ${port}`)
});
