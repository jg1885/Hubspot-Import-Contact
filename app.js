
//variable needed / frameworks npm's used
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const querystring = require("querystring");

const app = express();


//serves static files like css html js img's
app.use(express.static('public'));
//parses the body to be urlencoded
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req, res) {

var first = req.body.fName;
var last = req.body.lName;
var email = req.body.email;


var data = querystring.stringify({
  'email': email,
  'firstname': first,
  'lastname': last
});


var options = {
  url: "https://forms.hubspot.com/uploads/form/v2/{hubsot_id}/{form_guid}",
 	method: 'POST',
  headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': data.length
	},
  body: data
};


request(options, function(error, response, body) {

if(error) {
       res.sendFile(__dirname + "/failure.html");
     }
    else {
      if (response.statusCode === 204) {
          res.sendFile(__dirname + "/success.html");
      }
      else {
        res.sendFile(__dirname + "/failure.html");
    }
}

console.log(response.statusCode);

});


console.log(req.body);
//end of POST function
});


//redirect for the homepage
app.post("/failure.html", function (req, res) {
  res.redirect("/");
});




app.listen(3000, function(req, res) {
console.log("Wormhole Opened Up Suddenly on Port 3000");


});
