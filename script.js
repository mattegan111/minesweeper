class Cell {
  constructor(isMined, isFlagged, row, column, minesNearbyCount){
    this.isMined = isMined;
    this.isFlagged = isFlagged;
    this.row = row;
    this.column = column;
    this.minesNearbyCount = minesNearbyCount;
  }
}

const sideLength = 10
const cells = []

for (let i = 0; i < sideLength; i++) {
  let row = i
  for (let j = 0; j < sideLength; j++) {
    let column = j
    let cell = new Cell(
      false, 
      false, 
      row, 
      column, 
      0, 
    )
    cells.push(cell)
  }
}

console.log(cells)