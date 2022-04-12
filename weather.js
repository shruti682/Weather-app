const { on } = require("events");
const express= require("express");
const https= require("https");
const bodyParser=require("body-parser")

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{
    const query=req.body.cityName;
    const appid="6c44f5add77ef49d908344fb27aac119";
    const units= "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ units +"&appid="+appid;
    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data",function(data){
            const weatherData=JSON.parse(data); //js object
            const des=weatherData.weather[0].description;
            const temp=weatherData.main.temp;
            const icon=weatherData.weather[0].icon;
            res.write("<p>The current weather is "+ des +".</p>");
            res.write("<h1>The temperature in "+ query +" is "+temp+" degrees celcius.</h1>");
            const img_url="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<img src="+img_url+">");
            res.send();
        });
    });
});

app.listen(3000,function()
{
    console.log("Server is started running at port 3000");
});