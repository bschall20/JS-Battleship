//********************************GAME FUNCTIONS*******************************//
choosePlayers();

const board1 = [];
const board2 = [];
let n = 1;                      // Keeps track of how many times createBoard is ran (for total players(2))
// createBoard(board1);
// createBoard(board2);



//********************************CHOOSE PLAYERS*******************************//

//2 buttons, 1 player or 2 player
// IF 2 PLAYERS, LET BOTH PLACE SHIPS ON OWN BOARD.
// IF 1 PLAYER, PLACE SHIPS THEN RUN PC TO CALC ITS SHIPS LOCATIONS
// if (2player){
//     function placeShips(board1);
//     function placeShips(board2);
// }
// else {function placeShips(board 1); function pcShips(board2)}

function choosePlayers() {
    var onePlayer = $("<button id='1player'>1 Player</button>")
    var twoPlayer = $("<button id='2player'>2 Player</button>")

    onePlayer.appendTo($(".gameField"));
    twoPlayer.appendTo($(".gameField"));

    $('#1player, #2player').on("click", (function () {
        if (this.id === '1player') {
            alert("1 Player Game");
            $("#1player").addClass("hide");
            $("#2player").addClass("hide");
            createBoard(board1);
            // return (
            //     createBoard(board1),
            //     createBoard(board2))
        }

        else if (this.id === '2player') {
            alert("2 Player Game");
            $("#1player").addClass("hide");
            $("#2player").addClass("hide");
            createBoard(board1);
            // return (
            //     createBoard(board1),
            //     createBoard(board2))
        }
    }));

    return 0;
}

// $("td").on("click", (function () {
//     // e.preventDefault();
//     console.log($(this).prop("id"));
//     $(this).toggleClass("isShip")
//     //call function next? xFunction();
// }));

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
    var tableTitle = $("<h2>Player " + n + "</h2>")
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
    console.log(board);

    if (n === 1) {
        placeShips();
    }
    else if (n === 2) {
        placeShips();
    }
    else { return 0; }
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

    alert("Place ships, Player " + n + "!");


    $("td").on("click", (function () {
        console.log($(this).prop("id"));
        $(this).toggleClass("isShip")
    }));


    //*****ADD CONDITIONS TO NOT LET PLAYER PLACE 1 SQ RANDOMLY
    // ADDRESS TOGGLESHIP ALWAYS WORKING ON BOARD 2 AFTER donePlacingP2 IS CLICKED


    if (n === 1) {
        //toggleShip;
        var donePlacingP1 = $("<button class='donePlacingP1'>Done Placing Battleships</button>")
        donePlacingP1.appendTo($("#board1"));
        $(".donePlacingP1").on("click", (function () {
            console.log("User 1 is done placing their battleships!");
            n++;
            createBoard(board2);
            $(".donePlacingP1").addClass("hide");
        }));
    }
    else if (n === 2) {
        //toggleShip;
        var donePlacingP2 = $("<button class='donePlacingP2'>Done Placing Battleships</button>")
        donePlacingP2.appendTo($("#board2"));
        $(".donePlacingP2").on("click", (function () {
            console.log("User 2 is done placing their battleships!");
            n++;

            //Call player 1 to play.
            $(".donePlacingP2").addClass("hide");
        }));
    }
    else { return 0; }


    //for board 2, just place ships via the case statements (if i = x, class=isShip)
}


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