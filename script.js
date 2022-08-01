let targetRowColCoords = []

window.onclick = (e) => {
  targetRowColCoords = [e.target.className.split(" ")[0], e.target.parentElement.className]
  console.log(targetRowColCoords)
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
      }
    })
  })
}

placeMines()