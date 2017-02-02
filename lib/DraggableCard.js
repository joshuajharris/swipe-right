'use strict'


const Card = require('./Card')

/**
 * A React card component that implements a draggable behavior.
 */

class DraggableCard {

  render() {
    return (
      <Card>
        {this.props.children}
      </Card>
    )
  }

}

module.exports = DraggableCard
