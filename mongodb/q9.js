db.employees.find({name:{$regex:"Cathy"}})// find cathy in the db using the regular expression 
db.employees.find({name:{$regex:"Cathy",$options:"i"}})//option i means case sensitive 
//all the names with cathy in them
db.employees.find({name:{$regex:"c",$options:"i"}})
db.employees.find({name:{$regex:"y$",$options:"i"}})