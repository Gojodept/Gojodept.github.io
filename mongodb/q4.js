db.employees.insertMany([
  {
    name: "Amy",
    email: "amy@gmail.com",
    department: "HR",
    salary: "10000",
    location: ["AZ", "TX"],
    date: Date(),
  },
  {
    name: "Rafeal",
    email: "Rafeal@gmail.com",
    department: "ADMIN",
    salary: "100000",
    location: ["AZ", "TX"],
    date: Date(),
  }, 
])

//Fetches all employee documents where the **department is either "ADIMN" or "HR"**.
db.employees.find(
    {department:{$in:["ADIMN","HR"]}}//admin is case sensitive
)

//Fetches all employee documents where the **department is neither "ADIMN" nor "HR"** (case-sensitive match).
db.employees.find(
    {department:{$nin:["ADIMN","HR"]}}//admin is case sensitive
)