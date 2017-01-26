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
        <div className="card">
            {this.props.children}
        </div>
    )
  }

}

Card.propTypes = {
  children: PropTypes.any
}

module.exports = Card
