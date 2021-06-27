const books = [
{
	ISBN:"12345ONE",
	title:"Starting with MERN",
	authors:["Pavan"],
	language:"en",
	pubDate:"2021-07-07",
	category:["fiction","Programming","DBMS","Web Dev"],
	publication:1,

},
{
	ISBN:"12345TWO",
	title:"Starting with Python",
	authors:["Deepak"],
	language:"en",
	pubDate:"2021-07-07",
	category:["fiction","Programming","DBMS","Web Dev"],
	publication:1,

},
];
const authors = [{
	id:1,
	name:"Pavan",
	books:["12345ONE"],

},
{
	id:2,
	name:"Deepak",
	books:["12345ONE"],
},
];

const publications = [{
	id:1,
	name:"Chakra",
	books:["12345ONE"],

},];

module.exports = {books, authors,publications};