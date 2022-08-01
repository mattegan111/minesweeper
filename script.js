let targetRowColCoords = []

window.onclick = (e) => {
  targetRowColCoords = [e.target.className.split(" ")[0], e.target.parentElement.className]
  e.target.innerHTML = gameboardSolution[targetRowColCoords[0]][targetRowColCoords[1]]
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