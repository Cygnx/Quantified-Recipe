// module to handle the dynamic Web pages
var ann = require("./annotater");
var http = require("http");
var request = require("request");
var apiKEY = "";//


function dynamic(response, urlObj, JSONStringBase) {
    response.writeHead(200, {
        "Content-Type": "application/JSON"
    });
    var requestString;
    if (urlObj.pathname.split("/")[2] == "getKeywords" || urlObj.pathname.split("/")[2] == "getRecipe") {

        if (urlObj.pathname.split("/")[2] == "getKeywords")
            requestString = "http://food2fork.com/api/search?key=" + apiKEY + "&q=" + urlObj.query.split("=")[1];
        if (urlObj.pathname.split("/")[2] == "getRecipe")
            requestString = "http://food2fork.com/api/get?key=" + apiKEY + "&rId=" + urlObj.pathname.split("/")[3];

        request(requestString, function(error, res, body) {
            if (!error && response.statusCode == 200) {
                console.log("f2f says 200");
            //    response.write(body);
				   if (urlObj.pathname.split("/")[2] == "getRecipe"){
					   anotater = new ann.Annotater(body);
					   anotater.annotate(function(newRecipeJSON) {
					   console.log(newRecipeJSON);
					    response.write(newRecipeJSON);
					    response.end();
					});
				   }
				   else {
					   response.write(body);
					    response.end();
				   }
            } else {
                console.log("f2f says error", error);
            }
           // response.end();
        });
    }
}
ann.openDB();
exports.dynamic = dynamic;