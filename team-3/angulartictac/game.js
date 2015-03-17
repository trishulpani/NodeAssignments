var uuid = require('node-uuid');
var _ = require('underscore');

function Game() {
    this.games = [];
    var winMatrix = [7, 56, 448, 73, 146, 292, 273, 84];
    this.gameCellWeights = [
        [1, 2, 4],
        [8, 16, 32],
        [64, 128, 256]
    ];
    this.checkWin = function(score) {
        for (var i = 0; i < winMatrix.length; i += 1) {
            if ((winMatrix[i] & score) === winMatrix[i]) {
                return true;
            }
        }
        return false;
    },
    this.generateGameId = function() {
        return uuid.v4();
    }
    this.newGame = function(player1, player2) {
        var game = {};
        if (!this.playersAreAvailable(player1, player2)) {
            game.id = this.generateGameId();
            game.player1 = player1;
            game.player1.score = 0;
            game.player2 = player2;
            game.player2.score = 0;
            game.status = 'in_progress';
            game.moves = 0;
            game.gameOver = false;
            this.games.push(game);
        } else {
            game.status = 'busy';
        }
        return game;
    }
    this.playersAreAvailable = function(player1, player2) {
        if (this.games.length == 0) {
            console.log('no games in progress, both players are available.');
            return false; //no games in progress, both players are available.
        } else {
            console.log(' Checking if players : ' + player1.username + ' & ' + player2.username + ' are busy');
            var busy = _.find(this.games, function(game) {
                if (game.player1.username == player1.username || game.player1.username == player2.username || game.player2.username == player1.username || game.player2.username == player2.username) {
                    console.log('Players are busy');
                    return true;
                }
            });
            console.log('Verdict : players are ' + (busy ? 'Busy' : 'Not busy'));
            return busy;
        }
    }
    this.findGame = function(gameId) {
        var game = _.find(this.games, function(game) {
            if (game.id == gameId) {
                console.log('Game found for ID : ' + game.id);
                return true;
            }
        });
        return game;
    }
    this.processMove = function(moveDetails, row, col) {
        var game = this.findGame(moveDetails.game.id);
    }
}
module.exports = Game;