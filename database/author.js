const mongoose = require("mongoose");

//Creating Author Schema
const AuthorSchema = mongoose.Schema({
	id:Number,
	name:String,
	books:[String],
});

//Creating an Author Model
const AuthorModel = mongoose.model(AuthorSchema);

module.exports= AuthorModel;