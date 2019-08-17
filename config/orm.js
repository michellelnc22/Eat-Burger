//Import MySQL connection

var connection = require("../config/connection.js"); 

//Helper function for SQL syntax
//3 question marks are needed to write the query
//This helper function loops through a creates an array of question marks and turns it into string

function printQuestionMark (num) {

    var array = []; 

    for (var i = 0; i < num; i++) {
        array.push("?"); 
    }

    return array.toString(); 
}

//Helper function to convert key/value pairs to SQL syntax

function objectToSql(object) {
    var array = []; 

    //Loop through the keys and push the key/value pairs to SQL
    for (var key in ob) {
        var value = ob[key]; 
        //Skips hidden properties

        if (Object.hasOwnProperty.call(ob, key)) {
            //Add quotations to string with spaces
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'"; 
            }
            array.push(key + "=" + value); 
        }
    }

    //Translate array of strings to a single comma separated string
    return array.toString(); 
}

//Objects for all our SQL statement functions

var orm = {

    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";"; 
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err; 
            }

            cb(result); 
        }); 
    }, 

    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table; 

        queryString += " ("; 
        queryString += cols.toString(); 
        queryString += ") "; 
        queryString += "VALUES ("; 
        queryString += printQuestionMarks(vals.length); 
        queryString += ") "; 

        console.log(queryString); 

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err; 
            }

            cb (result); 
        }); 
    }, 

    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table; 

        queryString += " SET "; 
        queryString += objectToSql(objColVals); 
        queryString += " WHERE "; 
        queryString += condition; 

        console.log(queryString); 
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err; 
            }

            cb(result); 
        }); 
    }, 

    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table; 
        queryString += " WHERE "; 
        queryString += condition; 

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err; 
            }

            cb(result); 
        }); 
    }
}; 

//Export the ORM object for the model
module.exports = orm; 
    
