import express from 'express';

const app = express();
app.listen(8080,()=>{
    console.log("Server Started ");
});
//I
app.use(express.json())
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