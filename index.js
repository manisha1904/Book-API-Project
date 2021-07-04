require("dotenv").config();
//Frame Work
const express = require("express");
const mongoose = require("mongoose");
//Database
const database = require("./database/index");

//Models
//const BookModel = require("./database/book");
const Books = require("./API/Book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");


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

//configuration
shapeAI.use(express.json());



/*
Route  				
Description        get all authors
Access                PUBLIC
Parameters            None
Method                GET
*/
shapeAI.get("/a",async(req,res)=>{
	const getAllAuthors = await AuthorModel.find();
	return res.json({authors:getAllAuthors});
});

/*
Route  				/authors/
Description        get specific authors
Access                PUBLIC
Parameters            author name
Method                GET
*/
shapeAI.get("/author",(req,res)=>{
	const getSpecificAuthor= database.authors.filter((author)=> author.name === req.params.author);
	if(getSpecificAuthor.length===0){
		return res.json({error:`No Book found of Author ${req.params.author}`});
	}
	return res.json({book:getSpecificAuthor});

});

/*
Route  				/authors/
Description        get authors based on isbn of books
Access                PUBLIC
Parameters            books isbn 
Method                GET
*/
shapeAI.get("/author/:isbn",(req,res)=>{
	const getSpecificAuthors= database.authors.filter((author)=> author.books.includes(req.params.isbn));
	if(getSpecificAuthors.length===0){
		return res.json({error:`No Author found of Book ${req.params.isbn}`});
	}
	return res.json({book:getSpecificAuthors});

});

/*
Route  				
Description        get all publications
Access                PUBLIC
Parameters            NONE
Method                GET
*/
shapeAI.get("/p",(req,res)=>{
	return res.json({publications:database.publications});
});

/*
Route  				/Publications/
Description        get specific publications
Access                PUBLIC
Parameters            publication name
Method                GET
*/
shapeAI.get("/publication/:name",(req,res)=>{
	const getSpecificPublications = database.publications.filter((publication)=> publication.name === req.params.name);
	if(getSpecificPublications.length===0){
		return res.json({error:`No Publication found of Name ${req.params.publication}`});
	}
	return res.json({publication:getSpecificPublications});
});

/*
Route  				/Publications/
Description        get publications with their isbn number
Access                PUBLIC
Parameters            books isbn 
Method                GET
*/
shapeAI.get("/b/:isbn",(req,res)=>{
	const getSpecificPublication = database.publications.filter((publication)=>publication.books.includes(req.params.isbn));
	if(getSpecificPublication.length===0)
	{
		return res.json({error:`No publication found of book having isbn ${req.params.isbn}`});
	}
	return res.json({publication:getSpecificPublication});
});


/*
Route  							/author/new
Description        add new author
Access                PUBLIC
Parameters            NONE 
Method                POST
*/
shapeAI.post("/author/new",(req,res)=>{
	//body
	const {newAuthor} = req.body;
	//database.authors.push(newAuthor);
	AuthorModel.create(newAuthor);
	return res.json({message:"New Author added"});

});

/*
Route  				/publication/new
Description        add new publication
Access                PUBLIC
Parameters            NONE 
Method                POST
*/
shapeAI.post("/publication/new",(req,res)=>{
	const {newPublication} = req.body;
	database.publications.push(newPublication);
	return res.json({Publication:database.publications,message:"New Publication is added"});
});


	

/*
Route  				/author/update/:id
Description        Update name of author
Access                PUBLIC
Parameters            id 
Method                PUT
*/
shapeAI.put("/author/update/:id",(req,res)=>{
database.authors.forEach((author)=>{
	if(author.id===req.params.id) {
		author.id=req.body.authorName;
		return;
	}
});
});

/*
Route  				/publication/:id
Description        Update publication name
Access                PUBLIC
Parameters            id 
Method                PUT
*/
shapeAI.put("/publication/update/:id",(req,res)=>{
database.publications.forEach((publication)=>{
	if(publication.id===req.params.id) {
		publication.name=req.body.publicationName;
		return;
	}
});
});


/*
Route  				/publication/update/book
Description        update/add new book to a publication
Access                PUBLIC
Parameters            isbn
Method                PUT
*/
shapeAI.put("/publication/update/book/:isbn",(req,res)=>{
	//Update the publication database
	database.publications.forEach((publication)=>{
		if(publication.id===req.body.pubId){
			return publication.books.push(req.params.isbn);
		}
	});
	//update books database
	database.books.forEach((book)=>{
		if(book.ISBN===req.params.isbn){
			book.publication=req.body.pubId;
			return ;
		}
	});
	return res.json({books:database.books,publications:database.publications,message:"Successfully updated publication"});
});



			
/*
Route  				/delete/author
Description        delete an author 
Access                PUBLIC
Parameters            author id
Method                DELETE
*/
shapeAI.delete("/delete/author/:authorid",(req,res)=>{
	const updatedAuthorsList = database.authors.filter((author)=>author.id!==parseInt(req.params.authorid));
	database.authors=updatedAuthorsList;
	return res.json({authors:database.authors,message:"Author deleted"});
});

/*
Route  				/delete/publication
Description        delete a publication
Access                PUBLIC
Parameters            publication id
Method                DELETE
*/
shapeAI.delete("/delete/publication/:pubId",(req,res)=>{
	const updatedPublications = database.publications.filter((publication)=> publication.id!==parseInt(req.params.pubId));
	database.publications=updatedPublications;
	return res.json({publication:database.publications,message:"Deleted publications"});
});

/*
Route  				/publication/delete/book
Description        delete a publication
Access                PUBLIC
Parameters            publication id, isbn
Method                DELETE
*/
shapeAI.delete("/delete/publication/:pubid/:isbn",(req,res)=>{
	//update publication database
	database.publications.forEach((publication)=>{
		if(publication.id===parseInt(req.params.pubid)){
			const newPublicationList = publication.books.filter((book)=>book !==req.params.isbn);
				publication.books = newPublicationList;
				return;
		}
	});
	//update book database
	database.books.forEach((book)=>{
		if(book.ISBN===req.params.isbn){
			book.publication = 0; //No publication available
			return;
		}
	});
	return res.json({books:database.books,publications:database.publications,message:"Deleted publication"});
});
shapeAI.listen(3000,()=>console.log("Server is running"));

