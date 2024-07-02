const board = document.querySelectorAll('#board button');
let player = 1;
let boardArray = new Array(3).fill().map(_ => new Array(3).fill(0));

board.forEach((el, i) => {
    el.addEventListener('click', (e) => {
        updateBoard(el, i);
    })
});

const updateBoard = (el, i) => {
    el.textContent = player === 1 ? `O` : `X`;

    const row = Math.floor(i / 3);
    const col = i % 3;
    boardArray[row][col] = player;

    el.disabled = true;

    if(winOrNot()){
        console.log({player})
        updateMessage(`Player ${player} Won`);
        disabledBoard();
    }else{
        player = player === 1 ? 2 : 1;
        const msg = `Player ${player}`;
        updateMessage(msg);
    }

    
}

const updateMessage = (msg) => {
    const h1 = document.getElementById("msg");
    h1.textContent = msg;
}

const winOrNot = () => {
    //check horizontally
    
    const rows = [0, 1, 2];
    let wonH = false, wonV = false, diagonalLeftWon = false, diagonalRightWon = false;
    rows.forEach((row) => {
        if(boardArray[row][0] === player &&
        boardArray[row][1] === player &&
        boardArray[row][2] === player && !wonH){
            wonH = true;
        }
    });

    const cols = [0, 1, 2];
    cols.forEach(col => {
        if(
            !wonV &&
            boardArray[0][col] === player &&
            boardArray[1][col] === player &&
            boardArray[2][col] === player
        ){
            wonV = true;
        }
    });

    
    if(
        !diagonalLeftWon &&
        boardArray[0][0] === player &&
        boardArray[1][1] === player &&
        boardArray[2][2] === player
    ){
        diagonalLeftWon = true;
    }
    

    if(
        !diagonalRightWon &&
        boardArray[0][2] === player &&
        boardArray[1][1] === player &&
        boardArray[2][0] === player
    ){
        diagonalRightWon = true;
    }

    return (wonH || wonV || diagonalLeftWon || diagonalRightWon);
}

document.getElementById("reset")
.addEventListener('click', (e) => {
    resetBoard();
});

const resetBoard = () => {
    boardArray = new Array(3).fill().map(_ => new Array(3).fill(0));
    board.forEach(el => {
        el.textContent = '';
        el.disabled = false;
    });
    updateMessage(`Player 1`);
}

const disabledBoard = () => {
    board.forEach(el => {
        el.disabled = true;
    });
}