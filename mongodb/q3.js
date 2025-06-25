db.employees.find();
db.employees.find().skip(1); //it skip th first document
db.employees.find().limit(1); //it skip th first document
db.employees.find().skip(1).limit(2); // skip first element and limit to only two elements
db.employees.find({ department: "IT" }, { _id: 0, name: 1, salary: 10000 }); //only names will be displayed with salary 10000
db.employees.find({ department: "IT" }, { _id: 0, name: 1, salary: 10000 });

//Fetches names and salaries of employees earning **₹3000 or more**, excluding the `_id` field.
db.employees.find(
    { salary: { $gte: 3000 } }, 
    { _id: 0, name: 1, salary: 1 }
);

//Fetches names and salaries of employees earning ₹3000 or less, excluding the _id field.
db.employees.find(
    { salary: { $lte: 3000 } }, 
    { _id: 0, name: 1, salary: 1 }
);

//Fetches names and salaries of **IT department** employees earning **₹3000 or less**, excluding the `_id` field.
db.employees.find(
  { salary: { $lte: 3000 }, department: "IT" },
  { _id: 0, name: 1, salary: 1 }
);

//Fetches names and salaries of employees who **earn ≤ ₹3000** or belong to the **IT department**, excluding the `_id` field.
db.employees.find(
  { $or: [ { salary: { $lte: 3000 } }, { department: "IT" } ] },
  { _id: 0, name: 1, salary: 1 }
);
//syntax
db.employees.find(
  {$or:[{},{}]}
);
//Fetches names and salaries of employees who **earn ≤ ₹3000** **and** work in the **IT department**, excluding the `_id` field.
db.employees.find(
  { $and: [ { salary: { $lte: 3000 } }, { department: "IT" } ] },
  { _id: 0, name: 1, salary: 1 }
);
//syntax
db.employees.find(
  {$an:[{},{}]}
);
//Fetches all employee documents where the **department is "IT"
db.employees.find({department:{$eq:"IT"}})
//Fetches all employee documents where the **department is not "IT"**.
db.employees.find({department:{$ne:"IT"}})

