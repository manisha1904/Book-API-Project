//Prefix : /publication

//Initializing express routes
const Router = require("express").Router();

//Database Models
const PublicationModel = require("../../database/publication");

/*
Route  				
Description        get all publications
Access                PUBLIC
Parameters            NONE
Method                GET
*/
Router.get("/",async(req,res)=>{
	const getAllPublications = await PublicationModel.find();
	return res.json({authors:getAllPublications});
});

/*
Route  				/Publications/
Description        get specific publications
Access                PUBLIC
Parameters            publication name
Method                GET
*/
Router.get("/publication/:name",(req,res)=>{
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
Router.get("/b/:isbn",(req,res)=>{
	const getSpecificPublication = database.publications.filter((publication)=>publication.books.includes(req.params.isbn));
	if(getSpecificPublication.length===0)
	{
		return res.json({error:`No publication found of book having isbn ${req.params.isbn}`});
	}
	return res.json({publication:getSpecificPublication});
});

/*
Route  				/publication/new
Description        add new publication
Access                PUBLIC
Parameters            NONE 
Method                POST
*/
Router.post("/publication/new",(req,res)=>{
	const {newPublication} = req.body;
	database.publications.push(newPublication);
	return res.json({Publication:database.publications,message:"New Publication is added"});
});

/*
Route  				/publication/:id
Description        Update publication name
Access                PUBLIC
Parameters            id 
Method                PUT
*/
Router.put("/publication/update/:id",(req,res)=>{
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
Router.put("/publication/update/book/:isbn",(req,res)=>{
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
Route  				/delete/publication
Description        delete a publication
Access                PUBLIC
Parameters            publication id
Method                DELETE
*/
Router.delete("/delete/publication/:pubId",(req,res)=>{
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
Router.delete("/delete/publication/:pubid/:isbn",(req,res)=>{
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

module.exports = Router;