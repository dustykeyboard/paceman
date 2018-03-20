import Vector from './vector.js'
import Player from './player.js'

const Pacman = (screen, width = 40, height = 30) => {
  const dotsEl = document.createElement('div')
  dotsEl.classList.add('dots')
  screen.appendChild(dotsEl)

  const playerEl = document.createElement('div')
  playerEl.classList.add('player')
  screen.appendChild(playerEl)

  const player = Player({
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
    direction: 'right',
  })

  const boundary = {
    min: Vector({
      x: 0,
      y: 0,
    }),
    max: Vector({
      x: width - 1,
      y: height - 1,
    }),
  }

  const walls = []

  let dots = []
  for (var x = 0; x <= width; x++) {
    for (var y = 0; y <= height; y++) {
      dots.push(Vector({ x, y }))
    }
  }

  function run() {
    console.log('waka waka waka')
    draw()
    setInterval(() => {
      update()
      draw()
    }, 500)
  }

  function updateDirection(requestedDirection) {
    player.setDirection(requestedDirection)
  }

  function playerCanMoveTo(nextPosition) {
    console.log('canMove', 'check if nextPosition is valid')
    if (
      nextPosition.x < 0 ||
      nextPosition.y < 0 ||
      nextPosition.x > width ||
      nextPosition.y > height
    )
      return false
    return true
  }

  function update() {
    if (playerCanMoveTo(player.nextPosition())) {
      player.move()
    }

    eatDots()
  }

  function eatDots() {
    let nearest = { distance: 1000 }

    dots.forEach((dot, index) => {
      const distance =
        Math.abs(dot.x - player.x) * Math.abs(dot.x - player.x) +
        Math.abs(dot.y - player.y) * Math.abs(dot.y - player.y)

      if (distance < nearest.distance) {
        nearest = {
          distance,
          index,
        }
      }
    })

    console.log(nearest)

    if (nearest.distance < 90) {
      console.log('nom nom nom', nearest)
      dots.splice(nearest.index, 1)
    }
  }

  const drawDot = ({ x, y }) => {
    const top = 100 * y / height
    const left = 100 * x / width
    return `<div class='dot' style='top:${top}%;left:${left}%'></div>`
  }

  function drawPlayer() {
    const { x, y } = player.getPosition()
    playerEl.style.top = 100 * y / height + '%'
    playerEl.style.left = 100 * x / width + '%'
  }

  function draw(context) {
    dotsEl.innerHTML = dots.map(drawDot).join('')
    drawPlayer()
  }

  return {
    updateDirection,
    run,
  }
}

export default Pacman
