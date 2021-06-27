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
shapeAI.get("/books/:isbn",(req,res)=>{
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
});

/*
Route  				/book/new
Description        add new books
Access                PUBLIC
Parameters            NONE 
Method                POST
*/
shapeAI.post("/book/new",(req,res)=>{
	//body
	const {newBook} = req.body;
	database.books.push(newBook);
	return res.json({books:database.books,message:"New book added"});

});

/*
Route  				/author/new
Description        add new author
Access                PUBLIC
Parameters            NONE 
Method                POST
*/
shapeAI.post("/author/new",(req,res)=>{
	//body
	const {newAuthor} = req.body;
	database.authors.push(newAuthor);
	return res.json({Authors:database.authors,message:"New Author added"});

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
Route  				/book/update/:title
Description        Update title of the book
Access                PUBLIC
Parameters            isbn 
Method                PUT
*/
shapeAI.put("/book/update/:isbn",(req,res)=>{
	//foreach directly updates the array
					//or
	//map => new array =>replace

	database.books.forEach((book)=>{
		if(book.ISBN===req.params.isbn)
		{
			book.title=req.body.bookTitle;
			return;
		}
	});

return res.json({books:database.books});
});

/*
Route  				/book/author/update/:isbn
Description        Update/add new author
Access                PUBLIC
Parameters            isbn 
Method                PUT
*/
shapeAI.put("/book/author/update/:isbn",(req,res)=>{
	//Update book database
	database.books.forEach((book)=>{
		if(book.ISBN===req.params.isbn) return book.authors.push(req.body.newAuthor);
	});

	//Update author database
	database.authors.forEach((author)=>{
		if(author.id===req.body.newAuthor) return author.books.push(req.params.isbn);
	});
	return res.json({books:database.books,authors:database.authors,message:"New author was added"});
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
		publication.id=req.body.publicationName;
		return;
	}
});
});

shapeAI.listen(3000,()=>console.log("Server is running"));