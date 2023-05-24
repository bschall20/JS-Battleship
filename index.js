//********************************GAME FUNCTIONS*******************************//
choosePlayers();
const board1 = [];                  // Player 1 Board
const board2 = [];                  // Player 2 Board
const board3 = [];                  // Player Bot Board
let n = 1;
let players = 0;                    // Keeps track of how many times createBoard is ran (for total players(2))




//********************************CHOOSE PLAYERS*******************************//
function choosePlayers() {
    $("<button id='onePlayer' class='btn'>1 Player</button>").insertAfter($("h1"));
    $("<button id='twoPlayer' class='btn'>2 Player</button>").insertAfter($("#onePlayer"));


    function create() {
        $("#onePlayer").addClass("hide");
        $("#twoPlayer").addClass("hide");
        createBoard(board1);
    }


    $('#onePlayer, #twoPlayer').on("click", (function () {
        if (this.id === 'onePlayer') {
            alert("1 Player Game");
            //call player to create, then call pc to make their board
            players += 1;
            create();
        }

        else if (this.id === 'twoPlayer') {
            alert("2 Player Game");
            //call both players to create
            players += 2;
            create();
        }
    }));

    return 0;
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
        };

        //Vertical alignment 0-10 on board
        if (i % 11 === 0) {
            board[i].cellFill = i / 11;
        }

        //Horizontal alignment A-J on board
        switch (i) {
            case 0:
                board[i].cellFill = "-";
                break;
            case 1:
                board[i].cellFill = "A";
                break;
            case 2:
                board[i].cellFill = "B";
                break;
            case 3:
                board[i].cellFill = "C";
                break;
            case 4:
                board[i].cellFill = "D";
                break;
            case 5:
                board[i].cellFill = "E";
                break;
            case 6:
                board[i].cellFill = "F";
                break;
            case 7:
                board[i].cellFill = "G";
                break;
            case 8:
                board[i].cellFill = "H";
                break;
            case 9:
                board[i].cellFill = "I";
                break;
            case 10:
                board[i].cellFill = "J";
        }
    }




    //table to make a new row at every 10 spot (11 per row) and insert 11 data cells
    if (n === 1 || n === 2) {
        var tableTitle = $("<h2>Player " + n + "</h2>")
    }
    else { var tableTitle = $("<h2>Bot Player</h2>") }

    // var tableTitle = $("<h2>Player " + n + "</h2>")
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

    if (n <= 3) { //n===1 (player 1) ,,, n===2 (player 2) ,,, n===3 (player bot)
        placeAllShips();
    }
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


