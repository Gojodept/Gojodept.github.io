// import express from 'express';

// const app = express();
// app.listen(8080,()=>{
//     console.log("Server Started ");
// });
// //localhost:8080/?name=john  access throgh req.query
// app.use(express.json())
// let products=[]
// app.post("/",(req,res)=>{
//     const {id,name,price}=req.body;
//     const obj={
//         id,
//         name,
//         price,
//     }
//     products.push(req.body);
//     res.json({message:"Product created"});
// })


// app.get("/",(req,res)=>(
//     res.json(products)
// ))
// app.delete("/:id",(req,res)=>{
//     const id =req.params.id;
//     products=products.filter((product)=>product.id !=id)
//     res.json("Product deleted")
// })


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Old Index6.js file content 
import express from 'express';

const app = express();
app.listen(8080,()=>{
    console.log("Server Started ");
});
//I
app.use(express.json())// Middleware to parse JSON request bodies
let Students=[]
app.post("/",(req,res)=>{
    const {name,password,email}=req.body;
    const obj={
        name,
        password,
        email,
    }
    Students.push(req.body);
    res.json({message:"Student  regustered"});
})
//Middleware 
const auth = (req, res, next) => {
  const { name, password } = req.params;

  const user = Students.find(
    (student) => student.name === name && student.password === password
  );

  if (user) {
    next();
  } else {
    res.send("Access not given");
  }
};
app.get("/",auth,(req,res)=>(
    res.json(Students)
))

//Login Api
app.get("/login/:name/:password",auth,(req,res)=>{
     res.send("Login successful!");
})
//Delete Api  
app.delete("/:id",(req,res)=>{
    const id =req.params.id;
    products=products.filter((product)=>product.id !=id)
    res.json("Student Removed")
})