var id = require("../helpers/id.js")(),
    fileUtils = require("../helpers/FileUtils.js"),   
    recordJsonObj = require('../records.json'),
    _ = require("underscore"),
    Game;
var fs = require('fs');
   
Game = function (attrs) {
    var status = "open",
        gameID = id.next(),
        board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
    
    if (!(this instanceof Game)) {
        var result = new Game(attrs);
        return result;
    }

    if (attrs !== undefined) {
        if (attrs.gameID !== undefined) {
            gameID = attrs.gameID;
        }
        if (attrs.status !== undefined) {
            status = attrs.status;
        }
        if (attrs.board !== undefined) {
            board = attrs.board;
        }
    }

    /**
     * Return a JSON representation of this game
     */
    this.toJSON = function () {
        return {
            "gameID":this.id(),
            "status":this.status(),
            "board":this.board()
        };
    };


    /**
     * Insert a symbol into a specified row and columbn
     * Throws a RangeError if the row or col is out of bounds
     * Tests for a win and updates status appropriately
     */
    this.applyMove = function (sym, row, col) {
        var i;
        
        if (row < 0 || row > 2 || col < 0 || col > 2) {
            console.log(row + " " + col);
            throw new RangeError("row and col must be between 0 and 2 inclusive");
        } else if (sym !== "X" && sym !== "O") {
            throw new TypeError("sym must be X or O");
        } else {
            
            board[row*3+col] = sym;

            for (i = 0; i < 3; ++i) {
                if (board[i] === board[i+3] && board[i+3] === board[i+6] &&
                    board[i] !== "_") {
                    this.status(board[i] + " Wins");
                } else if (board[i*3] === board[i*3+1] && 
                           board[i*3+1] === board[i*3+2] &&
                           board[i*3] !== "_") {
                    this.status(board[i*3] + " Wins");
                }
            }
            if (((board[0] === board[4] && board[4] === board[8]) ||
                (board[2] === board[4] && board[4] === board[6])) &&
                board[4] !== "_") {
                this.status(board[4] + " Wins");
            }
            if (board.indexOf("_") === -1 && this.status() === "playing") {
                this.status("Cat Wins");
            }
            console.log(this.status());
        }
    };

    /**
     * Return the board array
     */
    this.board = function () {
        return board;
    };


    /**
     * Getter/Setter for status attribute
     * setter returns this object for chaining
     * setter sets the status to the new status
     * TODO: Check for valid status when updating status
     */
    this.status = function (newStatus) {
        if (newStatus === undefined) {
            return status;
        } else {
            status = newStatus;
            return this;
        }
    };

    /**
     * Getter for gameID attribute
     */
    this.id = function () {
        return gameID;
    };

    /**
     * alias for gameID
     */
    this.gameID = this.id;

    /**
     * Save game object to redis
     */
    this.save = function (callback) {
    	
    	/*fs.writeFile('../records.json', '{"gameIds":[]}', function (err) {
    		   if (err) throw err;
    		   console.log('It\'s saved!');
    		 });*/
    	/*fs.truncate('/app/records.json', 0, function(){console.log('done')});*/

        console.log("About to save game with id (" + this.id() + " having status (" + this.status() + ")");

        var jsonObj = {};
        jsonObj.gameID = this.id();
        jsonObj.status = this.status();
        jsonObj.board = this.board();
        // redis.set("game:"+jsonObj.gameID, JSON.stringify(jsonObj), callback);
    


        var contentLength = recordJsonObj.gameIds.length;
        if(!contentLength) {
            // the file is empty          
            recordJsonObj.gameIds[contentLength] = jsonObj;
            // fileUtils.write('records.json', JSON.stringify(recordJsonObj), callback);
        }
        else {
            // the file is not empty, will search if the key already exists.
            // if it does then just modify the status, otherwise create a fresh entry
            var matchFound = false;
            for(var myKey in recordJsonObj.gameIds) {
               if(recordJsonObj.gameIds[myKey].gameID === jsonObj.gameID) {
                    matchFound = true;
                    console.log("Updating status for game id (" + recordJsonObj.gameIds[myKey].gameID + " ) with (" + jsonObj.status + ")");
                    recordJsonObj.gameIds[myKey].status = jsonObj.status;
               }
            }            

            if(!matchFound) {
                // suppose to create a new entry
                recordJsonObj.gameIds[contentLength] = jsonObj;
            }

        }

      /*  recordJsonObj.gameIds[contentLength] = jsonObj;*/
        fileUtils.write('records.json', JSON.stringify(recordJsonObj), callback);        
        callback;

    };
};

/**
 * Find game based on a query
 * right now it searches only by gameID
 * TODO: allow it to search by multiple things
 */
Game.find = function (query, callback) {       

    var search = query.gameID;

    for(var myKey in recordJsonObj.gameIds) {
       if(recordJsonObj.gameIds[myKey].gameID === search) {
            var searchedObj = recordJsonObj.gameIds[myKey];
       }
    }   
    game = new Game(searchedObj);    
    callback(null, game);
};

module.exports = Game;
