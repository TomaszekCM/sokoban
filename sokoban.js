let board = [
    ["#", "#", "#", "#", "#", "#", "#"],
    ["#", " ", "#", " ", " ", " ", "#"],
    ["#", " ", " ", " ", " ", " ", "#"],
    ["#", " ", " ", ".", " ", " ", "#"],
    ["#", " ", "o", "o", ".", " ", "#"],
    ["#", " ", "#", " ", " ", " ", "#"],
    ["#", "#", "#", "#", "#", "#", "#"]
    ];
let dotPossitions = [[4,4],[3,3]]

function printBoard(board, player_position) {
    let gameContainer = document.getElementById("game");
    gameContainer.innerHTML = "";               
    for (y in board) {
        for (x in board[y]) {
            if(x == player_position[0] && y == player_position[1]){
                gameContainer.innerHTML += "@";
            } else{
                gameContainer.innerHTML += board[y][x];
            }
        }
        gameContainer.innerHTML += "<br>"
    }

}


function containsDot(board) {
    for (let row of board) {
        if (row.includes(".")) {
            return true;
        }
    }
    return false;
}


let player_position = [1, 1]
printBoard(board, player_position);


function move_player(board, player_position, move){
    let new_position = [0,0];
    new_position[0] = player_position[0] + move[0];
    new_position[1] = player_position[1] + move[1];
    

    if (board[new_position[1]][new_position[0]] != "#"){


        if(board[new_position[1]][new_position[0]] == "o"){

            if(board[new_position[1]+move[1]][new_position[0]+move[0]] != "#" && board[new_position[1]+move[1]][new_position[0]+move[0]] != "o"){
                player_position[0] = new_position[0];
                player_position[1] = new_position[1];

                board[new_position[1]+move[1]][new_position[0]+move[0]] = "o"

                if(dotPossitions.some(pos => pos[0] === new_position[0] && pos[1] === new_position[1])){
                    board[new_position[1]][new_position[0]] = "."
                }else{
                    board[new_position[1]][new_position[0]] = " "
                }

            }else{
                console.log("dalej już jest ściana!");
            }

        }else{
            player_position[0] = new_position[0];
            player_position[1] = new_position[1];
        }

    }
    
    printBoard(board, player_position);
    if(!containsDot(board)){
        document.getElementById("victory").innerHTML = "Zwycięstwo!";
    }else{
        document.getElementById("victory").innerHTML = "";
    }
}




function react_to_input(e, board, player_position){
    if (e.key === "ArrowLeft") {
        move_player(board, player_position, [-1,0]);
    }
    if (e.key === "ArrowRight") {
        move_player(board, player_position, [1,0]);
    }
    if (e.key === "ArrowUp") {
        move_player(board, player_position, [0,-1]);
    }
    if (e.key === "ArrowDown") {
        move_player(board, player_position, [0,1]);
    }
}



window.addEventListener("keydown", function (e) { 
    react_to_input(e, board, player_position); 
});
