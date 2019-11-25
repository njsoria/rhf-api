exports.handler = async (event) => {
    
    var request = require("request-promise-native");
    
    if(event.queryStringParameters !== null){
        console.log(event.queryStringParameters);
    }
    
    // grab the type and auth from the request
    let type = event.queryStringParameters.type;
    let auth = event.queryStringParameters.auth;
    let loanID = event.queryStringParameters.loanID;
    let postURI = event.queryStringParameters.postURI;

    // create an object of functions for the main function
    var getLoanData = {

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
                return {type: type,
                            data: response};
            })
            .catch(function(err){
                if (err) throw new Error(err);
            });
        },

        postData: function(data) {
            return request.post({
                "uri": postURI,
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
    
    function test() {
        return getLoanData.postData();
    }

    return main().then(function(result){
        console.log(result);
        
        // setup the api response
        let response = {
        statusCode: 200,
        headers: {
            "x-custom-header" : "some value"
        },
        body: JSON.stringify(result)
        };
    
        // return the response
        return response;
    });
}