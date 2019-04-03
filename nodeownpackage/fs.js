var fs = require('fs');
// import fs from 'fs';

/*fs.writeFile('mytext.txt',"welcome here",function(err){
    if(err){
        throw err;
    }else{
        console.log("wirting in file")
    }
})*/

fs.appendFile('mytext.txt',"welcome here1\n",(err) =>{
    if(err) throw err;
    console.log("wirting in file")
})

