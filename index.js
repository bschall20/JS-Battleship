//********************************GAME FUNCTIONS*******************************//
choosePlayers();
const board1 = [];                  // Player 1 Board
const board2 = [];                  // Player 2/Bot Board
//const board3 = [];                  // Player Bot Board
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
        var tableTitle = $("<h2 class='playerTitle'>Player " + n + " Board</h2>")
    }
    else { var tableTitle = $("<h2>Bot Player Board</h2>") }

    // var tableTitle = $("<h2>Player " + n + "</h2>")
    var table = $("<table></table>");
    for (var i = 0; i < board.length; i++) {

        if (i % 11 === 0) {
            var row = $("<tr></tr>");
        }

        if (i % 11 === 0 || (0 <= i && i <= 10)) {
            row.append($("<th></th>").html(board[i].cellFill));
        }
        else { row.append($("<td id=" + (i) + "></td>").html(board[i].location)); }     //change .location back to .cellFill for blank board!
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
    // const carrier = 5;
    // const battleship = 4;
    // const cruiser = 3;
    // const submarine = 3;
    // const destroyer = 2;


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
        function botShipPlacement(shipNum) {
            //If direction === 1, go horizontal
            //If direction === 2, go vertical
            let direction = Math.floor(Math.random() * 2 + 1);
            let spot = Math.floor(Math.random() * 120);

            do {
                spot = Math.floor(Math.random() * 120)
            } while (spot <= 11 || spot % 11 === 0);

            console.log(`Bot turn with direction ${direction} and spot of ${spot} with a length of ${shipNum}`);
            placeShip(shipNum, direction, spot);
        }

        botShipPlacement(5);
    }




    //can maybe get this function to run as placeShip and make the input variable of the const ships
    function placeShip(ship, direction, spot) {

        function hide() {
            $(".vhTitle").remove();
            $(".horizBtn").remove();
            $(".vertBtn").remove();
        }

        function endShipPlacement() {   //import ship?
            let nextShip = ship - 1;
            $("td").off("click");
            $(".placeTitle").addClass("hide");
            //placeShip(nextShip);
            if (n === 1 || n === 2) {
                //placeShip(nextShip);
                placeShip(2);
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
                    //$("#board1").removeClass("hide");

                    $("td").off("click");
                    console.log(`n is equal to ${n}`);
                    console.log(`Players is equal to ${players}`);
                    $("#board2").addClass("hide");

                    playerTurns();
                }));
            }
            //PLAYER BOT
            else if (n === 3) {

                $("#board1").addClass("hide");
                alert("Place ships, Bot Player!");
                var donePlacingBot = $("<button class='donePlacingBot btn'>Done Placing Battleships</button>")
                donePlacingBot.appendTo($("#board3"));

                //Don't add button like have below. Make it call the same function that will be at the end of P2 placement for blank screen

                //get rid of on click. need a loop to generate math to select spots
                $(".donePlacingBot").on("click", (function () {
                    console.log("Bot User is done placing their battleships!");
                    n++;
                    $(".donePlacingBot").addClass("hide");
                    //$("#board1").removeClass("hide");
                    $("td").off("click");

                    console.log(`n is equal to ${n}`);
                    console.log(`Players is equal to ${players}`);

                    //********UNCOMMENT WHEN DONE TESTING. DON'T WANT TO SEE BOT BOARD. NEED TO GET RID OF BUTTON TOO. JUST CALL THE playerTurns() !! */
                    $("#board3").addClass("hide");

                    playerTurns();
                }));
            }
        }


        // $("td").on("click", (function () {
        //     console.log($(this).prop("id"));
        //     $(this).toggleClass("isShip")
        // }));


        $("<h3 class='vhTitle'>Choose which way to place your ship of (" + ship + ") spots!</h3>").appendTo($("#board" + n));
        $("<button class='horizBtn btn'>Place ship (" + ship + ") horizontal</button>").insertAfter($(".vhTitle"));
        $("<button class='vertBtn btn'>Place ship (" + ship + ") vertical</button>").insertAfter($(".horizBtn"));


        //CALL WHICH DIRECTION TO PLACE SHIP
        //PLAYER CALL
        $(".horizBtn").on("click", (function () {
            horizontal();
            console.log("clicked horizontal!");
        }))
        $(".vertBtn").on("click", (function () {
            vertical();
            console.log("clicked vertical!");
        }))
        //BOT CALL
        if (n === 3 && direction === 1) {
            horizontal(spot);
        }
        else if (n === 3 && direction === 2) {
            vertical(spot);
        }


        //HORIZONTAL SHIP PLACEMENT

        // function horizontal(){
        //     if (direction === 1 || horizontal === true){
        //         horizPlace();
        //     }
        // }

        // $(".horizBtn").on("click", (function () {
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
                // alert("ERROR: Try placement elsewhere!")
                //console.log("Cannot place in the following slots (right most " + wrong + " column(s)): " + notAllowedHoriz);
                $("td").off("click");
                $(".placeTitle").addClass("hide");
                if (n === 1 || n === 2) {
                    alert("ERROR: Try placement elsewhere!")
                    console.log("Cannot place in the following slots (right most " + wrong + " column(s)): " + notAllowedHoriz);
                    placeShip(ship);
                }
                else if (n === 3) {
                    botShipPlacement(ship)
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
            if (n === 3) {
                let spotStr = spot.toString();
                place(spotStr);
            }

            //need to get place(spot) to also be the ID spot
            //something like: $("td").prop("#spot")

            //$("td").on("click", (function () {
            // let slotID = $(this).prop("id");
            // let slot = parseInt(slotID);
            // let slot1 = slot + 1;
            // let slot2 = slot + 2;
            // let slot3 = slot + 3;

            function place(boardSpot) {
                let slot = parseInt(boardSpot);
                let slot1 = slot + 1;
                let slot2 = slot + 2;
                let slot3 = slot + 3;




                //PLACE SHIP OF 5 SLOTS HORIZONTALLY
                if (ship === 5) {
                    //if (notAllowedHoriz.includes($(this).prop("id"))) {
                    if (notAllowedHoriz.includes(boardSpot)) {
                        endShipPlacementErrorHoriz();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip").next().addClass("isShip").next().addClass("isShip").next().addClass("isShip").next().addClass("isShip");
                        endShipPlacement();
                    }
                }

                //PLACE SHIP OF 4 SLOTS HORIZONTALLY
                else if (ship === 4) {
                    notAllowedHoriz4();
                    //if (notAllowedHoriz.includes($(boardSpot).prop("id"))) {
                    if (notAllowedHoriz.includes(boardSpot)) {
                        endShipPlacementErrorHoriz();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot1}`).hasClass("isShip")) || ($(`#board${n} #${slot2}`).hasClass("isShip")) || ($(`#board${n} #${slot3}`).hasClass("isShip"))) {
                        endShipPlacementErrorHoriz();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip").next().addClass("isShip").next().addClass("isShip").next().addClass("isShip");
                        endShipPlacement();
                    }
                }

                //PLACE SHIP OF 3 SLOTS HORIZONTALLY
                else if (ship === 3) {
                    notAllowedHoriz3();

                    //if (notAllowedHoriz.includes($(boardSpot).prop("id"))) {
                    if (notAllowedHoriz.includes(boardSpot)) {
                        endShipPlacementErrorHoriz();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot1}`).hasClass("isShip")) || ($(`#board${n} #${slot2}`).hasClass("isShip"))) {
                        endShipPlacementErrorHoriz();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip").next().addClass("isShip").next().addClass("isShip");
                        endShipPlacement();
                    }
                }

                //PLACE SHIP OF 2 SLOTS HORIZONTALLY (LAST PLAYER SHIP PLACED)
                else if (ship === 2) {
                    notAllowedHoriz2();

                    //if (notAllowedHoriz.includes($(boardSpot).prop("id"))) {
                    if (notAllowedHoriz.includes(boardSpot)) {
                        endShipPlacementErrorHoriz();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot1}`).hasClass("isShip"))) {
                        endShipPlacementErrorHoriz();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip").next().addClass("isShip");
                        $("td").off("click");
                        $(".placeTitle").addClass("hide");
                        finishAllPlacement();
                    }
                }
                //}));
            }
            // }));
        }


        //VERTICAL SHIP PLACEMENT
        //$(".vertBtn").on("click", (function () {

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
                //alert("ERROR: Try placement elsewhere!")
                //console.log("Cannot place in the following slots (top most " + wrong + " row(s)): " + notAllowedVert);
                $("td").off("click");
                $(".placeTitle").addClass("hide");

                if (n === 1 || n === 2) {
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


            // $("td").on("click", (function () {
            //     let slotID = $(this).prop("id");
            //     place(slotID);
            // }))
            // if (n === 3) {
            //     place(spot);
            // }

            $("td").on("click", (function () {
                let slotID = $(this).prop("id");
                place(slotID);
            }))
            if (n === 3) {
                let spotStr = spot.toString();
                place(spotStr);
            }

            // $("td").on("click", (function () {
            //     let slotID = $(this).prop("id");
            //     let slot = parseInt(slotID);
            //     let slot11 = slot - 11;
            //     let slot22 = slot - 22;
            //     let slot33 = slot - 33;
            //     let slot44 = slot - 44;


            function place(boardSpot) {
                let slot = parseInt(boardSpot);
                let slot11 = slot - 11;
                let slot22 = slot - 22;
                let slot33 = slot - 33;
                let slot44 = slot - 44;





                //PLACE SHIP OF 5 SLOTS VERTICALLY
                if (ship === 5) {
                    if (notAllowedVert.includes(boardSpot)) {
                        //if (notAllowedVert.includes($(this).prop("id"))) {
                        endShipPlacementErrorVert();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip");
                        $(`#board${n} #${slot11}`).addClass("isShip");
                        $(`#board${n} #${slot22}`).addClass("isShip");
                        $(`#board${n} #${slot33}`).addClass("isShip");
                        $(`#board${n} #${slot44}`).addClass("isShip");

                        endShipPlacement();
                    }
                }

                //PLACE SHIP OF 4 SLOTS VERTICALLY
                else if (ship === 4) {
                    notAllowedVert4();

                    if (notAllowedVert.includes(boardSpot)) {
                        //if (notAllowedVert.includes($(this).prop("id"))) {
                        endShipPlacementErrorVert();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot11}`).hasClass("isShip")) || ($(`#board${n} #${slot22}`).hasClass("isShip")) || ($(`#board${n} #${slot33}`).hasClass("isShip"))) {
                        endShipPlacementErrorVert();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip");
                        $(`#board${n} #${slot11}`).addClass("isShip");
                        $(`#board${n} #${slot22}`).addClass("isShip");
                        $(`#board${n} #${slot33}`).addClass("isShip");
                        endShipPlacement();
                    }
                }

                //PLACE SHIP OF 3 SLOTS VERTICALLY
                else if (ship === 3) {
                    notAllowedVert3();

                    if (notAllowedVert.includes(boardSpot)) {
                        //if (notAllowedVert.includes($(this).prop("id"))) {
                        endShipPlacementErrorVert();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot11}`).hasClass("isShip")) || ($(`#board${n} #${slot22}`).hasClass("isShip"))) {
                        endShipPlacementErrorVert();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip");
                        $(`#board${n} #${slot11}`).addClass("isShip");
                        $(`#board${n} #${slot22}`).addClass("isShip");
                        endShipPlacement();
                    }
                }


                //PLACE SHIP OF 2 SLOTS VERTICALLY (LAST PLAYER SHIP PLACED)
                else if (ship === 2) {
                    notAllowedVert2();

                    if (notAllowedVert.includes(boardSpot)) {
                        //if (notAllowedVert.includes($(this).prop("id"))) {
                        endShipPlacementErrorVert();
                    }
                    else if (($(`#board${n} #${slot}`).hasClass("isShip")) || ($(`#board${n} #${slot11}`).hasClass("isShip"))) {
                        endShipPlacementErrorVert();
                    }
                    else {
                        $(`#board${n} #${slot}`).addClass("isShip");
                        $(`#board${n} #${slot11}`).addClass("isShip");
                        $("td").off("click");
                        $(".placeTitle").addClass("hide");
                        finishAllPlacement();
                    }
                }
                //}));
            }
            //}));
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
    //$("#board1").addClass("hide");
    let hitCountP1 = 0;     //Keep count of P1 hits on P2/Bot
    let hitCountP2 = 0;     //Keep count of P2 (no /Bot because bot screen won't ever display) hits on P1
    let turn = 1;
    let playerTurn = 1;
    let endTurnBtn = $("<button id='endTurnBtn' class='btn'>End Player Turn</button>");
    let startTurnBtn = $("<button id='startBtn' class='btn'>Start Turn " + turn + ", Player " + playerTurn + "</button>");


    if (players === 1) {
        $("<button id='startBtn' class='btn'>Player vs Bot</button>").insertAfter($("h1"));
    }
    else if (players === 2) {
        TwoPlayersP1Turn();
    }


    function TwoPlayersP1Turn() {
        //let turnP1 = 1;
        //$("<button id='startBtn' class='btn'>Start Turn " + turnP1 + ", Player 1</button>").insertAfter($("h1"));
        startTurnBtn.insertAfter($("h1"));
        let board2Rpt = $("#board2");
        let board2RptTD = $("#board2 td")
        //$("<button id='endTurnBtn' class='btn'>End Player Turn</button>");

        //P1 START TURN
        $(startTurnBtn).on("click", (function () {
            board2Rpt.removeClass("hide");
            board2RptTD.addClass("isShipHide");
            //board2RptTD.addClass("isHit");

            board2Rpt.prependTo($("#board1"));
            // startTurnBtn.addClass("hide");
            startTurnBtn.remove();
            $("#board1").removeClass("hide");

            $("<h2 class='turn canHide'>Player 1's Turn!</h2>").insertAfter($("h1"));

            $("<h3 class='score1 canHide'>Player 1 Hit Count: " + hitCountP1 + "/14</h3>").insertAfter($(".turn"));
            $("<h3 class='score2 canHide'>Player 2 Hit Count: " + hitCountP2 + "/14</h3>").appendTo($(".score1"));

            $("<p class='placeTitle rules0 canHide'>!!!!!!!!!!!!!Rules!!!!!!!!!!!!!</p>").appendTo($(".score2"));
            $("<p class='placeTitle rules1 canHide'>1.) Click onto the other player's board (shown on top) to attack!</p>").appendTo($(".rules0"));
            $("<p class='placeTitle rules2 canHide'>2.) White denotes a miss - Red denotes a hit</p>").appendTo($(".rules1"));

            //createEndTurnBtn();
        }));

        // function createEndTurnBtn(){
        //     $("<button id='endTurnBtn' class='btn'>End Turn Player 1</button>").insertAfter($(".rules2"));
        // }

        //$("<button id='endTurnBtn' class='btn'>End Turn Player 1</button>").insertAfter($(".rules2"));

        $(board2RptTD).on("click", (function () {
            if ($(this).hasClass("isShip")) {
                $(this, "#board2").addClass("isHit");
                hitCountP1++;
                //$(".score1").replaceWith($("<h3 class='score canHide'>Player 1 Hit Count: " + hitCountP1 + "/14</h3>"));          //fix, replaces all of rules and above
                if (hitCountP1 === 14) {
                    //call win screen
                }
            }
            else {
                $(this, "#board2").addClass("isMiss");
            }

            $("td").off("click");
            //$("<button id='endTurnBtn' class='btn'>End Turn Player 1</button>").insertAfter($(".rules2"));
            endTurnBtn.insertAfter($(".rules2"));
        }));

        $(endTurnBtn).on("click", (function () {
            // board2Rpt.addClass("hide");
            // endTurnBtn.addClass("hide");
            // $("#board1").addClass("hide");
            // $(".canHide").addClass("hide");
            board2Rpt.remove();
            endTurnBtn.remove();
            $("#board1").remove();
            $(".canHide").remove();
            //turnP1++;
            //**************playerTurn++;
            startTurnBtn.removeClass("hide");
            TwoPlayersP2Turn();
            //console.log("End Turn Button was clicked!");
        }));
    }




    function TwoPlayersP2Turn() {
        //let turnP1 = 1;
        //$("<button id='startBtn' class='btn'>Start Turn " + turnP1 + ", Player 1</button>").insertAfter($("h1"));
        let board1Rpt = $("#board1");
        let board1RptTD = $("#board1 td");
        startTurnBtn.removeClass("hide");
        startTurnBtn.insertAfter($("h1"));
        //$("<button id='endTurnBtn' class='btn'>End Player Turn</button>");

        //P1 START TURN
        startTurnBtn.on("click", (function () {
            board1Rpt.removeClass("hide");
            board1RptTD.addClass("isShipHide");
            //board2RptTD.addClass("isHit");

            board1Rpt.prependTo($("#board2"));
            startTurnBtn.addClass("hide");
            $("#board2").removeClass("hide");

            $("<h2 class='turn canHide'>Player 2's Turn!</h2>").insertAfter($("h1"));

            $("<h3 class='score1 canHide'>Player 1 Hit Count: " + hitCountP1 + "/14</h3>").insertAfter($(".turn"));
            $("<h3 class='score2 canHide'>Player 2 Hit Count: " + hitCountP2 + "/14</h3>").appendTo($(".score1"));

            $("<p class='placeTitle rules0 canHide'>!!!!!!!!!!!!!Rules!!!!!!!!!!!!!</p>").appendTo($(".score2"));
            $("<p class='placeTitle rules1 canHide'>1.) Click onto the other player's board (shown on top) to attack!</p>").appendTo($(".rules0"));
            $("<p class='placeTitle rules2 canHide'>2.) White denotes a miss - Red denotes a hit</p>").appendTo($(".rules1"));

            //createEndTurnBtn();
        }));

        // function createEndTurnBtn(){
        //     $("<button id='endTurnBtn' class='btn'>End Turn Player 1</button>").insertAfter($(".rules2"));
        // }

        //$("<button id='endTurnBtn' class='btn'>End Turn Player 1</button>").insertAfter($(".rules2"));

        board1RptTD.on("click", (function () {
            if ($(this).hasClass("isShip")) {
                $(this, "#board1").addClass("isHit");
                hitCountP2++;
                //$(".score1").replaceWith($("<h3 class='score canHide'>Player 1 Hit Count: " + hitCountP1 + "/14</h3>"));          //fix, replaces all of rules and above
                if (hitCountP2 === 14) {
                    //call win screen
                }
            }
            else {
                $(this, "#board1").addClass("isMiss");
            }

            $("td").off("click");
            //$("<button id='endTurnBtn' class='btn'>End Turn Player 1</button>").insertAfter($(".rules2"));
            endTurnBtn.insertAfter($(".rules2"));
        }));

        endTurnBtn.on("click", (function () {
            board1Rpt.addClass("hide");
            endTurnBtn.addClass("hide");
            $("#board2").addClass("hide");
            $(".canHide").addClass("hide");
            //turnP1++;
            //***************playerTurn--;
            TwoPlayersP1Turn();
            //console.log("End Turn Button was clicked!");
        }));
    }



    // function TwoPlayersP2Turn() {
    //     //let turnP2 = 1;
    //     //$("<button id='startBtn' class='btn'>Start Turn " + turnP2 + ", Player 2</button>").insertAfter($("h1"));
    //     let board1Rpt = $("#board1");
    //     let board1RptTD = $("#board1 td")

    //     //P2 START TURN
    //     $(startTurnBtn).on("click", (function () {
    //         $(board1Rpt).removeClass("hide");
    //         board1RptTD.addClass("isShipHide");

    //         $(endTurnBtn).removeClass("hide");
    //         $("#board1").removeClass("hide");
    //         $(".canHide").removeClass("hide");
    //         //board2RptTD.addClass("isHit");

    //         board1Rpt.prependTo($("#board2"));
    //         $(startTurnBtn).addClass("hide");
    //         $("#board2").removeClass("hide");

    //         $("<h2 class='turn canHide'>Player 2's Turn!</h2>").insertAfter($("h1"));

    //         $("<h3 class='score1 canHide'>Player 1 Hit Count: " + hitCountP1 + "/14</h3>").insertAfter($(".turn"));
    //         $("<h3 class='score2 canHide'>Player 2 Hit Count: " + hitCountP2 + "/14</h3>").appendTo($(".score1"));

    //         $("<p class='placeTitle rules0 canHide'>!!!!!!!!!!!!!Rules!!!!!!!!!!!!!</p>").appendTo($(".score2"));
    //         $("<p class='placeTitle rules1 canHide'>1.) Click onto the other player's board (shown on top) to attack!</p>").appendTo($(".rules0"));
    //         $("<p class='placeTitle rules2 canHide'>2.) White denotes a miss - Red denotes a hit</p>").appendTo($(".rules1"));

    //         //createEndTurnBtn();
    //     }));

    //     // function createEndTurnBtn(){
    //     //     $("<button id='endTurnBtn' class='btn'>End Turn Player 1</button>").insertAfter($(".rules2"));
    //     // }

    //     //$("<button id='endTurnBtn' class='btn'>End Turn Player 1</button>").insertAfter($(".rules2"));

    //     $(board1RptTD).on("click", (function () {
    //         if ($(this).hasClass("isShip")) {
    //             $(this, "#board1").addClass("isHit");
    //             hitCountP2++;
    //             //$(".score1").replaceWith($("<h3 class='score canHide'>Player 1 Hit Count: " + hitCountP1 + "/14</h3>"));          //fix, replaces all of rules and above
    //             if (hitCountP2 === 14) {
    //                 //call win screen
    //             }
    //         }
    //         else {
    //             $(this, "#board1").addClass("isMiss");
    //         }

    //         $("td").off("click");
    //         //$("<button id='endTurnBtn' class='btn'>End Turn Player 1</button>").insertAfter($(".rules2"));
    //         $(endTurnBtn).insertAfter($(".rules2"));
    //     }));

    //     $(endTurnBtn).on("click", (function () {
    //         $(board1Rpt).addClass("hide");
    //         $("#board2").addClass("hide");
    //         $(".canHide").addClass("hide");
    //         //turnP2++;
    //         turn++;
    //         playerTurn--;
    //         TwoPlayersP1Turn();
    //         //console.log("End Turn Button was clicked!");
    //     }));
    // }




}



//on click, make isShot go to 1, add isShot to the <td></td> cell, adjust numbers
// look into above loop and jquery to see if you can target the specific table data cell



// 1.) isShip starts at 1 if a ship is there. When isShot goes to 1 (on click),
// isHit goes to 1 as well
// 2.) Don't allow location to be shot at again if isShot = 1


//TO DO STILL:
// 1.) Add rules list at top
// 2.) Add forfeit button (turns all object numbers to 1 to reveal board)