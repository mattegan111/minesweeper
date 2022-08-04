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
    let isMined = Boolean(Math.floor(Math.random() + 0.15))
    let cell = new Cell(
      isMined, 
      false, 
      false, 
      row, 
      column, 
      0 
      )
    cells.push(cell)
  }
}

cells.forEach((cell, key) => {
  const currentCellRow = cell.row
  const currentCellColumn = cell.column
  
  let possibleRows = [currentCellRow - 1, currentCellRow, currentCellRow + 1]
  let filteredPossibleRows = possibleRows.filter(row => {return row > -1 && row < sideLength})
  
  let possibleColumns = [currentCellColumn - 1, currentCellColumn, currentCellColumn + 1]
  let filteredPossibleColumns = possibleColumns.filter(column => {return column > -1 && column < sideLength})

  let possibleCoords = []
  filteredPossibleRows.forEach(row => {
    filteredPossibleColumns.forEach(column => {
      if(`${row}${column}` != `${currentCellRow}${currentCellColumn}`){
        possibleCoords.push(`${row}${column}`)
      }
    })
  })

  let minesNearbyCount = 0
  possibleCoords.forEach(coordStr => {
    let cellAtCoords = cells.find(cell => {return cell.row == coordStr[0] && cell.column == coordStr[1]})
    if(cellAtCoords.isMined == true){
      minesNearbyCount++  
    }
  })

  cell.minesNearbyCount = minesNearbyCount
})

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
window.oncontextmenu = handleRightClick

function handleLeftClick(e) {
  const targetCellCoords = e.target.classList[0]
  const targetCell = cells.find(cell => {
    return cell.row == targetCellCoords[0] && cell.column == targetCellCoords[1]
  })
  targetCell.isRevealed = true
  e.target.classList.add('cell-revealed')
  e.target.innerHTML += targetCell.minesNearbyCount
  e.target.innerHTML += targetCell.isMined
  checkLoss(targetCell)
}

function handleRightClick(e) {
  e.preventDefault()
  const targetCellCoords = e.target.classList[0]
  const targetCell = cells.find(cell => {
    return cell.row == targetCellCoords[0] && cell.column == targetCellCoords[1]
  })
  targetCell.isFlagged = !targetCell.isFlagged
  e.target.classList.toggle('cell-flagged')
}

function checkLoss(targetCell){
  if(targetCell.isMined == true) { 
    alert('you lose') 
    location.reload()
  }
}