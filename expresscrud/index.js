var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var userModel = require('./model/user')
var cors =  require('cors')

var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/newdb")
var db = mongoose.connection

db.on('error',function(){
    console.log("Error connecting to database");
    
})
db.once('open',function(){
    console.log("Connected to database");
    
})
app.get('/',function(req,res){
    res.send("Hello from Express REST APi !!")
})
app.get('/get',function(req,res){
    userModel.find({},function(err,data){
        if(err){
            res.send(err)
        } else{
            res.json(data)
        }
    })
})
app.get('/get/:location',function(req,res){
    var pathParam = req.params.location
    console.log(pathParam);
    
    userModel.find({location: pathParam},function(err,data){
        if(err){
            res.send(err)
        }
        else{
            res.json(data)
        }
    })
})
    app.post('/add',function(req,res){
        console.log(req.body);
        
        var um = new userModel()
        um.name = req.body.name
        um.location = req.body.location
        um.save(function(err){
            if(err){
                res.send(err)
            }
            else{
                res.json({message: 'user created'})
            }
        })
    })

app.listen(8888)