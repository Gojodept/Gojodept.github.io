// //OBJECTS
const student ={
     name: "Harsh",
     age: 21,
};
console.log(student)
console.log(student.name)
console.log(student["name"])
student.city ="Amritsar"
console.log(student)
student.city ="Lucknow"
console.log(student)


// const student = {
//      name: "Ari",
//      age: 21,
// };

// console.log(student)            
// console.log(student.name);        
// console.log(student["name"]);     

// student.city = "Amritsar";
// console.log(student);             

// student.city = "Lucknow";
// console.log(student);             


////////////////////////////////////////////////////////////////////////
const cart={
    1: 5,
    3: 1,
    5: 2,
};
const items= Object.keys(cart).lenght
console.log(items)
cart[3]=cart[3]+1
console.log(cart)
cart[3]=cart[3]-1