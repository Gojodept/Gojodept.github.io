import express from 'express';

const app = express();
app.listen(8080,()=>{
    console.log("Server Started ");
})
const logger =(req,res,next)=>{
    req.msg="Hello";
    next();
};
//logger is the middle ware 
//app.use(logger);
app.get("/",(req,res)=>{
    res.send(req.msg+"World");
})
app.get("/products",logger,(req,res)=>{
    res.send(req.msg+"Products");
})


//Middleware Authetication        

const auth=(req,res,next)=>{
    if(req.params.name=="John")
       next();
    else
       res.send("Access not given")
}

app.get("/:name",auth,(req,res)=>{
 res.send("Hello world")
})


