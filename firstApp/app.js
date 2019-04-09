import express from 'express';
const moviesRouter = express.Router();
const restaurantRouter = express.Router();
const app = express();
const port = 7600;

// Static file path
app.use(express.static(__dirname+'/public'));
// Html or view file
app.set('views','./src/views');
// template engine
app.set('view engine','ejs');

const menu = [
        {link:'/',name:'Home'},
        {link:'/movies',name:'Movies'},
        {link:'/restaurants',name:'Restaurants'}
    ];

app.get('/',(req,res) => {
    // res.send('<h1>On home page</h1>')
    res.render('index',{
                title:'Home Page',
                menu:menu})
});


app.use('/movies',moviesRouter);
app.use('/restaurants',restaurantRouter)

app.listen(port,(err)=>{
    console.log(`server is running on port ${port}`)
});
