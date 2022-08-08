//create cells
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
    // let isMined = Boolean(Math.floor(Math.random() + 0.15))
    let isMined = false
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

//build gameboard
const gameboardDOM = document.getElementById('gameboard')
gameboardDOM.style.gridTemplateColumns = `repeat(${sideLength}, 1fr)`;
gameboardDOM.style.gridTemplateRows = `repeat(${sideLength}, 1fr)`;

cells.forEach(cell => {
  const cellElement = document.createElement('div')
  cellElement.setAttribute("id", `${cell.row}${cell.column}`);
  // cellElement.classList.add(`${cell.row}${cell.column}`)
  cellElement.classList.add('cell')
  gameboardDOM.append(cellElement)
})

window.onclick = handleLeftClick
window.oncontextmenu = handleRightClick

//attribute mines to cells on gameboard
cells.forEach(cell => {
  let nearbyCells = getNearbyCells(cell)
  attributeMinesNearbyCount(cell, nearbyCells)
})

let cellsToTryReveal = []
let blacklistedCells = []
function revealZeroes(targetCell){
  // console.log(targetCell)
  // put target cell at start of array
  cellsToTryReveal.unshift(targetCell)

  //add to array possible cells to reveal recursively
  let nearbyCells = getNearbyCells(targetCell)
  let nearbyCellsWithZeroNearbyMinesCOORDS = nearbyCells.filter(x => {
    return cells[x].minesNearbyCount === 0 //Broken!
  })
  nearbyCellsWithZeroNearbyMinesCOORDS.forEach(x => {
    let cellFromCoord = cells.find(cell => {
      return cell.row == x[0] && cell.column == x[1]
    })
    if(!blacklistedCells.includes(cellFromCoord)){
      cellsToTryReveal.push(cellFromCoord)
    }
  })


  //update the target cell in our script and in DOM
  let cellInCells = cells.find(storedCell => {
    return storedCell.row == targetCell.row && storedCell.column == targetCell.column
  })
  let str = `${cellInCells.row}${cellInCells.column}`
  let cellDOM = document.getElementById(str)
  cellDOM.classList.add('cell-revealed')
  cellDOM.innerHTML += cellInCells.minesNearbyCount
  cellDOM.innerHTML += cellInCells.isMined

  //remove target cell from array
  blacklistedCells.push(cellsToTryReveal[0])
  cellsToTryReveal.splice(0, 1)

  if(cellsToTryReveal.length > 0){
    revealZeroes(cellsToTryReveal[0])
  }

  blacklistedCells = []
}

//utils
function attributeMinesNearbyCount(cell, nearbyCells){
  let minesNearbyCount = 0
  nearbyCells.forEach(coordStr => {
    let cellAtCoords = cells.find(cell => {return cell.row == coordStr[0] && cell.column == coordStr[1]})
    if(cellAtCoords.isMined == true){
      minesNearbyCount++  
    }
  })

  cell.minesNearbyCount = minesNearbyCount
}

function getNearbyCells(cell) {
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

  return possibleCoords
}

function handleLeftClick(e) {
  const targetCellCoords = e.target.id
  const targetCell = cells.find(cell => {
    return cell.row == targetCellCoords[0] && cell.column == targetCellCoords[1]
  })
  targetCell.isRevealed = true
  e.target.classList.add('cell-revealed')
  e.target.innerHTML += targetCell.minesNearbyCount
  e.target.innerHTML += targetCell.isMined
  checkLoss(targetCell)
  if(targetCell.minesNearbyCount === 0){
    revealZeroes(targetCell)
  }
}

function handleRightClick(e) {
  e.preventDefault()
  const targetCellCoords = e.target.id
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