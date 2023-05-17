//******************************CREATE PLAYER BOARD******************************
const board = [];
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
var table = $("<table></table>");
for (var i = 0; i < board.length; i++) {

    if (i % 11 === 0) {
        var row = $("<tr></tr>");
    }

    if (i % 11 === 0 || (0 <= i && i <= 10 )) {
        row.append($("<th class='isShot'></th>").html(board[i].cellFill));
    }
    else {row.append($("<td></td>").html(board[i].cellFill));}
    table.append(row);
}
table.appendTo($(".board"));
// console.log(board);
console.log(board);

//****************************END CREATE PLAYER BOARD****************************
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
//******************************SET UP PLAYER BOARD******************************

// $.each(board, function(i, elem){
//     if(board[i].isShot === 1){
//         $(elem).addClass('isShot');
//     }
// });

board.forEach(e => {
    // console.log(e)
    if(e.isShot === 1){
        // console.log(e);
        $(e).addClass("isShot");
    }

    // if(e.isShot === 1){
    //     // $("e").addClass("isShot");
    //     // e.classList.add("isShot");
    // }
});








//****************************END SET UP PLAYER BOARD****************************


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