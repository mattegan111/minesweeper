let targetRowColCoords = []

window.onclick = (e) => {
  targetRowColCoords = [e.target.className.split(" ")[0], e.target.parentElement.className]
  e.target.innerHTML = gameboardSolution[targetRowColCoords[0]][targetRowColCoords[1]]
  const surroundingCellsCoords = getSurroundingCellsCoords(targetRowColCoords[0], targetRowColCoords[1])
  updateSurroundingCells(surroundingCellsCoords)
}

function updateSurroundingCells(surroundingCellsCoords) {
  surroundingCellsCoords.forEach(coord => {
    const cell = document.getElementById(`${coord[0]}${coord[1]}`)
    // cell.innerHTML = '#'
    if (gameboardSolution[coord[0]][coord[1]] == 'o'){
      cell.innerHTML = gameboardSolution[coord[0]][coord[1]]
      flushEmptyCells(coord)
    }
  })
}

function flushEmptyCells(oldCoord) {
  const surroundingCellsCoords = getSurroundingCellsCoords(oldCoord[0], oldCoord[1])
  surroundingCellsCoords.forEach(coord => {
    const cell = document.getElementById(`${coord[0]}${coord[1]}`)
    if (gameboardSolution[coord[0]][coord[1]] == 'o'){
      cell.innerHTML = gameboardSolution[coord[0]][coord[1]]
    }
  })
}

function getSurroundingCellsCoords(row, col) {
  row = parseInt(row)
  col = parseInt(col)

  const surroundingCellsCoords = []
  let rowOffset = -1
  let colOffset = -1

  for(let i = 0; i < 3; i++){
    surroundingCellsCoords.push([row + rowOffset, col + colOffset])
    rowOffset++
  }
  rowOffset = -1
  colOffset++
  for(let i = 0; i < 3; i++){
    surroundingCellsCoords.push([row + rowOffset, col + colOffset])
    rowOffset++
  }
  rowOffset = -1
  colOffset++
  for(let i = 0; i < 3; i++){
    surroundingCellsCoords.push([row + rowOffset, col + colOffset])
    rowOffset++
  }

  rowOffset = -1
  colOffset = -1

  // remove arrays which contain negatives
  for(let i = surroundingCellsCoords.length - 1; i >= 0; i--){
    let smallestCoord = Math.min(...surroundingCellsCoords[i])
    if(smallestCoord < 0){
      surroundingCellsCoords.splice(i, 1)
    }
    let largestCoord = Math.max(...surroundingCellsCoords[i])
    if(largestCoord > 4){
      surroundingCellsCoords.splice(i, 1)
    }
  }

  //remove target element coordinates
  surroundingCellsCoords.forEach((coords, key) => {
    const coordsString = `${coords[0]}${coords[1]}`
    const keyString = `${row}${col}`
    if(coordsString == keyString){
      surroundingCellsCoords.splice(key, 1)
    }
  })

  return surroundingCellsCoords
}

window.oncontextmenu = (e) => {
  e.preventDefault()
  if(e.target.innerHTML == '☐'){
    e.target.innerHTML = '?'
  } else if(e.target.innerHTML == '?'){
    e.target.innerHTML = '☐'
  }
}

const gameboardSolution = [
  ['☐', '☐', '☐', '☐', '☐'],
  ['☐', '☐', '☐', '☐', '☐'],
  ['☐', '☐', '☐', '☐', '☐'],
  ['☐', '☐', '☐', '☐', '☐'],
  ['☐', '☐', '☐', '☐', '☐']
]

function placeMines() {
  gameboardSolution.forEach((column, colKey) => {
    column.forEach((row, rowKey) => {
      if (Math.random() > 0.5){
        gameboardSolution[colKey][rowKey] = 'x'
      } else {
        gameboardSolution[colKey][rowKey] = 'o'
      }
    })
  })
}

placeMines()