var path = require('path');
var url = require('url');
var util = require('util');

var outurl = url.parse('https://ngapi4.herokuapp.com/api/getProducts')
var outurl1 = url.parse('http://localhost:3000/api')
var allurl = [outurl,outurl1]
//console.log(outurl,outurl1)
for(var i =0; i<allurl.length;i++){
    console.log(allurl[i].protocol)
}

var question = 'Topic of today is %s and duration is %s hr';
var outtxt = util.format(question,'Node',1)
console.log(outtxt)