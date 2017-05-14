var mongoose=require('mongoose');
var CollegeSchema=mongoose.Schema({
	name:{
		type:String,
	required:true
	},
	area:{
		type:String,
	    required:true
	},
	fee:
	{
		type:String,
	    required:true
	}
});
var link =module.exports=mongoose.model('collegecollection',CollegeSchema);

module.exports.addcollege=function(data,callback){
link.create(data,callback);
}
module.exports.datacollege=function(data,callback){
	link.find(callback);
}
module.exports.getcollege=function(ret,callback){
	link.find({name:ret},callback);
}
module.exports.deletecollege=function(del,callback){
	var query={name:del};
	link.remove(query,callback);
}
module.exports.updatecollege=function(upd,dat,options,callback){
	var query={name:upd};
	var update={
		name:dat.name,
		area:dat.area,
		fee:dat.fee
	}
	link.findOneAndUpdate(query,update,options,callback);
}

	
	

	
	
		
		
	

