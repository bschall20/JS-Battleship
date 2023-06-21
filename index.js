//********************************GAME FUNCTIONS*******************************//
choosePlayers();
const board1 = [];                  // Player 1 Board
const board2 = [];                  // Player 2/Bot Board
let n = 1;
let players = 0;                    // Keeps track of how many times createBoard is ran (for total players(2))




//********************************CHOOSE PLAYERS*******************************//
function choosePlayers() {
    $("<button id='onePlayer' class='btn'>1 Player</button>").insertAfter($("h1"));
    $("<button id='twoPlayer' class='btn'>2 Player</button>").insertAfter($("#onePlayer"));


    function create() {
        $("h1").addClass("h1Start");
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
        var tableTitle = $("<h2 class='playerTitle'>Player " + n + " Board</h2>")
    }
    else { var tableTitle = $("<h2>Bot Player Board</h2>") }

    var table = $("<table></table>");
    for (var i = 0; i < board.length; i++) {

        if (i % 11 === 0) {
            var row = $("<tr></tr>");
        }

        if (i % 11 === 0 || (0 <= i && i <= 10)) {
            row.append($("<th class='tableHead'></th>").html(board[i].cellFill));
        }
        else { row.append($("<td id=" + (i) + "></td>").html(board[i].cellFill)); }     //change .location back to .cellFill for blank board!
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
function placeAllShips() {
    let spot = 0;
    let rndmClick = 0;


    function botShipPlacement(shipNum) {
        //If direction === 1, go horizontal
        //If direction === 2, go vertical
        let direction = Math.floor(Math.random() * 2 + 1);
        spot = Math.floor(Math.random() * 120);

        do {
            spot = Math.floor(Math.random() * 120)
        } while (spot <= 11 || spot % 11 === 0);

        console.log(`Bot turn with direction ${direction} and spot of ${spot} with a length of ${shipNum}`);
        placeShip(shipNum, direction, spot);
    }

    //Set board for player 1
    if (n === 1) {
        alert("Place ships, Player 1!");
        placeShip(5);
    }


    //Set board for player 2
    else if (n === 2) {
        alert("Place ships, Player 2!");
        placeShip(5);
    }

    // Set board for bot player
    else if (n === 3) {
        botShipPlacement(5);
    }



    function placeShip(ship, direction, spot) {

        function hide() {
            $(".vhTitle").remove();
            $(".horizBtn").remove();
            $(".rndmHorizBtn").remove();
            $(".vertBtn").remove();
            $(".rndmVertBtn").remove();
            $(".rndmAll").remove();
        }

        function endShipPlacement() {   //import ship?
            let nextShip = ship - 1;
            $("td").off("click");
            $(".placeTitle").addClass("hide");
            //placeShip(nextShip);
            if (n === 1 || n === 2) {
                placeShip(nextShip);
                //placeShip(2);
            }
            else if (n === 3) {
                botShipPlacement(nextShip);
            }
        }

        function finishAllPlacement() {
            //PLAYER 1
            if (n === 1) {
                var donePlacingP1 = $("<button class='donePlacingP1 btn'>Done Placing Battleships</button>")
                donePlacingP1.appendTo($("#board1"));
                $(".donePlacingP1").on("click", (function () {
                    console.log("User 1 is done placing their battleships!");
                    if (players === 1) { n += 2 }
                    else {
                        n++;
                        $("h1").removeClass("h1Start");
                    };
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
                    $("h1").removeClass("h1Start");
                    console.log("User 2 is done placing their battleships!");
                    n += 2;
                    //Call player 1 to play.
                    $(".donePlacingP2").addClass("hide");

                    $("td").off("click");
                    console.log(`n is equal to ${n}`);
                    console.log(`Players is equal to ${players}`);
                    $("#board2").addClass("hide");

                    playerTurns();
                }));
            }
            //PLAYER BOT
            else if (n === 3) {

                // $("#board1").addClass("hide");
                // alert("Place ships, Bot Player!");
                // var donePlacingBot = $("<button class='donePlacingBot btn'>Done Placing Battleships</button>")
                // donePlacingBot.appendTo($("#board3"));

                // $(".donePlacingBot").on("click", (function () {
                //     $("h1").removeClass("h1Start");
                //     console.log("Bot User is done placing their battleships!");
                //     n++;
                //     $(".donePlacingBot").addClass("hide");
                //     $("td").off("click");

                //     console.log(`n is equal to ${n}`);
                //     console.log(`Players is equal to ${players}`);

                //     //********UNCOMMENT WHEN DONE TESTING. DON'T WANT TO SEE BOT BOARD. NEED TO GET RID OF BUTTON TOO. JUST CALL THE playerTurns() !! */
                //     //$("#board3").addClass("hide");

                //     playerTurns();
                // }));
                $("#board3").addClass("hide");
                playerTurns();
            }
        }


        $("<h3 class='vhTitle'>Choose which way to place your ship of (" + ship + ") spots!</h3>").appendTo($(".shipDirection"));
        $("<button class='horizBtn btn'>Place ship (" + ship + ") horizontal</button>").insertAfter($(".vhTitle"));
        $("<button class='rndmHorizBtn btn'>Place ship (" + ship + ") horizontal randomly</button>").insertAfter($(".horizBtn"));
        $("<button class='vertBtn btn'>Place ship (" + ship + ") vertical</button>").insertAfter($(".rndmHorizBtn"));
        $("<button class='rndmVertBtn btn'>Place ship (" + ship + ") vertical randomly</button>").insertAfter($(".vertBtn"));
        $("<button class='rndmAll btn' style='flex: 100%;'>Place remaining ship(s) randomly</button>").insertAfter($(".rndmVertBtn"));




        //CALL WHICH DIRECTION TO PLACE SHIP
        //PLAYER CALL
        $(".horizBtn").on("click", (function () {
            rndmClick = 0;
            horizontal();
            console.log("clicked horizontal!");
        }));

        $(".vertBtn").on("click", (function () {
            rndmClick = 0;
            vertical();
            console.log("clicked vertical!");
        }));

        $(".rndmHorizBtn").on("click", (function () {
            rndmClick = 1;
            direction = 1;
            spot = Math.floor(Math.random() * 120);

            do {
                spot = Math.floor(Math.random() * 120)
            } while (spot <= 11 || spot % 11 === 0);

            horizontal(spot);
            console.log("clicked random horizontal!");
        }));

        $(".rndmVertBtn").on("click", (function () {
            rndmClick = 1;
            direction = 2;
            spot = Math.floor(Math.random() * 120);

            do {
                spot = Math.floor(Math.random() * 120)
            } while (spot <= 11 || spot % 11 === 0);

            vertical(spot);
            console.log("clicked random vertical!");
        }));

        $(".rndmAll").on("click", (function () {
            rndmClick = 1;

            do {
                spot = Math.floor(Math.random() * 120);

                do {
                    spot = Math.floor(Math.random() * 120)
                } while (spot <= 11 || spot % 11 === 0);

                direction = Math.floor(Math.random() * 2 + 1);
                if (direction === 1) {
                    horizontal(spot);
                }
                else {
                    vertical(spot);
                }

                console.log("clicked random all!");
                console.log(ship);
                ship--;
            } while (ship >= 2);

        }));


        //BOT CALL
        if (n === 3 && direction === 1) {
            horizontal(spot);
        }
        else if (n === 3 && direction === 2) {
            vertical(spot);
        }


        //HORIZONTAL SHIP PLACEMENT
        function horizontal(spot) {

            //*********KEEP TRACK OF BOUNDARIES ON HORIZONTAL*********//
            var notAllowedHoriz = [
                "18", "19", "20", "21",
                "29", "30", "31", "32",
                "40", "41", "42", "43",
                "51", "52", "53", "54",
                "62", "63", "64", "65",
                "73", "74", "75", "76",
                "84", "85", "86", "87",
                "95", "96", "97", "98",
                "106", "107", "108", "109",
                "117", "118", "119", "120"]

            //NEXT 4 FUNCTIONS FOR ERROR ON HORIZONTAL PLACEMENT BY COMPARING TO ABOVE ARRAY, SUBTRACTING FROM IT ON EACH PASS
            // EX: Placement of ship 3 only needs top 2 rows invalidated for placement
            function endShipPlacementErrorHoriz() {
                let wrong = ship - 1;

                $("td").off("click");
                $(".placeTitle").addClass("hide");

                if (rndmClick === 1) {
                    do {
                        spot = Math.floor(Math.random() * 120)
                    } while (spot <= 11 || spot % 11 === 0);
                    if (direction === 1) {
                        horizontal(spot);
                    }
                    else { vertical(spot); }
                }
                else if (n === 1 || n === 2) {
                    alert("ERROR: Try placement elsewhere!")
                    console.log("Cannot place in the following slots (right most " + wrong + " column(s)): " + notAllowedHoriz);
                    placeShip(ship);
                }
                else if (n === 3) {
                    botShipPlacement(ship);
                }
            }

            function notAllowedHoriz4() {
                for (var i = 4; i <= notAllowedHoriz.length; i += 3) {
                    notAllowedHoriz.splice(i, 1);
                }
                notAllowedHoriz.splice(0, 1);
            }

            function notAllowedHoriz3() {
                notAllowedHoriz4();
                for (var i = 3; i <= notAllowedHoriz.length; i += 2) {
                    notAllowedHoriz.splice(i, 1);
                }
                notAllowedHoriz.splice(0, 1);
            }

            function notAllowedHoriz2() {
                notAllowedHoriz3();
                for (var i = 2; i <= notAllowedHoriz.length; i += 1) {
                    notAllowedHoriz.splice(i, 1);
                }
                notAllowedHoriz.splice(0, 1);
            }
            //*******KEEP TRACK OF BOUNDARIES ON HORIZONTAL END*******//



            hide();

            //use direction variable to replace below sentences
            $("<h3 class='placeTitle'>Place Horizontal Ship (" + ship + ") Spots.</h3>").appendTo($("#board" + n));
            $("<p class='placeTitle'>***The ship will be placed (" + ship + ") continuous spaces right from the selected slot***</p>").appendTo($("#board" + n));



            $("td").on("click", (function () {
                let slotID = $(this).prop("id");
                place(slotID);
            }))
            if (n === 3 || rndmClick === 1) {
                //Have to turn into string to allow ship to adhere to boundary placement
                let spotStr = spot.toString();
                place(spotStr);
            }

            function place(boardSpot) {
                let slot = parseInt(boardSpot);
                let slot1 = slot + 1;
                let slot2 = slot + 2;
                let slot3 = slot + 3;




                //PLACE SHIP OF 5 SLOTS HORIZONTALLY
                if (ship === 5) {
                    if (notAllowedHoriz.includes(boardSpot)) {
                        endShipPlacementErrorHoriz();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip carrier").next().addClass("isShip carrier").next().addClass("isShip carrier").next().addClass("isShip carrier").next().addClass("isShip carrier");
                        endShipPlacement();
                    }
                }

                //PLACE SHIP OF 4 SLOTS HORIZONTALLY
                else if (ship === 4) {
                    notAllowedHoriz4();
                    if (notAllowedHoriz.includes(boardSpot)) {
                        endShipPlacementErrorHoriz();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot1}`).hasClass("isShip")) || ($(`#board${n} #${slot2}`).hasClass("isShip")) || ($(`#board${n} #${slot3}`).hasClass("isShip"))) {
                        endShipPlacementErrorHoriz();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip battleship").next().addClass("isShip battleship").next().addClass("isShip battleship").next().addClass("isShip battleship");
                        endShipPlacement();
                    }
                }

                //PLACE SHIP OF 3 SLOTS HORIZONTALLY
                else if (ship === 3) {
                    notAllowedHoriz3();

                    if (notAllowedHoriz.includes(boardSpot)) {
                        endShipPlacementErrorHoriz();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot1}`).hasClass("isShip")) || ($(`#board${n} #${slot2}`).hasClass("isShip"))) {
                        endShipPlacementErrorHoriz();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip cruiser").next().addClass("isShip cruiser").next().addClass("isShip cruiser");
                        endShipPlacement();
                    }
                }

                //PLACE SHIP OF 2 SLOTS HORIZONTALLY (LAST PLAYER SHIP PLACED)
                else if (ship === 2) {
                    notAllowedHoriz2();

                    if (notAllowedHoriz.includes(boardSpot)) {
                        endShipPlacementErrorHoriz();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot1}`).hasClass("isShip"))) {
                        endShipPlacementErrorHoriz();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip destroyer").next().addClass("isShip destroyer");
                        $("td").off("click");
                        $(".placeTitle").addClass("hide");
                        finishAllPlacement();
                    }
                }
            }
        }


        //VERTICAL SHIP PLACEMENT
        function vertical() {

            //*********KEEP TRACK OF BOUNDARIES ON VERTICAL*********//
            var notAllowedVert = [
                "12", "13", "14", "15", "16", "17", "18", "19", "20", "21",
                "23", "24", "25", "26", "27", "28", "29", "30", "31", "32",
                "34", "35", "36", "37", "38", "39", "40", "41", "42", "43",
                "45", "46", "47", "48", "49", "50", "51", "52", "53", "54"]

            //NEXT 5 FUNCTIONS FOR ERROR ON HORIZONTAL PLACEMENT BY COMPARING TO ABOVE ARRAY, SUBTRACTING FROM IT ON EACH PASS
            // EX: Placement of ship 3 only needs right 2 columns invalidated for placement
            function endShipPlacementErrorVert() {
                let wrong = ship - 1;
                $("td").off("click");
                $(".placeTitle").addClass("hide");

                if (rndmClick === 1) {
                    do {
                        spot = Math.floor(Math.random() * 120)
                    } while (spot <= 11 || spot % 11 === 0);
                    if (direction === 1) {
                        horizontal(spot);
                    }
                    else { vertical(spot); }
                }
                else if (n === 1 || n === 2) {
                    alert("ERROR: Try placement elsewhere!")
                    console.log("Cannot place in the following slots (top most " + wrong + " row(s)): " + notAllowedVert);
                    placeShip(ship);
                }
                else if (n === 3) {
                    botShipPlacement(ship)
                }
            }

            function notAllowedVertCut() {
                let length = notAllowedVert.length;
                for (var i = length; i >= (length - 9); i--) {
                    notAllowedVert.pop();
                }
            }

            function notAllowedVert4() {
                notAllowedVertCut();
            }

            function notAllowedVert3() {
                notAllowedVert4();
                notAllowedVertCut();
            }

            function notAllowedVert2() {
                notAllowedVert3();
                notAllowedVertCut();
            }
            //*********KEEP TRACK OF BOUNDARIES ON VERTICAL END*********//




            hide();
            $("<h3 class='placeTitle'>Place Vertical Ship (" + ship + ") Spots.</h3>").appendTo($("#board" + n));
            $("<p class='placeTitle'>***The ship will be placed (" + ship + ") continuous spaces upward from the selected slot***</p>").appendTo($("#board" + n));

            $("td").on("click", (function () {
                let slotID = $(this).prop("id");
                place(slotID);
            }))
            if (n === 3 || rndmClick === 1) {
                let spotStr = spot.toString();
                place(spotStr);
            }

            function place(boardSpot) {
                let slot = parseInt(boardSpot);
                let slot11 = slot - 11;
                let slot22 = slot - 22;
                let slot33 = slot - 33;
                let slot44 = slot - 44;


                //PLACE SHIP OF 5 SLOTS VERTICALLY
                if (ship === 5) {
                    if (notAllowedVert.includes(boardSpot)) {
                        endShipPlacementErrorVert();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip carrier");
                        $(`#board${n} #${slot11}`).addClass("isShip carrier");
                        $(`#board${n} #${slot22}`).addClass("isShip carrier");
                        $(`#board${n} #${slot33}`).addClass("isShip carrier");
                        $(`#board${n} #${slot44}`).addClass("isShip carrier");

                        endShipPlacement();
                    }
                }

                //PLACE SHIP OF 4 SLOTS VERTICALLY
                else if (ship === 4) {
                    notAllowedVert4();

                    if (notAllowedVert.includes(boardSpot)) {
                        endShipPlacementErrorVert();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot11}`).hasClass("isShip")) || ($(`#board${n} #${slot22}`).hasClass("isShip")) || ($(`#board${n} #${slot33}`).hasClass("isShip"))) {
                        endShipPlacementErrorVert();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip battleship");
                        $(`#board${n} #${slot11}`).addClass("isShip battleship");
                        $(`#board${n} #${slot22}`).addClass("isShip battleship");
                        $(`#board${n} #${slot33}`).addClass("isShip battleship");
                        endShipPlacement();
                    }
                }

                //PLACE SHIP OF 3 SLOTS VERTICALLY
                else if (ship === 3) {
                    notAllowedVert3();

                    if (notAllowedVert.includes(boardSpot)) {
                        endShipPlacementErrorVert();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot11}`).hasClass("isShip")) || ($(`#board${n} #${slot22}`).hasClass("isShip"))) {
                        endShipPlacementErrorVert();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip cruiser");
                        $(`#board${n} #${slot11}`).addClass("isShip cruiser");
                        $(`#board${n} #${slot22}`).addClass("isShip cruiser");
                        endShipPlacement();
                    }
                }


                //PLACE SHIP OF 2 SLOTS VERTICALLY (LAST PLAYER SHIP PLACED)
                else if (ship === 2) {
                    notAllowedVert2();

                    if (notAllowedVert.includes(boardSpot)) {
                        endShipPlacementErrorVert();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot11}`).hasClass("isShip"))) {
                        endShipPlacementErrorVert();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip destroyer");
                        $(`#board${n} #${slot11}`).addClass("isShip destroyer");
                        $("td").off("click");
                        $(".placeTitle").addClass("hide");
                        finishAllPlacement();
                    }
                }
            }
        }
    }
}



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
    let carrierP1 = 5;
    let battleshipP1 = 4;
    let cruiserP1 = 3;
    let destroyerP1 = 2;

    let carrierP2 = 5;
    let battleshipP2 = 4;
    let cruiserP2 = 3;
    let destroyerP2 = 2;


    let hitCountP1 = 0;     //Keep count of P1 hits on P2/Bot
    let hitCountP2 = 0;     //Keep count of P2 hits on P1
    //let hitCountBot = 0;    //Keep count of Bot hits on P1
    let turn = 1;           //Keeps track of turn number
    let playerNum = 1;     //Keeps track of which player is going
    let endTurnBtn = $("<button id='endTurnBtn' class='btn'>End Player Turn</button>");
    let startTurnBtn = $("<button id='startBtn' class='btn'>Start Turn " + turn + ", Player " + playerNum + "</button>");
    let scoreboardP2Track = "";

    function p1Hit() {
        $(".p1Score").replaceWith("<td class='p1Score scoreboardCell'>" + hitCountP1 + "</td>");

        if (hitCountP1 > hitCountP2) {
            $(".p1Score").removeClass("losingScore equalScore");
            //$(".p1Score").removeClass("equalScore");
            $(".p2Score").removeClass("equalScore leadScore");
            $(".p1Score").addClass("leadScore");
            $(".p2Score").addClass("losingScore");
        }
        else if (hitCountP1 === hitCountP2) {
            $(".p1Score").removeClass("losingScore leadScore");
            $(".p1Score").addClass("equalScore");
            $(".p2Score").addClass("equalScore");
        }
        else if (hitCountP1 < hitCountP2) {
            $(".p2Score").removeClass("losingScore equalScore");
            $(".p1Score").removeClass("equalScore leadScore");
            $(".p1Score").addClass("losingScore");
            $(".p2Score").addClass("leadScore");
        }
    }

    function p2Hit() {
        $(".p2Score").replaceWith("<td class='p2Score scoreboardCell'>" + hitCountP2 + "</td>");

        if (hitCountP2 > hitCountP1) {
            $(".p2Score").removeClass("losingScore equalScore");
            $(".p1Score").removeClass("equalScore leadScore");
            $(".p1Score").addClass("losingScore");
            $(".p2Score").addClass("leadScore");
        }
        else if (hitCountP2 === hitCountP1) {
            $(".p2Score").removeClass("losingScore leadScore");
            $(".p1Score").addClass("equalScore");
            $(".p2Score").addClass("equalScore");
        }
        else if (hitCountP1 > hitCountP2) {
            $(".p1Score").removeClass("losingScore equalScore");
            $(".p2Score").removeClass("equalScore leadScore");
            $(".p1Score").addClass("leadScore");
            $(".p2Score").addClass("losingScore");
        }
    }

    // function shipHit(){
    //     if ($(this).hasClass("carrier")){
    //         carrier--;
    //         if (carrier === 0){
    //             $(".carrier").addClass("isSunk");
    //             alert("Carrier Ship (5) was sunk!");
    //         }
    //     }
    //     else if ($(this).hasClass("battleship")){
    //         battleship--;
    //         if (battleship === 0){
    //             $(".battleship").addClass("isSunk");
    //             alert("Battleship Ship (4) was sunk!");
    //         }
    //     }
    //     else if ($(this).hasClass("cruiser")){
    //         cruiser--;
    //         if (cruiser === 0){
    //             $(".cruiser").addClass("isSunk");
    //             alert("Cruiser Ship (3) was sunk!");
    //         }
    //     }
    //     else if ($(this).hasClass("destroyer")){
    //         destroyer--;
    //         if (destroyer === 0){
    //             $(".destroyer").addClass("isSunk");
    //             alert("Destroyer Ship (2) was sunk!");
    //         }
    //     }
    // }


    $("#gameFieldID").addClass("boardPlay");

    $("h1").removeClass("h1Start");

    if (players === 1) {
        scoreboardP2Track = "Bot"
        $("<button id='startBtn' class='btn'>Player vs Bot</button>").insertAfter($("h1"));
        playerTurnVsBot();
    }
    else if (players === 2) {
        scoreboardP2Track = "2"
        startTurnBtn.insertAfter($("h1"));
        TwoPlayersP1Turn();
    }



    $("<h2 class='turn canHide'>Player " + playerNum + "'s Turn!</h2>").insertAfter($("h1"));
    $("<p class='placeTitle rules0 canHide'>*************Rules*************</p>").insertAfter($(".turn"));
    $("<p class='placeTitle rules1 canHide'>1.) Click onto the other player's board to attack!</p>").insertAfter($(".rules0"));
    $("<p class='placeTitle rules2 canHide'>2.) White denotes a miss - Red denotes a hit - Black denotes a sink!</p>").insertAfter($(".rules1"));
    $("<p class='placeTitle rules3 canHide'>3.) End your turn with the button that appears at the top of the page after you shoot!</p>").insertAfter($(".rules2"));


    var scoreboard = $("<table class='scoreboard'></table>");
    scoreboard.insertAfter(".rules3");
    $("<tr class='scoreboardTitle'></tr>").appendTo(scoreboard);
    $("<th class='scoreboardCell' colspan='2'>Player Scores</th>").appendTo(".scoreboardTitle");

    $("<tr class='scoreboardPlayer'></tr>").appendTo(scoreboard);
    $("<td class='scoreboardCell'>Player 1</td>").appendTo(".scoreboardPlayer");
    $("<td class='scoreboardCell'>Player " + scoreboardP2Track + "</td>").appendTo(".scoreboardPlayer");

    $("<tr class='scoreboardScore'></tr>").appendTo(scoreboard);
    $("<td class='p1Score scoreboardCell'>" + hitCountP1 + "</td>").appendTo(".scoreboardScore");
    $("<td class='p2Score scoreboardCell'>" + hitCountP2 + "</td>").appendTo(".scoreboardScore");

    $("<p class='scoreboardP'>*First to 14 hits wins!*</p>").insertAfter(scoreboard);


    //*********************1 PLAYER TURNS*******************//
    function playerTurnVsBot() {
        playerNum = 1;

        //P1 START TURN
        $("#startBtn").on("click", (function () {
            $("h1").addClass("h1Start");
            $("#startBtn").addClass("hide");

            $("#board1").removeClass("hide");
            $("#board3").removeClass("hide");

            if ($("#board3 td").hasClass("isShip")) {
                $("#board3 td").addClass("isShipHide");
            }

            $("#board1 td").removeClass("isShipHide");
        }));

        $("#board3 td").on("click", (function () {
            if ($(this).hasClass("isShip")) {
                $(this).addClass("isHit");
                $(this).removeClass("isShip");
                $(this).removeClass("isShipHide");
                hitCountP1++;

                if ($(this).hasClass("carrier")) {
                    carrierP2--;
                    if (carrierP2 === 0) {
                        $("#board3 .carrier").addClass("isSunk");
                        alert("Player 1 sunk Bot Player's Carrier Ship (5)!");
                    }
                }
                else if ($(this).hasClass("battleship")) {
                    battleshipP2--;
                    if (battleshipP2 === 0) {
                        $("#board3 .battleship").addClass("isSunk");
                        alert("Player 1 sunk Bot Player's Battleship Ship (4)!");
                    }
                }
                else if ($(this).hasClass("cruiser")) {
                    cruiserP2--;
                    if (cruiserP2 === 0) {
                        $("#board3 .cruiser").addClass("isSunk");
                        alert("Player 1 sunk Bot Player's Cruiser Ship (3)!");
                    }
                }
                else if ($(this).hasClass("destroyer")) {
                    destroyerP2--;
                    if (destroyerP2 === 0) {
                        $("#board3 .destroyer").addClass("isSunk");
                        alert("Player 1 sunk Bot Player's Destroyer Ship (2)!");
                    }
                }

                p1Hit();

                if (hitCountP1 === 14) {
                    alert("Player 1 has won!");
                    endTurnBtn.remove();
                    endGameScreen(playerNum);
                }
                else { endTurnBtn.insertAfter($("h1")); }
            }
            else {
                $(this).addClass("isMiss");
                endTurnBtn.insertAfter($("h1"));
            }
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            $("#board3 td").off("click");
        }));

        endTurnBtn.on("click", (function () {
            endTurnBtn.remove();
            console.log("End Turn Pressed");
            botTurnVsPlayer();
        }));
    }

    function botTurnVsPlayer() {
        playerNum = "Bot";
        let shotTrack = [];
        let shotTrackHit = [];
        let shot = Math.floor(Math.random() * 120);

        //Reroll spot shot if it lands on table header
        do {
            shot = Math.floor(Math.random() * 120)
        } while (shot <= 11 || shot % 11 === 0 || shotTrack.includes(shot));

        shotTrack.push(shot);
        let shotStr = shot.toString();
        console.log(`Shot from Bot = ${shot}`);

        if ($(`#board1 #${shotStr}`).hasClass("isShip")) {
            $(`#board1 #${shotStr}`).addClass("isHit");
            $(`#board1 #${shotStr}`).removeClass("isShip");
            $(`#board1 #${shotStr}`).removeClass("isShipHide");
            shotTrackHit.push(shot);
            hitCountP2++;

            if ($(this).hasClass("carrier")) {
                carrierP1--;
                if (carrierP1 === 0) {
                    $("#board1 .carrier").addClass("isSunk");
                    alert("Bot Player sunk Player 1's Carrier Ship (5)!");
                }
            }
            else if ($(this).hasClass("battleship")) {
                battleshipP1--;
                if (battleshipP1 === 0) {
                    $("#board1 .battleship").addClass("isSunk");
                    alert("Bot Player sunk Player 1's Battleship Ship (4)!");
                }
            }
            else if ($(this).hasClass("cruiser")) {
                cruiserP1--;
                if (cruiserP1 === 0) {
                    $("#board1 .cruiser").addClass("isSunk");
                    alert("Bot Player sunk Player 1's Cruiser Ship (3)!");
                }
            }
            else if ($(this).hasClass("destroyer")) {
                destroyerP1--;
                if (destroyerP1 === 0) {
                    $("#board1 .destroyer").addClass("isSunk");
                    alert("Bot Player sunk Player 1's Destroyer Ship (2)!");
                }
            }
            //shipHit();
            p2Hit();

            if (hitCountP2 === 14) {
                alert("Bot Player has won!");
                endTurnBtn.remove();
                endGameScreen(playerNum);
            }
        }
        else {
            $(`#board1 #${shotStr}`).addClass("isMiss");
        }

        playerTurnVsBot();
    }


    //*********************2 PLAYER, PLAYER 1 TURN*******************//
    function TwoPlayersP1Turn() {
        playerNum = 1;

        //P1 START TURN
        startTurnBtn.on("click", (function () {
            $("h1").addClass("h1Start");

            startTurnBtn.addClass("hide");

            $("#board1").removeClass("hide");
            $("#board2").removeClass("hide");

            if ($("#board2 td").hasClass("isShip")) {
                $("#board2 td").addClass("isShipHide");
            }

            $("#board1 td").removeClass("isShipHide");
        }));

        $("#board2 td").on("click", (function () {
            if ($(this).hasClass("isShip")) {
                $(this).addClass("isHit");
                $(this).removeClass("isShip");
                $(this).removeClass("isShipHide");
                hitCountP1++;

                if ($(this).hasClass("carrier")) {
                    carrierP2--;
                    if (carrierP2 === 0) {
                        $("#board2 .carrier").addClass("isSunk");
                        alert("Player 1 sunk Player 2's Carrier Ship (5)!");
                    }
                }
                else if ($(this).hasClass("battleship")) {
                    battleshipP2--;
                    if (battleshipP2 === 0) {
                        $("#board2 .battleship").addClass("isSunk");
                        alert("Player 1 sunk Player 2's Battleship Ship (4)!");
                    }
                }
                else if ($(this).hasClass("cruiser")) {
                    cruiserP2--;
                    if (cruiserP2 === 0) {
                        $("#board2 .cruiser").addClass("isSunk");
                        alert("Player 1 sunk Player 2's Cruiser Ship (3)!");
                    }
                }
                else if ($(this).hasClass("destroyer")) {
                    destroyerP2--;
                    if (destroyerP2 === 0) {
                        $("#board2 .destroyer").addClass("isSunk");
                        alert("Player 1 sunk Player 2's Destroyer Ship (2)!");
                    }
                }

                p1Hit();

                if (hitCountP1 === 14) {
                    alert("Player 1 has won!");
                    endTurnBtn.remove();
                    endGameScreen(playerNum);
                }
                else { endTurnBtn.insertAfter($("h1")); }

            }
            else {
                $(this).addClass("isMiss");
                endTurnBtn.insertAfter($("h1"));
            }
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            $("#board2 td").off("click");
        }));

        endTurnBtn.on("click", (function () {
            $("#board1").addClass("hide");
            $("#board2").addClass("hide");
            $("h1").removeClass("h1Start");
            endTurnBtn.remove();
            startTurnBtn = $("<button id='startBtn' class='btn'>Start Turn " + turn + ", Player 2</button>").insertAfter($("h1"));
            console.log("End Turn Pressed");
            $(".turn").replaceWith("<h2 class='turn canHide'>Player 2's Turn!</h2>");
            startTurnBtn.removeClass("hide");
            TwoPlayersP2Turn();
        }));
    }



    //*********************2 PLAYER, PLAYER 2 TURN*******************//
    function TwoPlayersP2Turn() {
        playerNum = 2;

        //P2 START TURN
        startTurnBtn.on("click", (function () {
            $("h1").addClass("h1Start");
            startTurnBtn.addClass("hide");

            $("#board1").removeClass("hide");
            $("#board2").removeClass("hide");

            if ($("#board1 td").hasClass("isShip")) {
                $("#board1 td").addClass("isShipHide");
            }

            $("#board2 td").removeClass("isShipHide");
        }));


        $("#board1 td").on("click", (function () {
            console.log("Board 1 TD Clicked");

            if ($(this).hasClass("isShip")) {
                $(this).addClass("isHit");
                $(this).removeClass("isShip");
                $(this).removeClass("isShipHide");
                hitCountP2++;

                if ($(this).hasClass("carrier")) {
                    carrierP1--;
                    if (carrierP1 === 0) {
                        $("#board1 .carrier").addClass("isSunk");
                        alert("Player 2 sunk Player 1's Carrier Ship (5)!");
                    }
                }
                else if ($(this).hasClass("battleship")) {
                    battleshipP1--;
                    if (battleshipP1 === 0) {
                        $("#board1 .battleship").addClass("isSunk");
                        alert("Player 2 sunk Player 1's Battleship Ship (4)!");
                    }
                }
                else if ($(this).hasClass("cruiser")) {
                    cruiserP1--;
                    if (cruiserP1 === 0) {
                        $("#board1 .cruiser").addClass("isSunk");
                        alert("Player 2 sunk Player 1's Cruiser Ship (3)!");
                    }
                }
                else if ($(this).hasClass("destroyer")) {
                    destroyerP1--;
                    if (destroyerP1 === 0) {
                        $("#board1 .destroyer").addClass("isSunk");
                        alert("Player 2 sunk Player 1's Destroyer Ship (2)!");
                    }
                }


                p2Hit();

                if (hitCountP2 === 14) {
                    alert("Player 2 has won!");
                    endTurnBtn.remove();
                    endGameScreen(playerNum);
                }
                else { endTurnBtn.insertAfter($("h1")); }
            }
            else {
                $(this).addClass("isMiss");
                endTurnBtn.insertAfter($("h1"));
            }
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            $("#board1 td").off("click");
        }));

        endTurnBtn.on("click", (function () {
            $("#board1").addClass("hide");
            $("#board2").addClass("hide");
            $("h1").removeClass("h1Start");
            endTurnBtn.remove();
            turn++;
            startTurnBtn = $("<button id='startBtn' class='btn'>Start Turn " + turn + ", Player 1</button>").insertAfter($("h1"));
            console.log("End Turn Pressed");
            $(".turn").replaceWith("<h2 class='turn canHide'>Player 1's Turn!</h2>");
            startTurnBtn.removeClass("hide");
            TwoPlayersP1Turn();
        }));
    }
}


//********************************PLAYER TURNS END*****************************//
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
//*******************************END GAME SCREEN*******************************//



function endGameScreen(playerWon) {
    $("#board1").remove();
    $("#board2").remove();
    $("#board3").remove();
    $(".canHide").remove();

    $("<h2 class='endGameH'>Player " + playerWon + " Has Won!</h2>").insertAfter("h1");
    $("<p class='endGameP'>If you enjoyed this game, feel free to restart below!</p>").insertAfter(".endGameH");
    $("<button class='endGameBtn btn'>Restart Game!</button>").insertAfter(".endGameP");

    $(".endGameBtn").on("click", (function () {
        location.reload(true);
    }));
}



//TO DO STILL?:
// 1.) Add forfeit button (turns all object numbers to 1 to reveal board)
// 2.) Don't let player click on same square to shoot again? Or let them make that mistake?