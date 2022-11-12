const express= require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs")
const https=require("https")
const date=require("./date.js")
const app=express()
const port= 3000;
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))



const articleData = {
  title: "Your title",
  imgUrl:
    "https://img.freepik.com/premium-vector/internet-connection-problem-concept-illustration-404-found-error-page-isolated-white-background-funny-gray-cat-isolated-vector-illustrations_450656-204.jpg?w=2000",
  description:
    '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"',
  paragraph:
    '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.""',
  blogDate: "12.34.5678, 12:34:56",
};

let num = 0;
let posts = [articleData]; 


  app.get("/", function(req,res){

    res.render("home", {
    "title": posts[num].title, 
    "imgUrl": posts[num].imgUrl, 
    "description":posts[num].description,
    "paragraph": posts[num].paragraph,
    "blogDate":posts[num].blogDate,
    "posts":posts})
  });

app.get("/compose", function(req, res){
res.render("compose")
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
 res.redirect("/")
})


app.get("/contact", function(req,res){
  res.render("contact", {
  });
})

app.get("/about", function(req, res){
  res.render("about", {
    "posts": posts
  })
})

app.listen(port, function(){
    console.log("Server started on port "+port+".")
})
































  // // Open Weather API

  // let cityName = req.body.city;
  // const appid = "b13895394aabe82ee9fe9c8764b1f669";
  // const lang = "ro";
  // const units = "metric";
  // const apiURL =
  //   "https://api.openweathermap.org/data/2.5/weather?q=" +
  //   cityName +
  //   "&appid=" +
  //   appid +
  //   "&lang=" +
  //   lang +
  //   "&units=" +
  //   units;


  // //  Get weather inside app.get{....}
  // https.get(apiURL, (response) => {
  //   console.log("Weather status code: " + response.statusCode);

  //   response.on("data", (data) => {
  //     const watherData = JSON.parse(data);
  //     const temp = watherData.main.temp;
  //     const weatherDesc = watherData.weather[0].description;
  //     const iconCode = watherData.weather[0].icon;
  //     const iconUrl =
  //       "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";


  //     res.render("compose", {
  //       // weather
  //       "weatherIcon": iconUrl,
  //       "temp": temp,
  //       "wheaterDesc": weatherDesc,
  //       "cityName": cityName,
  //     });
  //   });
  // });
  // // End get weather