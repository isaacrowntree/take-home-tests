

// Psuedocode

/*

 Initial seed of cells (some matrix of 0/1s )

Apply first round of rules

on every `tick` after that we want the cells to go through a state transition
according to those rules

*/

// seed board
let seed = [
  [1, 1, 0],
  [0, 1, 1],
  [0, 0, 0],
];


for (let l = 0; l < seed.length; l++) {
  console.log(seed[l]);
}

console.log('-----');

setInterval(() => {
  // apply rules to the seed

  let board = [];

  for(let x = 0; x < seed.length; x++) {
    let row = seed[x];

    if (!board[x]) {
      board.push([]);
    }

    for (let y = 0; y < seed[x].length; y++) {
      let cell = row[y];

      const xyValues = [
        [x+1, y], [x-1, y], [x, y+1], [x, y-1],
        [x+1, y+1], [x-1, y-1], [x+1, y-1], [x-1, y+1],
      ];

      // console.log(xyValues.length);

      let neighbors = []

      for (let i = 0; i < xyValues.length; i++) {
        const [x, y] = xyValues[i];
        // console.log(x, y)

        if (x >= 0 && y >= 0 && seed[x] && seed[x][y]) {
          neighbors.push(seed[x][y]);
        }
      }
      // console.log(neighbors);
      let countOfOnes = 0;

      for (let k = 0; k < neighbors.length; k++) {
        if (neighbors[k]) {
          countOfOnes++;
        }
      }

      // Rules
      if (countOfOnes === 2 && cell === 1) {
        board[x][y] = 1; // A populated cell stays populated
      } else if (countOfOnes < 2) {
        board[x][y] = 0; // A dead/unpopulated cell
      } else if (countOfOnes === 3) {
        board[x][y] = 1; // Cell comes back to life
      } else if (countOfOnes > 3) {
        board[x][y] = 0; // Dead by over-population
      } else {
        board[x][y] = 0;
      }
    }
  }

  seed = board;

  for (let l = 0; l < board.length; l++) {
    console.log(board[l]);
  }

  console.log('-----');

}, 1000);
