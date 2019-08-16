var express = require("express"); 

var PORT = process.env.PORT || 8000; 

var app = express(); 

app.use(express.static("public")); 

//Parsing application body as JSON
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

//Set handlebars
var exphbs = require("express-handlebars"); 
app.engine("handlebars", exphbs({ default: true })); 
app.set("view engine", "handlebars"); 

//Important routes and give the server access to them 
var routes = require("./controllers/burgers_controller.js"); 

app.use(routes); 

//Starting the server
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT); 
})