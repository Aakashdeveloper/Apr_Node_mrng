import express from 'express';
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

app.get('/movies',(req,res) => {
   res.render('movies',{
                title:'Movies Page',
                menu:menu})
});

app.get('/details',(req,res) => {
    res.render('movies_details',{
                 title:'Movie Details',
                 menu:menu})
 });

app.get('/restaurants',(req,res) => {
    res.render('restaurants',{
        title:'Restaurants Page',
                menu:menu
    })
})

app.get('/details',(req,res) => {
    res.render('restaurants_details',{
                 title:'Restaurants Details',
                 menu:menu})
 });


app.listen(port,(err)=>{
    console.log(`server is running on port ${port}`)
});
