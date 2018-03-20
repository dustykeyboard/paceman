import Vector from './vector.js'

const UP = 'up'
const DOWN = 'down'
const LEFT = 'left'
const RIGHT = 'right'

const Player = ({ x = 0, y = 0, nextDirection = RIGHT, lives = 3, score = 0 }) => {
  let direction = nextDirection
  let position = Vector({ x, y })

  function setDirection(requestedDirection) {
    if ([UP, DOWN, LEFT, RIGHT].includes(requestedDirection)) {
      direction = requestedDirection
    }
  }

  function getDirection() {
    return direction
  }

  function getPosition() {
    return position
  }

  function nextPosition() {
    const speed = 1
    const { x, y } = position
    switch (direction) {
      case UP:
        return { x, y: y - speed }
      case DOWN:
        return { x, y: y + speed }
      case LEFT:
        return { y, x: x - speed }
      case RIGHT:
        return { y, x: x + speed }
    }
    return position
  }

  function move() {
    position = nextPosition()
    return position
  }

  return {
    getPosition,
    nextPosition,
    move,
    getDirection,
    setDirection,
  }
}

export default Player
