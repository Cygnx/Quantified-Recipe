var fs = require("fs");  // use file system                                     
var sqlite3 = require("sqlite3").verbose();  // use sqlite            
var prompt = require("prompt")          

// global variable will contain database                                        
var db=null;

function openDB() {
    var dbFile = "fnw.db";
    // check filesystem to make sure database exists                            
    var exists = fs.existsSync(dbFile);

    if (!exists) {
        console.log("Missing database "+dbFile);
    } else {
        // construct Javascript database object to represent the                
        // database in our program. db is a global variable                     
        db = new sqlite3.Database(dbFile); // open it if not already there      
    }
}

function getFood() {
    // issues the prompt and specifies the callback function                    
    // that is called when the user finally responds                            
    prompt.get('food',
               // callback function                                             
               function (err, result) {
                  lookup(result.food);
               } // end callback function                                       
              ); // end prompt.get                                              
}
openDB(); // open the database      
prompt.start(); // prepare for keyboard input                                   
 getFood();
 function lookup(food){
	db.get("SELECT * FROM WaterUsage WHERE ingredient='"+food+"'", function(err, result){
		//console.log(result);
		console.log(JSON.stringify(result, null, "   "));
	});
 }