function placeAllShips() {
    // const carrier = 5;
    // const battleship = 4;
    // const cruiser = 3;
    // const submarine = 3;
    // const destroyer = 2;




    //can maybe get this function to run as placeShip and make the input variable of the const ships
    function placeShip(ship) {

        const direction = "";       // can use for redundancy of btn click sentences

        function hide() {
            $(".vhTitle").remove();
            $(".horizBtn").remove();
            $(".vertBtn").remove();
        }

        function unhide() {
            $(".vhTitle").removeClass("hide");
            $(".horizBtn").removeClass("hide");
            $(".vertBtn").removeClass("hide");
        }

        function finishPlacement(){
            //PLAYER 1
            if (n === 1) {
                var donePlacingP1 = $("<button class='donePlacingP1 btn'>Done Placing Battleships</button>")
                donePlacingP1.appendTo($("#board1"));
                $(".donePlacingP1").on("click", (function () {
                    console.log("User 1 is done placing their battleships!");
                    if (players === 1) { n += 2 }
                    else { n++ };
                    createBoard(board2);
                    $(".donePlacingP1").addClass("hide");
                    $("#board1").addClass("hide");      //hides board one after click. taken from n===2 section "Set board for player 2"
                                                        //maybe call an empty screen with a button here for p2 to hit ready then place?
                }));
            }
            //PLAYER 2
            else if (n === 2) {
                var donePlacingP2 = $("<button class='donePlacingP2 btn'>Done Placing Battleships</button>")
                donePlacingP2.appendTo($("#board2"));
                $(".donePlacingP2").on("click", (function () {
                    console.log("User 2 is done placing their battleships!");
                    n += 2;
                    //Call player 1 to play.
                    $(".donePlacingP2").addClass("hide");
                    $("#board1").removeClass("hide");
                    // $("#board1 #board2").addClass("hide");

                    $("td").off("click");
                }));
            }
            //PLAYER BOT
            else if (n === 3) {
                //add math for randomly selecting a slot. 
                        //make first input be 1 or 2    :    1 being horiz, 2 being vert
                        //make math for selecting a TD that isn't the 1-10 or A-J on the board + doesn't violate the boundaries
                
            }
        }

        
        // $("td").on("click", (function () {
        //     console.log($(this).prop("id"));
        //     $(this).toggleClass("isShip")
        // }));


        $("<h3 class='vhTitle'>Choose which way to place your ship of (" + ship + ") spots!</h3>").appendTo($("#board" + n));
        $("<button class='horizBtn btn'>Place ship (" + ship + ") horizontal</button>").insertAfter($(".vhTitle"));
        $("<button class='vertBtn btn'>Place ship (" + ship + ") vertical</button>").insertAfter($(".horizBtn"));

        //HORIZONTAL SHIP PLACEMENT
        $(".horizBtn").on("click", (function () {
            // console.log($(this).prop("id"));
            // $(this).toggleClass("isShip")
            hide();

            //use direction variable to replace below sentences
            $("<h3 class='placeTitle'>Place Horizontal Ship (" + ship + ") Spots.</h3>").appendTo($("#board" + n));
            $("<p class='placeTitle'>***The ship will be placed (" + ship + ") continuous spaces right from the selected slot***</p>").appendTo($("#board" + n));

            $("td").on("click", (function () {

                if (ship === 5) {
                    $(this).addClass("isShip").next().addClass("isShip").next().addClass("isShip").next().addClass("isShip").next().addClass("isShip");

                    //parseint for id numbers to addClass("ship")
                    //if id class = ship, then don't place ship down
                    $("td").off("click");
                    $(".placeTitle").addClass("hide");
                    //problem on repeating buttons is maybe it's calling next function too early? needs to leave loop. instead it's stuck in it?
                    placeShip(4);
                }
                else if (ship === 4) {
                    $(this).addClass("isShip").next().addClass("isShip").next().addClass("isShip").next().addClass("isShip");

                    $("td").off("click");
                    $(".placeTitle").addClass("hide");
                    placeShip(3);
                }
                else if (ship === 3) {
                    $(this).addClass("isShip").next().addClass("isShip").next().addClass("isShip");

                    $("td").off("click");
                    $(".placeTitle").addClass("hide");
                    placeShip(2);
                }
                //LAST PLAYER SHIP PLACED
                else if (ship === 2) {
                    $(this).addClass("isShip").next().addClass("isShip");
                    $("td").off("click");
                    $(".placeTitle").addClass("hide");

                    finishPlacement();
                }
            }));
        }));

        //VERTICAL SHIP PLACEMENT
        $(".vertBtn").on("click", (function () {
            // console.log($(this).prop("id"));
            hide();
            //use direction variable to replace below sentences
            $("<h3 class='placeTitle'>Place Vertical Ship (" + ship + ") Spots.</h3>").appendTo($("#board" + n));
            $("<p class='placeTitle'>***The ship will be placed (" + ship + ") continuous spaces upward from the selected slot***</p>").appendTo($("#board" + n));

            $("td").on("click", (function () {
                let slot = $(this).prop("id");
                // console.log($(this).prop("id"));
                // $(this).toggleClass("isShip")

                if (ship === 5) {
                    $(this).addClass("isShip");
                    slot -= 11;
                    $("#board"+n+" #"+slot).addClass("isShip");
                    slot -= 11;
                    $("#board"+n+" #"+slot).addClass("isShip");
                    slot -= 11;
                    $("#board"+n+" #"+slot).addClass("isShip");
                    slot -= 11;
                    $("#board"+n+" #"+slot).addClass("isShip");

                    //if id class = ship, then don't place ship down
                    $("td").off("click");
                    $(".placeTitle").addClass("hide");
                    placeShip(4);
                }
                else if (ship === 4) {
                    $(this).addClass("isShip");
                    slot -= 11;
                    $("#board"+n+" #"+slot).addClass("isShip");
                    slot -= 11;
                    $("#board"+n+" #"+slot).addClass("isShip");
                    slot -= 11;
                    $("#board"+n+" #"+slot).addClass("isShip");

                    $("td").off("click");
                    $(".placeTitle").addClass("hide");
                    placeShip(3);
                }
                else if (ship === 3) {
                    $(this).addClass("isShip");
                    slot -= 11;
                    $("#board"+n+" #"+slot).addClass("isShip");
                    slot -= 11;
                    $("#board"+n+" #"+slot).addClass("isShip");

                    $("td").off("click");
                    $(".placeTitle").addClass("hide");
                    placeShip(2);
                }
                //LAST PLAYER SHIP PLACED
                else if (ship === 2) {
                    $(this).addClass("isShip");
                    slot -= 11;
                    $("#board"+n+" #"+slot).addClass("isShip");

                    $("td").off("click");
                    $(".placeTitle").addClass("hide");

                    finishPlacement();
                }

            }));

        }));

    }


    //*****ADD CONDITIONS TO NOT LET PLAYER PLACE 1 SQ RANDOMLY
    // ADDRESS TOGGLESHIP ALWAYS WORKING ON BOARD 2 AFTER donePlacingP2 IS CLICKED


    //Set board for player 1
    if (n === 1) {
        alert("Place ships, Player 1!");
        placeShip(5);
    }


    //Set board for player 2
    else if (n === 2) {
        //$("#board1").addClass("hide");
        alert("Place ships, Player 2!");
        placeShip(5);
    }

    // Set board for bot player
    else if (n === 3) {
        // else {
        $("#board1").addClass("hide");
        alert("Place ships, Bot Player!");
        var donePlacingBot = $("<button class='donePlacingBot'>Done Placing Battleships</button>")
        donePlacingBot.appendTo($("#board3"));

        //get rid of on click. need a loop to generate math to select spots
        $(".donePlacingBot").on("click", (function () {
            console.log("Bot User is done placing their battleships!");
            n++;
            $(".donePlacingBot").addClass("hide");
            $("#board1").removeClass("hide");
            $("td").off("click");
        }));
    }



    //for board 2, just place ships via the case statements (if i = x, class=isShip)
} //this is for place ships


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
//*********************************PLAYER TURNS********************************//


function playerTurns() {

}








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