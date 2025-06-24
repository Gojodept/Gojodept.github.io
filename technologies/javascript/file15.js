//json
const student='{"name" :"Any", "age":21 }'
const obj =JSON.parse(student)// get data from the server 
console.log(JSON.stringify(obj))//sending data to the server 
console.log(obj.name)