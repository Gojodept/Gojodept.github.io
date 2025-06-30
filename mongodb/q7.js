
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


//Date 30/6/2025
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
db.employees.aggregate([
  {$project:{_id:0,name:1,salary:1,Grade:"Grade A"}}
])

db.employees.aggregate([
  {$project:{_id:0,
    name:1,
    salary:1,
    Grade:{$cond:[{$gt:["salary",3000]},"Grade A","Grade B"]}}}
])

db.employees.aggregate([
  {$project:{
    _id:0,
    name:1,
    salary:1,
    Grade:{$cond:{
      if:{$gt:["$salary",3000]},
      then:"Grade A",
      else:"Grade B"
    }}}}
])
db.employees.aggregate([
  {
    $project: {
      _id: 0,                 // Exclude _id
      name: 1,                // Include name
      salary: 1,              // Include salary
      Grade: {
        $cond: {
          if: { $gt: ["$salary", 3000] },  // If salary > 3000
          then: "Grade A",                 // Then Grade A
          else: "Grade B"                  // Else Grade B
        }
      }
    }
  }
  {$out:"GradeWiseSalary"}
])

db.createView("salaryview","employees",[
    {
    $project: {
      _id: 0,                 // Exclude _id
      name: 1,                // Include name
      salary: 1,              // Include salary
      Grade: {
        $cond: {
          if: { $gt: ["$salary", 3000] },  // If salary > 3000
          then: "Grade A",                 // Then Grade A
          else: "Grade B"                  // Else Grade B
        }
      }
    }
  },
])
db.createView([
  {
    $project: {
      _id: 0,                 // Exclude _id
      name: 1,                // Include name
      salary: 1,              // Include salary
      Grade: {
        $cond: {
          if: { $gt: ["$salary", 3000] },  // If salary > 3000
          then: "Grade A",                 // Then Grade A
          else: "Grade B"                  // Else Grade B
        }
      }
    }
  },
  {$out:"GradeWiseSalary"}
])

