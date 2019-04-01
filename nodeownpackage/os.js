var os = require('os');
console.log(os.platform());
console.log(os.arch());
console.log(os.userInfo());
user = os.userInfo;
console.log(os.totalmem());
console.log("hi "+ os.userInfo().username + " i understand you are using "+os.platform()
            + " of " +os.arch() + " bit")