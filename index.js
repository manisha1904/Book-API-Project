//Frame Work
const express = require("express");
//Database
const database = require("./database/index");
//Initializing
const shapeAI = express();

//configuration
shapeAI.use(express.json());


/*
Route  /
Description        get all books
Access                PUBLIC
Parameters            NONE
Method                GET
*/
shapeAI.get("/",(req,res)=>{
	return res.json({books:database.books});
});

/*
Route  					/
Description        get specific book based on ISBN 
Access                PUBLIC
Parameters            isbn
Method                GET
*/
shapeAI.get("/is/:isbn",(req,res)=>{
	const getSpecificBook= database.books.filter((book)=> book.ISBN === req.params.isbn);
	if(getSpecificBook.length===0){
		return res.json({error:`No Book found of ISBN ${req.params.isbn}`});
	}
	return res.json({book:getSpecificBook});
});

/*
Route  				/category/
Description        get specific books based on a category
Access                PUBLIC
Parameters            category
Method                GET
*/
shapeAI.get("/c/:category", (req,res)=>{
	const getSpecificBooks= database.books.filter((book)=> book.category.includes(req.params.category));
	if(getSpecificBooks.length===0){
		return res.json({error:`No Book found of category ${req.params.category}`});
	}
	return res.json({book:getSpecificBooks});

});

/*
Route  				/authors/
Description        get specific books based on a author
Access                PUBLIC
Parameters            author
Method                GET
*/
shapeAI.get("/book/:author",(req,res)=>{
	const getSpecificBooksBy= database.books.filter((book)=> book.authors.includes(req.params.author));
	if(getSpecificBooksBy.length===0){
		return res.json({error:`No Book found of author ${req.params.author}`});
	}
	return res.json({book:getSpecificBooksBy});

});

/*
Route  				
Description        get all authors
Access                PUBLIC
Parameters            None
Method                GET
*/
shapeAI.get("/a",(req,res)=>{
	return res.json({authors:database.authors});
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
})



shapeAI.listen(3000,()=>console.log("Server is running"));