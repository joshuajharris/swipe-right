'use strict'

const React = require('react')
const Component = React.Component
const PropTypes = React.PropTypes

const Card = require('./Card')
const style = {
    position: 'relative'
}

/**
 * A component that renders a series of cards in a deck.
 * Only the first two cards are rendered at any given time.
 * The user is able to interact with the top card by swiping left
 * or right.  Once a given card has been interacted with, it is popped 
 * off the stack and the following card replaces it.
 */

class Deck extends Component {
  render() {
    return (
      <div style={style}>
        {this.props.children.slice(0, 2).map((card, index) => {
            if (index === 0) {
                return (
                    <Card index={index}>{card.props.children}</Card>
                )
            }
            if (index === 1) {
                return (
                    <Card index={index}>{card.props.children}</Card>
                )
            }
        })}
      </div>
    )
  }
}

Deck.propTypes = {
  children: PropTypes.any,
  index: PropTypes.number
}

module.exports = Deck
