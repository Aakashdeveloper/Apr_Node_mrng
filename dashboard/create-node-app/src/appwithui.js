import express from 'express';
import mongo from 'mongodb'
const MongoClient = mongo.MongoClient;
import bodyParser from 'body-parser';
const app = express();
const port = 7600;
let db;
const mongoUrl = 'mongodb://127.0.0.1:27017/'
const col_name = 'userlist'

app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');
app.set('views', './src/views')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//Getting Data
app.get('/',(req,res) => {
    db.collection(col_name).find().toArray((err,result) => {
        if(err) throw err;
        res.render('index',{data:result})
    })
})

// Adding Data
app.post('/addUser',(req,res) => {
    db.collection(col_name)
        .insert(req.body,(err,result)=>{
            if(err) throw err;
            console.log('data inserted')  
        })
    res.redirect('/');
})
// For user detail
app.post('/find_by_name',(req,res) => {
    let name = req.body.name;
    db.collection(col_name)
    .find({name:name})
    .toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// Update Data
app.put('/update_user',(req,res) => {
    db.collection(col_name)
        .findOneAndUpdate({"name":req.body.name},{
            $set:{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone
                }
            },
            {
                upsert:true
            },(err,result) => {
                if(err) throw err;
                res.send(result)
            })
})

//Delete Data
app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).findOneAndDelete({
        "name":req.body.name
    },(err,result) => {
        if(err) return res.send(500,err)
        res.send({"message":"deleted"})
    })
})

app.get('/new',(req,res) => {
    res.render('admin')
})


MongoClient.connect(mongoUrl,(err,client) =>{
    if(err) throw err;
    db = client.db('apr_dashboard');
    app.listen(port,(err)=>{
        console.log(`server is running on port ${port}`)
    });
})

