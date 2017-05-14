var express = require('express');
var app=express();
var mongoose=require('mongoose');
var url="mongodb://localhost:27017/ram";
var bodyparser=require('body-parser');
var campus=require('./college.js');
mongoose.connect('mongodb://localhost:27017/ram');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.get('/start',function(req,res){
	res.sendFile(__dirname+'/home.html');
});
app.get('/data',function(req,res){
	res.sendFile(__dirname+'/data.html');
});
app.get('/p',function (req,res) {
	res.sendFile(__dirname+'/coll.html');
});
app.get('/retrieve',function(req,res){
	res.sendFile(__dirname+'/retrieve.html');
});
app.get('/update',function(req,res){
	res.sendFile(__dirname+'/update.html');
});
app.get('/delete',function(req,res){
	res.sendFile(__dirname+'/delete.html');
});
app.post('/insert',function(req,res){
	console.log('inside post')

	var data=req.body;
	console.log(data);
	campus.addcollege(data,function(err,data){
		if(data)
		{
			response="data inserted "
			res.send(response);
		}
		else
		{
			error="not inserted"
			res.send(error);
		}
	});
});
app.post('/data',function(req,res){
	campus.datacollege(function(err,response){
	});
});
app.post('/retrieve',function(req,res){
	var ret=req.body.name;
	console.log(ret);
	campus.getcollege(ret,function(err,ret){
		if(ret){
			response="data retrieved successfully"
		res.send(ret);
		}
		else
		{
			error="sorry not retrieve"
			res.send(error);
		}
	});
});
app.post('/delete',function(req,res)
{
	var del=req.body.name;
	campus.deletecollege(del,function(err,del) {
		if(del)
		{
			response="deleted"
			res.send(response)
		}
		else{
			error="not deleted"
			res.send(error)
		}
	});
});
app.post('/update',function(req,res){
	var upd=req.body.name;
	var dat=req.body;
	campus.updatecollege(upd,dat,{},function(err,dat){
	if(dat){
    response="updated"
   res.send(response);
   console.log(dat);
	}
    else{
		error="not updated"
		res.send(error)
	}
	});
});
app.listen(3000);
console.log('running');