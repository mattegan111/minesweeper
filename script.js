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
  gameboardSolution.forEach(column => {
    column.forEach(cell => {
      if (Math.random() > 0.5){
        cell.innerHTML = x
      }
    })
  })
}

placeMines()
