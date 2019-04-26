var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

var User = require('../user/User');

router.post('/register', (req,res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role:req.body.role?req.body.role:'user'
    },
    function (err,user){
        if (err) return res.status(500).send("Problem registering user")
        var token = jwt.sign({id:user._id}, config.secret,{
            expiresIn:86400 // for 24hrs
        })
        res.status(200).send({auth:true, token: token});
    })
})

router.get('/userinfo',function(req,res){
    var token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({auth:false, message:'no token provided'})
    jwt.verify(token, config.secret, function(err,decode){
        if(err) return res.status(500).send({auth: false, message: 'Failed to authencticate token'})
        User.findById(decode.id, {password:0}, function(err,user){
            if(err) return res.status(500).send("No user found");
            res.status(200).send(user)
        })
    })
})

router.post('/login',function(req,res){
    User.findOne({email:req.body.email}, function(err,user){
        if(err) return res.status(500).send('Error on the server');
        if(!user) return res.status(404).send('No user found')
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
        if(!passwordIsValid) return res.status(401).send({auth:false, token:null})
        var token = jwt.sign({id:user._id}, config.secret,{
            expiresIn: 86400
        })
        res.status(200).send({auth:true, token:token})
    })
})

router.get('/users',(req,res) => {
    User.find({},(err,data) => {
        if (err) return res.status(500).send("Problem registering user")
        res.send(data)
    })
})


module.exports = router;