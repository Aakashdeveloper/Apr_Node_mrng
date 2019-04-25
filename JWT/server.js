var app = require('./app');
var port = 5000;

app.listen(port,()=> {
    console.log('Express server listing on port'+ port)
})