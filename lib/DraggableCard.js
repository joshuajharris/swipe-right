'use strict'

const DIRECTIONS = {
  NONE: 1,
  LEFT: 2,
  RIGHT: 4,
  UP: 8,
  DOWN: 16,
  HORIZONTAL: 6,
  VERTICAL: 24,
  ALL: 30
}

const Card = require('./Card')
const React = require('react')
const Component = React.Component
const PropTypes = React.PropTypes
const Hammer = require('react-hammerjs')

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
      break
    case DIRECTIONS.RIGHT:
      console.log('i swipe right')
      break
    default:
      console.log('direction was neither left nor right')
      break
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

DraggableCard.propTypes = {
  children: PropTypes.node
}

module.exports = DraggableCard
