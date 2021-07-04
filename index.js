require("dotenv").config();
//Frame Work
const express = require("express");
const mongoose = require("mongoose");
//Database
const database = require("./database/index");

//Models
//const BookModel = require("./database/book");
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");


//Initializing
const shapeAI = express();

//establishing database connection
mongoose.connect(process.env.MONGO_URL,{
	useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>console.log("connection established"));

//Initialzing Microservices
//shapeAI.use("/book",Books);
shapeAI.use("/book", Books);
shapeAI.use("/author",Authors);
shapeAI.use("/publication",Publications);

//configuration
shapeAI.use(express.json());


shapeAI.listen(3000,()=>console.log("Server is running"));