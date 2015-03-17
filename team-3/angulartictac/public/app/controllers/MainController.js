angsocketApp.controller('MainController', function($scope) {
    socket = io("http://localhost:8080/");
    $scope.message = '';
    // $scope.userList = [{ username : 'Test'}, { username : 'Another Test'}];
    $scope.availablePlayers = [];
    $scope.gameStarted = false;
    $scope.noplay = false;
    $scope.game = {};
    $scope.gameOver = false;

    $scope.gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    $scope.players = [];
   

    $scope.startSession = function() {
        $scope.currentUser = {
            username: $scope.username
        };
        $scope.sessionStarted = true;
        console.log($scope);
        socket.emit('userjoined', $scope.currentUser);
    }
    $scope.startGame = function() {
        var player2 = _.pick($scope.players.playWith, 'username');
        var between = {
            player1: $scope.currentUser,
            player2: player2
        };
        console.log($scope);
        socket.emit('beginGame', between);
    }
    $scope.processMove = function(row, col) {
        if ($scope.noplay) {
            alert('Please wait your turn');
        } else {
            console.log('Clicked row :' + row + ', col: ' + col);
            if ($scope.gameBoard[row][col] != '') {
                alert('Please click on an empty cell');
            } else {
                var moveDetails = {
                    game: $scope.game,
                    row: row,
                    col: col
                };
                socket.emit('process_move', moveDetails);
            }
        }
    }
    socket.on('mark', function(response) {
        var mark = response.mark;
        console.log('Marking : Row ' + response.row + ', Col : ' + response.col + ' with ' + mark);
        $scope.gameBoard[response.row][response.col] = mark;
        $scope.noplay = (response.no_play_username == $scope.currentUser.username) ? true : false;

        $scope.gameOver = response.gameOver;
        if( response.gameOver ){

          if( response.winner != 'cats' ){
               $scope.message = ((response.winner == $scope.currentUser.username) ? 
                'You have' : response.winner.toUpperCase() ) + ' won !';
          }else{
            $scope.message = 'Game over. And its drawn. ';
          }  
        
        }
        $scope.$apply();
    });
    socket.on('useradded', function(players) {
        // $scope.availablePlayers = _.without( players, _.findWhere(players, { username : $scope.currentUser.username }));
        $scope.availablePlayers = _.without(players, _.findWhere(players, {
            username: $scope.currentUser.username
        }));
        //  $scope.chosenUser = {};
        $scope.$apply();
    });
    socket.on('gameStarted', function(gameStats) {
        console.log(gameStats);
        if (gameStats.status == 'in_progress') {
            $scope.gameStarted = true;
            $scope.game = gameStats;
            $scope.message = 'Game started between ' + 
               gameStats.player1.username + ' and ' + gameStats.player2.username;
        }
        if (gameStats.status == 'busy') {
            $scope.message = 'Other player is busy';
        }
        $scope.$apply();
    });
});