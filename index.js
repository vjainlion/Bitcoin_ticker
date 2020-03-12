//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request  = require("request");

const app  = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
//  console.log(req.body);
var v1 = req.body.crypto;
var v2 = req.body.fiat;
var quantity = req.body.quantity;
var result = v1+v2;
var options=
{
  url:"https://apiv2.bitcoinaverage.com/convert/global",
  method:"GET",
  qs:{
    from:v1,
    to:v2,
    amount:quantity
  }
};
  request(options,function(error,response,body){
    //console.log(body);
    //console.log(response);
    var data = JSON.parse(body);
    var price = data.price;
    var cuurentDate = data.time;
    res.write("<p>The current date and time is "+cuurentDate+"</p>");
    res.write("<h1>The cuurent price for " + quantity +" "+v1+" is   " + price+ " "+v2+"</h1>");

    res.send();
  });
  //  console.log(data.open.week);
    //console.log(last);
  });


app.listen(3000,function(){
  console.log("Server started at 3000");
});
