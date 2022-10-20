const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const request = require("request");
const https =require("https");

app.use(bodyParser.urlencoded({extented:true}));

app.use(express.static("public"))

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})
app.get("/Project1",function(req,res){
  res.sendFile(__dirname+"/Project1.html")
})
app.get("/Project2",function(req,res){
  res.sendFile(__dirname+"/Project2.html")
})
app.get("/Project3",function(req,res){
  res.sendFile(__dirname+"/Project3.html")
})
app.get("/Project4",function(req,res){
  res.sendFile(__dirname+"/Project4.html")
})
app.get("/Project5",function(req,res){
  res.sendFile(__dirname+"/Project5.html")
})
app.get("/Project6",function(req,res){
  res.sendFile(__dirname+"/Project6.html")
})
app.post("/",function(req,res){
const name = req.body.name;
const subject = req.body.subject;
const email = req.body.email;
const message = req.body.message;

var data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        NAME:name,
        SUB:subject,
        MESSAGE:message
      }
    }
  ]
}

const jsondata =JSON.stringify(data);

const url = "https://us20.api.mailchimp.com/3.0/lists/633f5a1a82"

const options = {
  method:"POST",
  auth:"Gurdarshan:08e75dcd6e9bf3b8cd120935d4d1eb79-us20"
}
const request = https.request(url,options,function(response){
if(response.statusCode == 200){
  res.sendFile(__dirname+"/success.html")
}
else{
  res.sendFile(__dirname+"/failure.html")
}
response.on("data",function(data){
  console.log(JSON.parse(data));
})
})

request.write(jsondata);
request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
})



// App Id
// 08e75dcd6e9bf3b8cd120935d4d1eb79-us20

// List Id
// 633f5a1a82
