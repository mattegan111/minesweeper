class Cell {
  constructor(isMined, isFlagged, isRevealed, row, column, minesNearbyCount){
    this.isMined = isMined;
    this.isFlagged = isFlagged;
    this.isRevealed = isRevealed;
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
      false, 
      row, 
      column, 
      0 
    )
    cells.push(cell)
  }
}

const gameboardDOM = document.getElementById('gameboard')
gameboardDOM.style.gridTemplateColumns = `repeat(${sideLength}, 1fr)`;
gameboardDOM.style.gridTemplateRows = `repeat(${sideLength}, 1fr)`;

cells.forEach(cell => {
  const cellElement = document.createElement('div')
  cellElement.classList.add(`${cell.row}${cell.column}`)
  cellElement.classList.add('cell')
  gameboardDOM.append(cellElement)
})

window.onclick = handleLeftClick

function handleLeftClick(e) {
  const targetCellCoords = e.target.classList[0]
  const targetCell = cells.find(cell => {
    return cell.row == targetCellCoords[0] && cell.column == targetCellCoords[1]
  })
  targetCell.isRevealed = true
  e.target.classList.add('cell-revealed')
}