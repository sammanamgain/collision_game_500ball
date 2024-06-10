let cellsize = 100;
let row = Math.floor(window.innerWidth / cellsize);
let col = Math.floor(window.innerHeight / cellsize);
let numCellsX = Math.ceil(window.innerWidth / cellsize);
let numCellsY = Math.ceil(window.innerHeight / cellsize);
// defining the grid
// this will initialze the grid array with list of columns where each column hold the number of row array
// like grid [   [[],[],[]],[],[]]
// grid [0]==first column
// grid [0][1] ==first row

let grid = [];

for (let y = 0; y < numCellsY; y++) {
  grid[y] = [];
  for (let x = 0; x < numCellsX; x++) {
    grid[y][x] = [];
  }
}


console.log("in grid file",grid)