const playerdialog = document.getElementById('playerdialog');

const playerbtn = document.getElementById('player');

const playerform = document.getElementById('playerform');

const gameboard = document.querySelector('.gameboard');

const winmessage = document.getElementById('winmessage');

playerbtn.addEventListener('click', () => {
    playerdialog.showModal();
})

const restartbtn = document.getElementById('restartgame');

restartbtn.addEventListener("click", () => {
    gameBoard.clearBoard();
    gameBoard.makeDomBoard();
    winmessage.textContent = "";
})

const confirmbtn = document.getElementById("confirmBtn");

confirmbtn.addEventListener("click", (event) => {
    event.preventDefault();
    
    let playername = document.querySelector("#fname").value;
    let playertype = document.querySelector("#type");
    playertype= playertype.options[playertype.selectedIndex].text;

    let player = Player(playername, playertype);
    displayController.updatePlayer(player);

    playerform.reset();
    playerdialog.close();
});

const gameBoard = (function() {
    const board = new Array(3);

    for (let i = 0; i < 3; i++) 
    {
        board[i] = new Array(3);
    }

    gameboard.removeChild(gameboard.firstChild);

    const makeDomBoard = () => {
        for (let i = 0; i < 3; i++) 
        {
            for (let j = 0; j < 3; j++) 
            {
                let cell = document.createElement('button');
                cell.classList.add('gamecell');
                cell.addEventListener('click', () => {
                    displayController.playRound(i,j);
                })
                gameboard.appendChild(cell);
            }
        }
    }

    const clearBoard = () => {
        for (let i = 0; i < 3; i++) 
        {
            for (let j = 0; j < 3; j++) 
            {
                board[i][j] = null;
            }
        }

        while (gameboard.firstChild) {
            gameboard.removeChild(gameboard.firstChild);
        }
        console.log(gameboard.firstChild);        
}

    const getBoard = () => board;

    const printBoard = () => {
        console.log(board);
        console.log(gameboard);
    }

    return { 
        getBoard,
        printBoard,
        clearBoard,
        makeDomBoard
    }
})();

const Player = (name, type) => { 

    const getType = () => type;

    const getName = () => name;

    return {
        getName,
        getType
    };
}

const displayController = (function() {
    const board = gameBoard.getBoard();
    gameBoard.makeDomBoard();
    
    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');
    let activePlayer = player1;

    const updatePlayer = (player) => {
        player1 = player;
        activePlayer = player1;
        if (player.getType() === 'O'){
            console.log("Need to change player2 to X type");
            player2 = Player('Player2', 'X');
        }
    }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };
    
    const getActivePlayer = () => activePlayer;

    const checkRows = () => {
        if (board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[0][0] === activePlayer.getType()){
            return true;
        }
        else if (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[0][1] === activePlayer.getType()){
            return true;
        }
        else if (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[0][2] === activePlayer.getType()){
            return true;
        }
        else {
            return false;
        }
    };

    const checkColumns = () => {
        if (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][0] === activePlayer.getType()){
            return true;
        }
        else if (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][0] === activePlayer.getType()){
            return true;
        }
        else if (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][0] === activePlayer.getType()){
            return true;
        }
        else {
            return false;
        }
    };

    const checkDiagonals = () => {
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] === activePlayer.getType()){
            return true;
        }
        else if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] === activePlayer.getType()){
            return true;
        }
        else {
            return false;
        }
    };

    const checkTie = () => {
        if (board[0][0] != null && board[0][1] != null && board[0][2] != null && board[1][0] != null && board[1][1] != null && board[1][2] != null && board[2][0] != null && board[2][1] != null && board[2][2] != null){
            return true;
        }
        else {
            return false;
        }
    }

    const checkForWin = () => {
        let rowwin = checkRows();
        let columnwin = checkColumns();
        let diagonalwin = checkDiagonals();
        let tie = checkTie();

        if (rowwin === true || columnwin === true || diagonalwin === true){
            console.log(activePlayer.getName() + " WINS!!!");
            return true;
        }
        else if (tie === true){
            return 'tie';
        }
    };

    const playRound = (row, column) => {
        if (board[row][column] === 'X' || board[row][column] === 'O')
        {
            console.log("already placed something here");
            return;
        }
        board[row][column] = activePlayer.getType();
        let cell = gameboard.childNodes[(row*3)+column];
        cell.textContent = activePlayer.getType();
        let win = checkForWin();
        if (win === true)
        {
            gameBoard.printBoard();
            winmessage.textContent = `Player ${activePlayer.getName()} has won!!!`;
            if (activePlayer.getName() === player2.getName())
            {
                switchPlayerTurn();
            }
            return;
        }
        else if (win === 'tie')
        {
            gameBoard.printBoard();
            winmessage.textContent = `The Game is a tie!!!`;
            if (activePlayer.getName() === player2.getName())
            {
                switchPlayerTurn();
            }
            return;
        }
        switchPlayerTurn();
        gameBoard.printBoard();
    }

    return { 
        getActivePlayer,
        playRound,
        updatePlayer
    }
})();