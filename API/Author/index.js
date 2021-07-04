//Prefix : /author

//Initializing Express Router
const Router = require("express").Router();

//Database Model
const AuthorModel = require("../..database/author");

/*
Route  				
Description        get all authors
Access                PUBLIC
Parameters            None
Method                GET
*/
Router.get("/a",async(req,res)=>{
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
Router.get("/author",(req,res)=>{
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
Router.get("/author/:isbn",(req,res)=>{
	const getSpecificAuthors= database.authors.filter((author)=> author.books.includes(req.params.isbn));
	if(getSpecificAuthors.length===0){
		return res.json({error:`No Author found of Book ${req.params.isbn}`});
	}
	return res.json({book:getSpecificAuthors});

});


/*
Route  							/author/new
Description        add new author
Access                PUBLIC
Parameters            NONE 
Method                POST
*/
Router.post("/author/new",(req,res)=>{
	//body
	const {newAuthor} = req.body;
	//database.authors.push(newAuthor);
	AuthorModel.create(newAuthor);
	return res.json({message:"New Author added"});

});

/*
Route  				/author/update/:id
Description        Update name of author
Access                PUBLIC
Parameters            id 
Method                PUT
*/
Router.put("/author/update/:id",(req,res)=>{
database.authors.forEach((author)=>{
	if(author.id===req.params.id) {
		author.id=req.body.authorName;
		return;
	}
});
});

/*
Route  				/delete/author
Description        delete an author 
Access                PUBLIC
Parameters            author id
Method                DELETE
*/
Router.delete("/delete/author/:authorid",(req,res)=>{
	const updatedAuthorsList = database.authors.filter((author)=>author.id!==parseInt(req.params.authorid));
	database.authors=updatedAuthorsList;
	return res.json({authors:database.authors,message:"Author deleted"});
});

module.exports = Router;

