const express= require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs")
const https=require("https")
const date=require("./date.js")
const _ = require("lodash");
const { title } = require("process");
const app=express()
const port= 3000;
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

  // Open Weather API
  
  const location = ['Liverpool']
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

const Liverpool=  {
    title:
      "Liverpool a câștigat Champions League, după 2-0 cu Tottenham. Klopp a spart gheața, după două finale pierdute.",
    imgUrl:
      "https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZTAxdHJhbnNjb2Rlci5yY3Mt/cmRzLnJvJTJGc3RvcmFnZSUyRjIwMTkl/MkYwNiUyRjAyJTJGMTA4MDc3M18xMDgw/NzczX2p1cmdlbi1rbG9wcC5qcGcmdz0x/MDYwJmg9NjM2Jmhhc2g9OGUzMzk0YzQ3NTY4OTIzNTM1Y2Q1ZWEwNzc4M2U5ZTE=.thumb.jpg",
    description:
      "Liverpool a cucerit pentru a şasea oară trofeul UEFA Champions League, după ce a învins Tottenham în ultimul act al competiţiei. Duelul de pe Wanda Metropolitano a debutat cu cel mai rapid penalty din istoria finalelor competiţiei, dictat în secunda 23 şi confirmat de arbitrajul video. Egipteanul Salah l-a transformat, la prima atingere de balon.",
    paragraph:
      "După „afacerea englezească” din finala Europa League, câștigată de Chelsea, a venit rândul formației antrenate de Jurgen Klopp să câștige cel mai râvnit trofeu din fotbalul european. Finalele ambelor competiții, Europa League și UEFA Champions League, au fost disputate în 2019 de echipe englezești. În Liga Campionilor au mai fost până acum şase finale între echipe din aceeaşi ţară. Liverpool a fost la a doua finală consecutivă în Champions League după ce anul trecut a fost învinsă cu 3-1 de Real Madrid, în timp ce Tottenham a disputat prima sa finală în această competiţie. Liverpool a mai câştigat Liga Campionilor în 1977, 1978, 1981, 1984 şi 2005. Pe stadionul Metropolitano din Madrid, au marcat egipteanul Mohamed Salah în minutul 2, din penalty, şi belgianul Divock Origi, în minutul 87. Reuşita lui Salah ocupă locul doi în topul celor mai rapide deschideri de scor dintr-o finală de LC. Cel mai rapid gol a fost cel marcat de Paolo Maldini (AC Milan) în secunda 51 a finalei din 2005 cu Liverpool. Van Dijk de la Liverpool a fost desemnat jucătorul meciului. Meciul a fost precedat de un minut de reculegere în memoria fostului internaţional spaniol Jose Antonio Reyes, care a murit într-un accident rutier. De asemenea, în cadrul ceremoniei de deschidere, trupa americană Imagine Dragons a susţinut un recital. Finala a avut și un moment amuzant: a fost oprită în min. 18, când o tânără în costum de baie a intrat pe teren.",
    blogDate: "Publicat pe 02.06.2019 la 11:35:24",
  }


const weatherlocs = [{}];
const posts = [Liverpool]; 

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
 res.redirect("/compose")
})


app.get("/contact", function(req,res){
  res.render("contact", {
    cityName: weatherlocs[num2].locName,
    temp: weatherlocs[num2].temp,
    wheaterImg: weatherlocs[num2].iconUrl,
    wheaterDesc: weatherlocs[num2].weatherDesc,
  });
})

  app.get("/posts", function (req, res) {

    res.render("posts", {
      
      posts: posts,
      cityName: weatherlocs[num2].locName,
      temp: weatherlocs[num2].temp,
      wheaterImg: weatherlocs[num2].iconUrl,
      wheaterDesc: weatherlocs[num2].weatherDesc,
    });
   
 
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
        res.redirect("/posts");
    
    }
    
  });

  // end

})

  


app.get("/posts/:postName", function (req, res) {
const requestedTitle = _.lowerCase(req.params.postName); 

  
posts.forEach(function(post){

const storedTitle = _.lowerCase(post.title);
  if (storedTitle===requestedTitle){
 res.render("home", {
   title: post.title,
   imgUrl: post.imgUrl,
   description: post.description,
   paragraph: post.paragraph,
   blogDate: post.blogDate,

   cityName: weatherlocs[num2].locName,
   temp: weatherlocs[num2].temp,
   wheaterImg: weatherlocs[num2].iconUrl,
   wheaterDesc: weatherlocs[num2].weatherDesc,
 });
 console.log("Match found!");

}

  })
});


app.get("/failure", function(req,res){
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
})

app.get("/control", function(req,res){
  res.render("control", {
    cityName: weatherlocs[num2].locName,
    temp: weatherlocs[num2].temp,
    wheaterImg: weatherlocs[num2].iconUrl,
    wheaterDesc: weatherlocs[num2].weatherDesc,
  });
})

// Error page
app.get("*", function (req, res) {
  res.status(404);
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
});


app.listen(port, function(){
    console.log("Server started on port "+port+".")
})



































 