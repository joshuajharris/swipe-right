'use strict'

const React = require('react')
const Component = React.Component
const PropTypes = React.PropTypes

class Deck extends Component {
  render() {
      return (
            <div>
                { this.props.children }
            </div>
        )
    }
}

Deck.propTypes = {
  children: PropTypes.any
}

module.exports = Deck
