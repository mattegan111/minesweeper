//create cells
class Cell {
  constructor(isMined, isFlagged, isRevealed, row, column, minesNearbyCount) {
    this.isMined = isMined
    this.isFlagged = isFlagged
    this.isRevealed = isRevealed
    this.row = row
    this.column = column
    this.minesNearbyCount = minesNearbyCount
  }
}

const sideLength = 10
const cells = []

for (let i = 0; i < sideLength; i++) {
  let row = i
  for (let j = 0; j < sideLength; j++) {
    let column = j
    let isMined = Boolean(Math.floor(Math.random() + 0.15))
    let cell = new Cell(isMined, false, false, row, column, 0)
    cells.push(cell)
  }
}

//build gameboard
const gameboardDOM = document.getElementById('gameboard')
gameboardDOM.style.gridTemplateColumns = `repeat(${sideLength}, 1fr)`
gameboardDOM.style.gridTemplateRows = `repeat(${sideLength}, 1fr)`

cells.forEach((cell) => {
  const cellElement = document.createElement('div')
  cellElement.classList.add(`${cell.row}${cell.column}`)
  cellElement.classList.add('cell')
  gameboardDOM.append(cellElement)
})

window.onclick = handleLeftClick
window.oncontextmenu = handleRightClick

//attribute mines to cells on gameboard
cells.forEach((cell) => {
  let nearbyCells = getNearbyCells(cell)
  attributeMinesNearbyCount(cell, nearbyCells)
})

//reveal 0 cells recursively
let cellsToTryReveal = []
function revealZeroes(targetCell) {
  // 1 cells to check neighbors of
  // 2 cells to reveal
  // 3 cells of which their neigbors have been checked
  // start at target cell.
  // get the neighbors of val 0
  //   add them to array "2: cells to reveal array"
  //   add them to "1 cells to check neighbors of", if not added already
  // add target cell to "3 cells of which their neigbors have been checked"
  // next, we repeat the process above for each cell in array 1
  // // !!! must use a normal for loop so that cells added during iteration will also be processed as the index reaches them.
  // check whether this cell is already in array 3, exit if true
  // if we have no cells to do, the process is complete and we can reveal cells in arr 2
  // continue to loop through array 1, each time ensuring the cell had not already been checked.
  // console.log(targetCell)
  // let nearbyCells = getNearbyCells(targetCell)
  // let nearbyCellsWithZeroNearbyMines = nearbyCells.filter(x => {
  //   return cells[x].minesNearbyCount === 0
  // })
  // nearbyCellsWithZeroNearbyMines.forEach(x => {
  //   cellsToTryReveal.push(x)
  // })
  // cellsToTryReveal.forEach((revealTargetCell, key) => {
  //   console.log(revealTargetCell)
  //   let cellInCells = cells.find(storedCell => {
  //     return (storedCell.row === revealTargetCell[0] && storedCell.column === revealTargetCell[1])
  //   })
  //   // console.log(cellInCells[0])
  // })
  // cellsToTryReveal.forEach(cell => {
  //   const targetCell = cells.find(x => {
  //     return x.row == cell[0] && x.column == cell[1]
  //   })
  //   targetCell.isRevealed = true
  //   let cellDOM = document.getElementsByClassName(cell)[0]
  //   console.log(cellDOM)
  //   cellDOM.classList.add('cell-revealed')
  //   cellDOM.innerHTML += targetCell.minesNearbyCount
  //   cellDOM.innerHTML += targetCell.isMined
  // });
}

//utils
function attributeMinesNearbyCount(targetCell, nearbyCells) {
  let minesNearbyCount = 0
  nearbyCells.forEach((cell) => {
    if (cell.isMined == true) {
      minesNearbyCount++
    }
  })

  targetCell.minesNearbyCount = minesNearbyCount
}

function getNearbyCells(cell) {
  const currentCellRow = cell.row
  const currentCellColumn = cell.column

  let possibleRows = [currentCellRow - 1, currentCellRow, currentCellRow + 1]
  let filteredPossibleRows = possibleRows.filter((row) => {
    return row > -1 && row < sideLength
  })

  let possibleColumns = [
    currentCellColumn - 1,
    currentCellColumn,
    currentCellColumn + 1,
  ]
  let filteredPossibleColumns = possibleColumns.filter((column) => {
    return column > -1 && column < sideLength
  })

  let nearbyCells = []
  filteredPossibleRows.forEach((row) => {
    filteredPossibleColumns.forEach((column) => {
      if (`${row}${column}` != `${currentCellRow}${currentCellColumn}`) {
        const nearbyCell = getCellByCoord(row, column)
        nearbyCells.push(nearbyCell)
        // nearbyCells.push(`${row}${column}`) //old way
      }
    })
  })

  return nearbyCells
}

function getCellByCoord(cellRow, cellColumn) {
  const cell = cells.find((x) => x.row == cellRow && x.column == cellColumn)
  return cell
}

function handleLeftClick(e) {
  const targetCellCoords = e.target.classList[0]
  const targetCell = cells.find((cell) => {
    return cell.row == targetCellCoords[0] && cell.column == targetCellCoords[1]
  })
  targetCell.isRevealed = true
  e.target.classList.add('cell-revealed')
  e.target.innerHTML += targetCell.minesNearbyCount
  e.target.innerHTML += targetCell.isMined
  checkLoss(targetCell)
  if (targetCell.minesNearbyCount === 0) {
    revealZeroes(targetCell)
  }
}

function handleRightClick(e) {
  e.preventDefault()
  const targetCellCoords = e.target.classList[0]
  const targetCell = cells.find((cell) => {
    return cell.row == targetCellCoords[0] && cell.column == targetCellCoords[1]
  })
  targetCell.isFlagged = !targetCell.isFlagged
  e.target.classList.toggle('cell-flagged')
}

function checkLoss(targetCell) {
  if (targetCell.isMined == true) {
    alert('you lose')
    location.reload()
  }
}
