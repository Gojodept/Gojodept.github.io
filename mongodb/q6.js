db.employees
  .find(
    { salary: { $gt: 3000 } }, //filter
    { name: 1 } //what to diplay
  )
  .limit(2)
  .skip(1);

db.employees.find(
  { $or: [{ salary: { $gt: 3000 }, department: "IT" }] },
  { name: 1 }
);

//aggregation
db.employees.aggregate([
  { $match: { salary: { $gt: 1000 } } },
  { $project: { name: 1, salary: 1 } },
  { $sort: { name: 1 } },
  { $limit: 1 },
]);

db.employees.aggregate(
  { $project: { name: 1, salary: 1, point: 1 } },
  { $limit: 1 }
);
// display the data with duplicate value in separate value
//Shows only name and each location in separate documents by breaking the location array into individual values.
db.employees.aggregate(
  { $project: { _id: 0, name: 1, location: 1 } },
  { $unwind: "$location" }
);
//Shows only the `name` field as **`EmpName`** by using `$project` to rename it and exclude `_id`.
db.employees.aggregate([{ $project: { _id: 0, EmpName: "$name" } }]);

db.employees.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      salary: 1,
      bonus: { $multiply: ["$salary", 2] },
    },
  },
]);
// use project to show the dat in the form we want 
//other =wise it will give all the data
db.employees.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      salary: 1,
      bonus: { $multiply: ["$salary",2] },
    },
  },
]);

//Groups employees by `department` and calculates the **total salary** for each, converting salary to number if needed.

db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      total: { $sum: "$salary" }
    }
  }
]);
//new db orders
db.employees.insertOne(
    {empId: ObjectId('685bca05162bbaa018748a5f'),
    order:1300}
)


db.order.insertMany([
  {
    empId: ObjectId('685a8a66a67f366db2748a5f'), // John Smith
    order: 1500
  },
  {
    empId: ObjectId('685bb8e6987a5ea2ae748a5f'), // Johnn Deo
    order: 2000
  },
  {
    empId: ObjectId('685bca05162bbaa018748a5f'), // Amy
    order: 1300
  }
]);


db.employees.aggregate([
    {$lookup:{}},
])

db.employees.aggregate([
    {$lookup:{
        from:"orders",
        localField:"_id",
        foreignField:"empId",
        as:"orders"
    }},
])

// Joins employees (salary > 2000) with orders, unwinds them, and shows name, salary, and order using $lookup and $unwind.
db.employees.aggregate([
    {$match:{salary:{$gt:2000}}},
    {$lookup:{
        from:"orders",
        localField:"_id",
        foreignField:"empId",
        as:"orders"
    }},
    {$unwind:"$orders"},
    {$project:{name:1,salary:1,"order.orderValue":1}},
]);

db.employees.aggregate([
{$lookup:{
    from:"empCountry",
    localField:"_id",
    foreignField:"empId",
    as:"empCountry"
}},

])


db.employees.aggregate([
{$lookup:{
    from:"empCountry",
    localField:"_id",
    foreignField:"empId",
    as:"empCountry"
}},
{$lookup:{

}}
])
//



db.employees.updateMany({}, {});
// indexing 
db.employees.createIndex({email:1})
db.employees.find({email:"john@gmail.com"}).explain("executionStats")
//makes it fast to search for data 


db.employees.aggregate([
    {$group:{_id:{country:"$country.empCountry",name:"$name"},
    total:{$sum:"$score"}}}
])







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






