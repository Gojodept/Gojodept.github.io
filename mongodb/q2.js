const { name } = require("ejs");
///////////////////////////////////////////////////////////////////////all queries 
db.employees.insertOne({
  name: "John smith",
  email: "john@gmail.com",
  department: "IT",
  salary: 1456,
  location: ["FL", "OH"],
  date: Date(),
});
db.employees.insertOne({ name: "Ari", age: 21 }); // insert only one document
db.employees.insertMany({ name: "Ari", age: 22 }, { name: "Avinash", age: 22 });
db.employees.find(); //to show the data

//Query to insert data in db ............................................................
db.employees.insertMany([
  {
    name: "Johnn deo",
    email: "John@gmail.com",
    department: "IT",
    salary: "10000",
    location: ["AZ", "TX"],
    date: Date(),
  },
  {
    name: "Jun",
    email: "Jun@gmail.com",
    department: "CS",
    salary: "100000",
    location: ["AZ", "TX"],
    date: Date(),
  },
]);

db.users.find({},{name:1})//show all the iems with name field..... first {} -> means projection 
db.users.find({},{_id:0,name:1,age:1})//id 0 meaning that do not show the id
//delete a perticular collection 
db.users.drop()