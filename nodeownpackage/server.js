const http = require('http');

let server = http.createServer(function(req,res){
    res.write("<h1>Coming from Nodemon Application</h1>");
    res.end();
})

server.listen(3400);

