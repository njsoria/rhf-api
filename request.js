// testing out the request from postman to the API

var request = require("request");

var options = { method: 'GET',
  url: 'https://api.elliemae.com/encompass/v1/loans/6842aafb-fb9f-4384-b854-b4fbc24c16d6',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     Host: 'api.elliemae.com',
     'Postman-Token': '5a471a1e-4c4a-4fdb-a18c-b8951aa2d112,bff0b8c8-0e9f-4931-8c98-ce847df6a49b',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.19.0',
     'Content-Type': 'application/json',
     Authorization: 'Bearer PcWnuayp5myCB6cubk9paU3p7ehr' } };

request(options, function (error, res, body) {
  if (error) throw new Error(error);

  console.log(`status code: ${res.statusCode}`);
  console.log(body);
});
