//Updates the **salary to ₹3000** for the employee whose **email is "[mike@gmail.com](mailto:mike@gmail.com)"**.
db.employees.updateOne(
    {email:"amy@gmail.com"},
    {$set:{salary:3000}}
)
//Adds or updates `point: 1` in the **first employee document** of the collection.
db.employees.updateOne(
    {},
    {$set:{points:1}}
)
//decrease the point by one  
db.employees.updateOne(
    {department:"IT"},
    {$inc:{points:-1}}
)

db.employees.updateOne(
    {email:"krish@gmail.com"},
    {$set:{name:"Krish",department:"HR",salary:3000}},
    {upsert:true}
)

//Deletes the **first employee document** where the **email is "[krish@gmail.com](mailto:krish@gmail.com)"**.
db.employees.deleteOne({email:"krish@gmail.com"})
db.employees.deleteMany({department:"HR"})
//Fetches the employee with the highest salary by sorting in descending order and limiting to 1.
db.employees.find().sort({salary:-1}).limit(1)//beacuse of -1 highest element will be displayed 


//In .find(), "key": "$field" does not map data, it inserts the string "$field"; use $project in aggregate() to show fields with different keys.
 db.employees.find({},{_id:0,Empname:"$name"})

//If some documents don’t have points, MongoDB will ignore them silently — no errors, just skips.
//Renames the field points to score in all employee documents.
  db.employees.updateMany(
    {},
    {$rename:{points:"score"}}
  )
//Pushes the value 5 into the points array field for all employee documents.
  db.employees.updateMany(
    {},// no condition in this 
    {$push:{points: 5}}
  )

  db.employees.updateMany(
  { department: "IT" },//condition IT
  { $push: { points: 7 }}
);

//OUTPUT:  points: [ 5, 7 ] it wont replace the original data 
//Use $set to replace the value of a field (array or not), while $push is for adding to an array


//$pull removes matching values from arrays in selected documents — no matter their position in the array.
  db.employees.updateMany(
  { department: "IT" },//condition IT
  { $pull: { points: 5 }}
);
//Use $pull with query operators like $gt, $lt, etc., to remove matching values from arrays.
db.employees.updateMany(
  { department: "IT" },
  { $pull: { points: { $gt: 3 } } }
)
//$addToSet adds a value to an array only if it doesn't already exist, preventing duplicates.
db.employees.updateMany(
  {},
  { $addToSet:{location:'LA'} }
)
//$pop removes the first (-1) or last (1) element from an array field.
db.employees.updateMany(
  {},
  { $pop:{location:-1}}
)

