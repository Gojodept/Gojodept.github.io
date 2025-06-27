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








// new collection posts and comments 
db.posts.insertMany([{_id:"p1",post:"Post 1"},{_id:"p2",post:"Post 2"}])

db.comments.insertMany([
  {_id:"c1",
    pid:"p1",
    comment:"Comment1"
  },
    {_id:"c2",
    pid:"p1",
    comment:"Comment2"
  },
    {_id:"c3",
    pid:"p2",
    comment:"Comment3"
  },
    {_id:"c4",
    pid:"p2",
    comment:"Comment4"
  },
    {_id:"c5",
    pid:"p2",
    comment:"Comment5"
  },

])
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//$lookup &LOOKUP

//$lookup is just for that query. No data is merged, altered, or linked permanently.
//If you want to actually store joined results, you'd have to use $merge or manually update documents using $set and $push.
db.posts.aggregate([// checking in post that how many comments are there 
  {$lookup:{
    from:"comments",
    localField:"_id",// base _id
    foreignField:"pid",// lookup to 
    as:"comments"// display as 
  }}
])
// db.posts.aggregate([
//   {
//     $lookup: {
//       from: "comments",        // Join with 'comments' collection
//       localField: "_id",       // Match 'posts._id'
//       foreignField: "pid",     // With 'comments.pid'
//       as: "comments"           // Put the result in 'comments' array
//     }
//   }
// ])
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.posts.aggregate([// checking in post that how many comments are there 
  {$lookup:{
    from:"comments",
    localField:"_id",// base _id
    foreignField:"pid",// lookup to 
    as:"comments"// display as 
  }},
  {$unwind:"$comments"},
  {$project:{
    _id:0,
    post:1,
    "comments.comments":1// show only comments of comments in the the array given below comments in comments array
  }}
])

  //   comments: [
  //     { _id: 'c3', pid: 'p2', comment: 'Comment3' },
  //     { _id: 'c4', pid: 'p2', comment: 'Comment4' },
  //     { _id: 'c5', pid: 'p2', comment: 'Comment5' }
  //   ]
  // }
db.comments.insertOne(
    {_id:"c6",
    pid:"p1",
    comments:"Comment6"
  }
)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.marks.insertMany([
  {name:"John",
    term:"t1",
    subject:"maths",
    score:98
  },
    {name:"John",
    term:"t2",
    subject:"maths",
    score:90
  },
    {name:"John",
    term:"t3",
    subject:"maths",
    score:88
  },
    {name:"John",
    term:"t1",
    subject:"science",
    score:92
  },
    {name:"John",
    term:"t2",
    subject:"science",
    score:82
  },
    {name:"John",
    term:"t3",
    subject:"science",
    score:82
  },
    {name:"Cathly",
    term:"t1",
    subject:"maths",
    score:92
  },
      {name:"Cathly",
    term:"t2",
    subject:"maths",
    score:92
  },
      {name:"Cathly",
    term:"t3",
    subject:"maths",
    score:82
  },
        {name:"Cathly",
    term:"t1",
    subject:"science",
    score:92
  },
          {name:"Cathly",
    term:"t2",
    subject:"science",
    score:82
  },
          {name:"Cathly",
    term:"t3",
    subject:"science",
    score:80
  },
])

db.marks.aggregate([

  {$group:{
    _id:"$subject",
    AvgScore:{$avg:"$score"}
  }},
  {$sort:{_id:1}}
])


db.marks.aggregate([

  {$group:{
    _id:{term:"$term",subject:"$subject"},
    AvgScore:{$avg:"$score"}
  }},
  {$sort:{_id:1}}
])

db.marks.aggregate([
  {$match:{name:"John"}},
  {$group:{
    _id:{term:"$term"},//_id: "$term" -->>  output:{ _id: "t1", AvgScore: 95 }
    AvgScore:{$avg:"$score"}
  }},
  {$sort:{_id:1}}
])