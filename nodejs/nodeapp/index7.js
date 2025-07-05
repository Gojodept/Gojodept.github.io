import express from 'express'

const app = express()

// app.use("/images",express.static("images")); //it is accisble to another folder
// app.use(express.static("images"));  //it means folder name nhi dena h bs file name dena h wo automaticlly image folder me search krega

app.use(express.static("public"));
app.listen(8080,()=>{
    console.log("Server Started")
})
app.get("/products",(req,res)=>{
    res.send("Product List");
});