const mongoose = require("mongoose");

//Creating Publication Schema
const PublicationSchema = mongoose.Schema({
	id:Number,
	name:String,
	books:[String],
});

//Creating an Publication Model
const PublicationModel = mongoose.model(PublicationSchema);

module.exports= PublicationModel;