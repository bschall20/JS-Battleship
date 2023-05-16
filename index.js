const board = [];
for (let i = 0; i < 100; i++){
    board[i] = {
        location: i,        // Keep track of board location
        isShot: 0,          // Keep track if location was shot at
        isShip: 0,          // Keep track if location is ship (used for before game starts)
        isHit: 0            // Keep track if ship is hit
    };
}
                            // 1.) isShip starts at 1 if a ship is there. When isShot goes to 1 (on click), 
                                    // isHit goes to 1 as well
                            // 2.) Don't allow location to be shot at again if isShot = 1
console.log(board);

// Look how to turn an array into a table
// Ships can be placed horizontal 0-9 (10-19, 20-29, etc.) but not 9 into 0-8 (ex: 19 into 22)
// Ships can be placed vertical at increments of 10 (0, 10, 20) (ex: 27, 37, and 47)
