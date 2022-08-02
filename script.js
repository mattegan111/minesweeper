class Cell {
  constructor(isMined, isFlagged, row, column, minesNearbyCount){
    this.isMined = isMined;
    this.isFlagged = isFlagged;
    this.row = row;
    this.column = column;
    this.minesNearbyCount = minesNearbyCount;
  }
}