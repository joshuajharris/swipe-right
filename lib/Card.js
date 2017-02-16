'use strict'

const React = require('react')
const Component = React.Component
const PropTypes = React.PropTypes

/**
 * A React card component.
 */

const cardStyle = {
  zIndex: 0,
  width: 200,
  height: 300,
  border: '1px solid #999999',
  padding: '.5rem',
  position: 'absolute',
  background: 'white'
}

class Card extends Component {

  render() {

    const style = Object.assign({}, cardStyle)
    if (this.props.index === 1) {
      style.width = 190
      style.transform = 'translate(5px, 5px)'
      style.zIndex = '-1'
    }

    return (
        <div
            style={style}
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
