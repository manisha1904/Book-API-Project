let books = [
{
	ISBN:"12345ONE",
	title:"Starting with MERN",
	authors:[1,2],
	language:"en",
	pubDate:"2021-07-07",
	category:["fiction","Programming","DBMS","Web Dev"],
	publication:1,

},
{
	ISBN:"12345TWO",
	title:"Starting with Python",
	authors:[1],
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

},
{
	id:2,
	name:"Rajat",
	books:[],

},];

module.exports = {books, authors,publications};