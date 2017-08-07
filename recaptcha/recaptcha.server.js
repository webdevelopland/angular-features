const querystring = require("querystring");
const https = require("https");
const http = require("http");

module.exports = (ajax) => {

  var postData = querystring.stringify({
    secret: "6LcyFysUAAAAAHxoMF6EhR1tXBC2N9EO0G0PuXrL",
    response: ajax.import.recaptchaResponse,
    remoteip: ajax.req.headers["x-forwarded-for"] || ajax.req.connection.remoteAddress
  });

  var options = {
    hostname: "www.google.com",
    path: "/recaptcha/api/siteverify",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postData.length
    }
  };

  var req = https.request(options, (res) => {
    
    var bodyChunks = [];
    res.on("data", (chunk) => {
      bodyChunks.push(chunk);
    }).on("end", () => {
      var body = Buffer.concat(bodyChunks);
      ajax.reply( body.toString() );
    });
    
  });

  req.on("error", (err) => {
    ajax.error(err.message);
  });

  req.write(postData);
  req.end();
  
};