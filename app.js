const express= require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs")
const https=require("https")
const date=require("./date.js")
var _ = require("lodash");
const { title } = require("process");
const app=express()
const port= 3000;
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

  // Open Weather API
  
  let location = ['Liverpool']
  let num3 = 0

const articleData = {
  title: "ERROR 404",
  imgUrl:
    "https://img.freepik.com/premium-vector/internet-connection-problem-concept-illustration-404-found-error-page-isolated-white-background-funny-gray-cat-isolated-vector-illustrations_450656-204.jpg?w=2000",
  description: "Whoops! This is not what you were looking for",
  paragraph:
    'In computer network communications, the HTTP 404, 404 not found, 404, 404 error, page not found or file not found error message is a hypertext transfer protocol (HTTP) standard response code, to indicate that the browser was able to communicate with a given server, but the server could not find what was requested. The error may also be used when a server does not wish to disclose whether it has the requested information.The website hosting server will typically generate a 404 Not Found web page when a user attempts to follow a broken or dead link; hence the 404 error is one of the most recognizable errors encountered on the World Wide Web.',
  blogDate: "12.34.5678, 12:34:56"
};

// Num ---- articleData
// Num2 ---- weatherlocs
// Num3 ---- location




let weatherlocs = [{}];
let posts = [articleData]; 
let topics=['posts',undefined,'compose','contact']
let num2 = 0
let num = 0;

  app.get("/", function(req,res){
 res.redirect("/posts")

  });




app.get("/compose", function(req, res){

res.render("compose", {
  cityName: weatherlocs[num2].locName,
          temp: weatherlocs[num2].temp,
          wheaterImg: weatherlocs[num2].iconUrl,
          wheaterDesc: weatherlocs[num2].weatherDesc
})
})

app.post("/compose", function(req, res){
const post={
 title : req.body.titleTxt,
 imgUrl : req.body.urlTxt,
 description : req.body.descriptionTxt,
 paragraph :req.body.paragraphTxt,
 blogDate : date.articleDate()
}

 posts.push(post)
num++
 res.redirect("/posts")
})


app.get("/contact", function(req,res){
  res.render("contact", {
    cityName: weatherlocs[num2].locName,
    temp: weatherlocs[num2].temp,
    wheaterImg: weatherlocs[num2].iconUrl,
    wheaterDesc: weatherlocs[num2].weatherDesc,
  });
})

app.post("/contact", function(req,res){
  res.redirect("/contact")
})

  app.get("/posts", function (req, res) {

    res.render("posts", {
      
      title: posts[num].title,
      imgUrl: posts[num].imgUrl,
      description: posts[num].description,
      paragraph: posts[num].paragraph,
      blogDate: posts[num].blogDate,
      posts: posts,
      cityName: weatherlocs[num2].locName,
      temp: weatherlocs[num2].temp,
      wheaterImg: weatherlocs[num2].iconUrl,
      wheaterDesc: weatherlocs[num2].weatherDesc,
    });
   
    console.log(num2);
    console.log(num3);
    console.log(location);
    console.log(weatherlocs);
  });

app.post("/posts", function(req, res){
  // Weather get
 locationA=req.body.city;

  const appid = "b13895394aabe82ee9fe9c8764b1f669";
  const lang = "ro";
  const units = "metric";
  const apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    locationA +
    "&appid=" +
    appid +
    "&lang=" +
    lang +
    "&units=" +
    units;

  https.get(apiURL, (response) => {
    console.log("Weather status code: " + response.statusCode);
      
    if (response.statusCode !== 200) {
  

      res.redirect("/failure");
    } else {
  
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;
        const iconCode = weatherData.weather[0].icon;
        const iconUrl =
          "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        const locName = weatherData.name;
 
        const weatherLoc = {
          iconUrl,
          temp,
          weatherDesc,
          locName,
        };
        weatherlocs.push(weatherLoc)
        num2++
      });
    res.redirect("/posts")
    }
    
  });

  // end

})

  


app.get("/posts/:postName", function (req, res) {
const titleSent = _.lowerCase(req.params.postName); 

  
posts.forEach(function(item){

const itemTitle = _.lowerCase(item.title);

      if (titleSent === itemTitle) {
            res.render("home", {
              title: posts[num].title,
              imgUrl: posts[num].imgUrl,
              description: posts[num].description,
              paragraph: posts[num].paragraph,
              blogDate: posts[num].blogDate,
              posts: posts,
              cityName: weatherlocs[num2].locName,
              temp: weatherlocs[num2].temp,
              wheaterImg: weatherlocs[num2].iconUrl,
              wheaterDesc: weatherlocs[num2].weatherDesc,
            });
        console.log("Match found!");
        req.params.postName= _.kebabCase(req.params.postName)
      }
      else{
        res.render("home", {
          title: articleData.title,
          imgUrl: articleData.imgUrl,
          description: articleData.description,
          paragraph: articleData.paragraph,
          blogDate: articleData.blogDate,
          cityName: weatherlocs[num2].locName,
          temp: weatherlocs[num2].temp,
          wheaterImg: weatherlocs[num2].iconUrl,
          wheaterDesc: weatherlocs[num2].weatherDesc,
        });
      }
  })
});

app.post("/posts/:postName", function (req,res){
  const postName = req.params.postName

})

app.get("/failure", function(req,res){
  res.render("failure")
})

app.listen(port, function(){
    console.log("Server started on port "+port+".")
})



































 