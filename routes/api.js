var express = require('express');
var router = express.Router();
var passport = require('passport');

router.use(function(req,res,next){
    console.log("API call made");
    next();    
    
});

router.get('/helloworld', function(req, res, next) {
  res.json({message: 'Hello World and Welcome to our API'});
});

router.get('/python', function(req,res,next){    
    var python = require('child_process').spawn('python',["./Python/pythonRPC.py"]);
    var output = "";
    python.stdout.on('data', function(data){ output += data });
    python.stderr.on('data', function(err){console.log("Error: " + err); output+=err})
    python.on('close', function(code){ 
        if (code !== 0) {  return res.send(500, output); }
        return res.send(200, output)
    });  
});

router.post('/add', function(req, res, next) {    
    num1 = req.body.arg1;
    num2 = req.body.arg2;
    var python = require('child_process').spawn('python',["./Python/pythonRPC1.py", num1,num2]);
    var output = "";
    python.stdout.on('data', function(data){ output += data });
    python.stderr.on('data', function(err){console.log("Error: " + err); output+=err})
    python.on('close', function(code){ 
        if (code !== 0) {  return res.send(500, output); }
        return res.send(200, output)
    });
    
});
module.exports = router;
