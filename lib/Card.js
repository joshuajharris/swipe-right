'use strict'

const React = require('react')
const Component = React.Component
const PropTypes = React.PropTypes

/**
 * A React card component.
 */

class Card extends Component {

  render() {
    return (
        <div
          style={{
            zIndex: this.props.index
          }}
          className="card">
            {this.props.children}
        </div>
    )
  }

}

Card.propTypes = {
  children: PropTypes.any,
  index: PropTypes.number
}

module.exports = Card
