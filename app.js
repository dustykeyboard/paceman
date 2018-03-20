import Pacman from './pacman.js'

window.addEventListener('load', () => {
  const app = document.querySelector('#app')

  const game = Pacman(app)
  game.run()

  window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        game.updateDirection('left')
        break
      case 38:
        game.updateDirection('up')
        break
      case 39:
        game.updateDirection('right')
        break
      case 40:
        game.updateDirection('down')
        break
    }
  })
})
