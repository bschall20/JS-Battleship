//********************************GAME FUNCTIONS*******************************//
choosePlayers();

const board1 = [];
const board2 = [];
let n = 1;                      // Keeps track of how many times createBoard is ran (for total players(2))
createBoard(board1);
createBoard(board2);



//********************************CHOOSE PLAYERS*******************************//

//2 buttons, 1 player or 2 player
// IF 2 PLAYERS, LET BOTH PLACE SHIPS ON OWN BOARD.
// IF 1 PLAYER, PLACE SHIPS THEN RUN PC TO CALC ITS SHIPS LOCATIONS
// if (2player){
//     function placeShips(board1);
//     function placeShips(board2);
// }
// else {function placeShips(board 1); function pcShips(board2)}

function choosePlayers(players){
    alert("hey!");
    var onePlayer = $("<button>1 Player</button>")
    var twoPlayer = $("<button>2 Player</button>")

    onePlayer.appendTo($(".gameField"));
    twoPlayer.appendTo($(".gameField"));

    return placeShips();
}

//******************************END CHOOSE PLAYERS*****************************//
//                                                                             //
//                                                                             //
//              **       **    ********    **      **    ********              //
//              ** **    **    **           **    **     ********              //
//              **  **   **    **            **  **         **                 //
//              **   **  **    ********       ****          **                 //
//              **    ** **    **            **  **         **                 //
//              **     ****    ***          **    **        **                 //
//              **       **    ********    **      **       **                 //
//                                                                             //
//                                                                             //
//******************************CREATE PLAYER BOARD******************************
function createBoard(board) {
    // const board = [];
    for (let i = 0; i < 121; i++) {
        board[i] = {
            cellFill: "",       // Allow board to be labeled
            location: i,        // Keep track of board location
            isShot: 0,          // Keep track if location was shot at (add class to not allow it to be clicked again)
            isShip: 0,          // Keep track if location is ship (used for before game starts)
            isHit: 0,           // Keep track if ship is hit
        };

        //Vertical alignment 0-10 on board
        if (i % 11 === 0) {
            board[i].cellFill = i / 11;
            board[i].isShot = 1;
        }

        //Horizontal alignment A-J on board
        switch (i) {
            case 0:
                board[i].cellFill = "-";
                board[i].isShot = 1;
                break;
            case 1:
                board[i].cellFill = "A";
                board[i].isShot = 1;
                break;
            case 2:
                board[i].cellFill = "B";
                board[i].isShot = 1;
                break;
            case 3:
                board[i].cellFill = "C";
                board[i].isShot = 1;
                break;
            case 4:
                board[i].cellFill = "D";
                board[i].isShot = 1;
                break;
            case 5:
                board[i].cellFill = "E";
                board[i].isShot = 1;
                break;
            case 6:
                board[i].cellFill = "F";
                board[i].isShot = 1;
                break;
            case 7:
                board[i].cellFill = "G";
                board[i].isShot = 1;
                break;
            case 8:
                board[i].cellFill = "H";
                board[i].isShot = 1;
                break;
            case 9:
                board[i].cellFill = "I";
                board[i].isShot = 1;
                break;
            case 10:
                board[i].cellFill = "J";
                board[i].isShot = 1;
        }
    }




    //table to make a new row at every 10 spot (11 per row) and insert 11 data cells
    var tableTitle = $("<h2>Player " + n +"</h2>")
    var table = $("<table></table>");
    for (var i = 0; i < board.length; i++) {

        if (i % 11 === 0) {
            var row = $("<tr></tr>");
        }

        if (i % 11 === 0 || (0 <= i && i <= 10)) {
            row.append($("<th></th>").html(board[i].cellFill));
        }
        else { row.append($("<td id=" + (i) + "></td>").html(board[i].cellFill)); }
        table.append(row);
    }

    tableTitle.prependTo($("#board" + n));
    table.appendTo($("#board" + n));
    n++;
    console.log(board);
}

//****************************END CREATE PLAYER BOARD**************************//
//                                                                             //
//                                                                             //
//              **       **    ********    **      **    ********              //
//              ** **    **    **           **    **     ********              //
//              **  **   **    **            **  **         **                 //
//              **   **  **    ********       ****          **                 //
//              **    ** **    **            **  **         **                 //
//              **     ****    ***          **    **        **                 //
//              **       **    ********    **      **       **                 //
//                                                                             //
//                                                                             //
//******************************SET UP PLAYER BOARD****************************//



//*********************Set Player Ships*******************//
//Toggle isShip on and off for setting battleships before game starts


function placeShips() {
    const carrier = 5;
    const battleship = 4;
    const cruiser = 3;
    const submarine = 3;
    const destroyer = 2;

    alert("Place ships!");

    //for board 2, just place ships via the case statements (if i = x, class=isShip)
}

$("td").on("click", (function () {
    // e.preventDefault();
    console.log($(this).prop("id"));
    $(this).toggleClass("isShip")
    //call function next? xFunction();
}));


//on click, make isShot go to 1, add isShot to the <td></td> cell, adjust numbers
    // look into above loop and jquery to see if you can target the specific table data cell








//****************************END SET UP PLAYER BOARD**************************//
//                                                                             //
//                                                                             //
//              **       **    ********    **      **    ********              //
//              ** **    **    **           **    **     ********              //
//              **  **   **    **            **  **         **                 //
//              **   **  **    ********       ****          **                 //
//              **    ** **    **            **  **         **                 //
//              **     ****    ***          **    **        **                 //
//              **       **    ********    **      **       **                 //
//                                                                             //
//                                                                             //
//******************************XXXXXXXXXXXXXXXXXXX****************************//


//LOOKING LIKE I MIGHT HAVE TO DO ALL THE INITIALIZING OF ADDING A CLASS UP ABOVE IN THE CREATION???
// Keep note that both player boards will be the same right now. Maybe create a function for the
        //board creation process and then create 2 different variables with it? ex: board1 =, board2 =
//Find a way to use object properties as a way of assigning a class to that data cell <td></td>


// 1.) isShip starts at 1 if a ship is there. When isShot goes to 1 (on click),
// isHit goes to 1 as well
// 2.) Don't allow location to be shot at again if isShot = 1


// Ships can be placed horizontal 0-9 (10-19, 20-29, etc.) but not 9 into 0-8 (ex: 19 into 22)
// Ships can be placed vertical at increments of 10 (0, 10, 20) (ex: 27, 37, and 47)


//TO DO STILL:
// 1.) Add rules list at top
// 2.) Add play button to start
// 3.) Add forfeit button (turns all object numbers to 1 to reveal board)
// 4.) Add headers to the array (A-J and 1-10)