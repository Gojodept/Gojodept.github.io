db.employees.find()
db.employees.find().skip(1)//it skip th first document 
db.employees.find().limit(1)//it skip th first document 
db.employees.find().skip(1).limit(2)// skip first element and limit to only two elements 
db.employees.find({department:"IT"},{_id:0,name:1,salary:10000})//only names will be displayed with salary 10000