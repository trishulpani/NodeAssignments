var express = require("express");
var app = express();
var socket = require("socket.io");
var server = require("http").createServer(app);
var http = require('http');
var Game = require('./game');
var _ = require('underscore');
app.use(express.static(__dirname + '/public'));
var port = 8080;
var io = socket(server);
server.listen(port);
var users = [];
var game = new Game();
console.log('Server is up and listening to : ' + port + ' and Socket open !');
io.on("connection", function(socket) {
    console.log("Connected to socket id " + socket.id);
    socket.on('userjoined', function(user) {
        users.push({
            username: user.username,
            status: 'available',
            socketId: socket.id,
            mark: 'O'
        });
        console.log(JSON.stringify(users));
        socket.join(user.username);
        io.emit('useradded', users);
    });
    socket.on('beginGame', function(between) {
        console.log(JSON.stringify(between) + '. Initiated by socket id : ' + socket.id);
        socket.join(between.player1.username);
        console.log('Starting game between ' + between.player1.username + ' and ' + between.player2.username);
        var gameStat = game.newGame(between.player1, between.player2);
       
        if (gameStat.status == 'in_progress') {
            
            //find user with the socket id that initiated this request, and allow them to mark 'X'
            //and the other player 'O'.
            var markXUser = _.find(users, function(user) {
                if (user.socketId == socket.id) {
                     return true;
                }
            });

            if (gameStat.player1.username == markXUser.username) { //then player 1 gets 'X'
                gameStat.player1.mark = 'X';
                gameStat.player2.mark = 'O';
            } else {
                gameStat.player1.mark = 'O';
                gameStat.player2.mark = 'X';
            }
            _.each(users, function(user) { //change user status 
                if (user.username == between.player1.username || user.username == between.player2.username) {
                    console.log('Changing status of : ' + user.username + ' to busy');
                    user.status = 'busy';
                }
            });
            console.log(JSON.stringify(gameStat));
            [between.player1, between.player2].forEach(function(player) {
                io.sockets. in (player.username).emit('gameStarted', gameStat);
            });
        } else {
            [between.player1, between.player2].forEach(function(player) {
                var foundUser = _.find(users, function(user) {
                    if (user.username == player.username) {
                        return true;
                    }
                });
                if (foundUser && foundUser.status != 'busy') {
                    io.sockets. in (player.username).emit('gameStarted', gameStat);
                } else {
                    console.log('Not notifying : ' + foundUser.username + ' as status is busy');
                };
            });
        }
    });
   
    socket.on('process_move', function(moveDetails) {
        console.log('Processing move for Game ID : ' + moveDetails.game.id + '. Request initiated by socket ID : ' + socket.id);
       

        var whichMarkUser = _.find(users, function(user) {
            if (user.socketId == socket.id) {
                return true;
            }
        });



        //socket.join( moveDetails.game.player1.username );
        //
        var gameInProgress = game.findGame(moveDetails.game.id);

        if( gameInProgress.moves == 0 ){ //this is the first move.
           //the player whose username matches the one that made the first move, gets to mark 'X'
          console.log('Over riding symbol '); 
          whichMarkUser.mark = 'X';
        }
      
        gameInProgress.moves += 1;
        //find the corresponding player of the game:
        if (gameInProgress.player1.username == whichMarkUser.username) { //current user is player1
            //calculate score for player
            gameInProgress.player1.score += game.gameCellWeights[moveDetails.row][moveDetails.col];
        } else { //the current player is player 2 since there are only 2 players
            gameInProgress.player2.score += game.gameCellWeights[moveDetails.row][moveDetails.col];
        }
        //check win status
        if(game.checkWin(gameInProgress.player1.score)) {
            console.log(' Player : ' + gameInProgress.player1.username + ' has won!');
            gameInProgress.gameOver = true;
            gameInProgress.winner = gameInProgress.player1.username;
        }else if(game.checkWin(gameInProgress.player2.score)) {
            console.log(' Player : ' + gameInProgress.player2.username + ' has won!');
            gameInProgress.gameOver = true;
            gameInProgress.winner = gameInProgress.player1.username;
        };
        
        if(gameInProgress.gameOver) {} else { //check for draw
            
            if(gameInProgress.moves == 9) {
                gameInProgress.gameOver = true;
                gameInProgress.winner = 'cats';
            }
        }

        console.log( JSON.stringify(gameInProgress));

        [moveDetails.game.player1, moveDetails.game.player2].forEach(function(player) {
            console.log(' Notifying ' + player.username);
            io.sockets.in(player.username).emit('mark', {
                row: moveDetails.row,
                col: moveDetails.col,
                mark: whichMarkUser.mark,
                no_play_username: whichMarkUser.username,
                winner : gameInProgress.winner,
                gameOver : gameInProgress.gameOver
            });
        });
    });


    socket.on('gameover', function( game ){

    });

    socket.on('error', function(err) {
        console.log(err);
    })
});
io.on('disconnect', function(socket) {
    console.log('client disconnected');
});