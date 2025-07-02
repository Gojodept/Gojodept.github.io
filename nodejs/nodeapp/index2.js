import http from "http";
const server = http.createServer((req,res)=>{
    res.end("Good MOrning");
});
server.listen(8080,()=>{
    console.log("Server Started")
});
