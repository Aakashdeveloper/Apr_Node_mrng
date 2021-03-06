import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';

const app = express();
const port = 7600;

// Static file path
app.use(express.static(__dirname+'/public'));
// Html or view file
app.set('views','./src/views');
// template engine
app.set('view engine','ejs');
app.use(morgan('tiny'))

const menu = [
        {link:'/',name:'Home'},
        {link:'/movies',name:'Movies'},
        {link:'/restaurants',name:'Restaurants'}
    ];

const moviesRouter = require('./src/routes/moviesRouter')(menu);
const restaurantRouter = require('./src/routes/restaurantsRouter')(menu);

app.get('/',(req,res) => {
    res.render('index',{
                title:'Home Page',
                menu:menu})
});


app.use('/movies',moviesRouter);
app.use('/restaurants',restaurantRouter)

app.listen(port,(err)=>{
    console.log(`${chalk.blue(`server is running on port ${port}`)}`)
});
