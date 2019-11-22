var request = require("request-promise-native");

exports.handler = function(event, context, callback) {

    // grab the type and auth from the request
    let type = event.queryStringParameters.type;
    let auth = event.queryStringParameters.auth;
    let loanID = event.queryStringParameters.loanID;

    // create an object of functions for the main function
    var getLoanData = {
        token: null,

        getData: function() {
            return request.get({
            "uri": "https://api.elliemae.com/encompass/v1/loans/" + loanID,
            "json": true,
            "headers": {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth
                }
            })
            .then(function(response){
                return JSON.stringify({type: type,
                            data: response});
            })
            .catch(function(err){
                if (err) throw new Error(err);
            });
        },

        postData: function(data) {
            return request.post({
                "uri": "https://hooks.zapier.com/hooks/catch/5978432/o4jsk70/",
                "json": true,
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": data
            });
        }
    }

    function main() {
        return getLoanData.getData()
            .then(getLoanData.postData);
    }

    main().then(function(result){
        console.log(result);
        return result;
    });
}