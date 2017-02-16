'use strict'

const DIRECTIONS = {
  DIRECTION_NONE: 1,
  LEFT: 2,
  RIGHT: 4,
  DIRECTION_UP: 8,
  DIRECTION_DOWN: 16,
  DIRECTION_HORIZONTAL: 6,
  DIRECTION_VERTICAL: 24,
  DIRECTION_ALL: 30
}

const Card = require('./Card')
const React = require('react')
const Component = require('react').Component
const Hammer = require('react-hammerjs')
const ReactDOM = require('react-dom')

/**
 * A React card component that implements a draggable behavior.
 */

class DraggableCard extends Component {
  constructor(props) {
    super(props)
    this.onSwipe = this.onSwipe.bind(this)
  }

  onSwipe(event) {
    switch (event.direction) {
    case DIRECTIONS.LEFT:
      console.log('i swipe left')
      break;
    case DIRECTIONS.RIGHT:
      console.log('i swipe right')
      break;
    default:
      console.log('direction was neither left nor right')
      break;
    }
  }

  render() {
    return (
        <Hammer onSwipe={this.onSwipe}>
            <Card>
                {this.props.children}
            </Card>
        </Hammer>
    )
  }

}

module.exports = DraggableCard
