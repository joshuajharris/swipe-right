'use strict'

const Card = require('./Card')
const Hammer = require('hammerjs')
const ReactDOM = require('react-dom')

/**
 * A React card component that implements a draggable behavior.
 */

class DraggableCard {

  componentDidMount() {
    this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(this));
  }

  componentWillUnmount() {
    this.hammer.stop()
    this.hammer.destroy()
  }

  render() {
    return (
      <Card>
        {this.props.children}
      </Card>
    )
  }

}

module.exports = DraggableCard
