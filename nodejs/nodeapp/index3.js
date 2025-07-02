// import express from 'express'

// const app= express();
// app.listen(8080,()=>{
//     console.log("Server Started")
// });
// app.get("/",(req,res)=>{
//     res.send("morning")
// })
import express from 'express';

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("morning");
});
app.get("/user", (req, res) => {
  res.send("Hello Ari");
});
app.get("/ab*cd", (req, res) => {//ab*cd  * --> can be replace goes to the same end point 
  res.send("Hello Ari");
});//* matches anything in between ab and cd

// Will match all of these:

// bash
// Copy
// Edit
// /abcd
// /ab123cd
// /abXYZcd
// /ab-blah-blah-cd
// app.get("/products", (req, res) => {
//   res.status(201).json({name:"Product 1",price:45});
// });
app.get("/products", (req, res) => {
  const products=[
    {name:"Product 1",price:45},
    {name:"Product 2",price:55},
    {name:"Product 3",price:65}, 
  ];
  res.json(products);
});
app.get("/:name", (req, res) => {//It captures any path like /john, /ari, /name, /hello   Dynamic 
// name ---> variable
  res.send(req.params.name);// what ever is th eend point will be passed as parameter in the res.send
});

app.get("/stuents/:name", (req, res) => {
  res.send(req.params.name);
});
/////////////////////////////////////////////////
app.get("/stuents/:name/:age", (req, res) => {///stuents/:name/22  this the end point /stuents/:Ari/:22
  res.send(req.params.name+req.params.age);
});
app.get("/:name/:age", (req, res) => {///stuents/:name/22  this the end point /stuents/:Ari/:22
  res.send(req.params.name+req.params.age);
});
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
