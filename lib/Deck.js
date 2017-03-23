'use strict';

const React = require('react');
const Component = React.Component;
const PropTypes = React.PropTypes;

const Card = require('./Card');
const DraggableCard = require('./DraggableCard');

const classNames = require('classnames');

const style = {
  position: 'relative'
};

/**
 * A component that renders a series of cards in a deck.
 * Only the first two cards are rendered at any given time.
 * The user is able to interact with the top card by swiping left
 * or right.  Once a given card has been interacted with, it is popped
 * off the stack and the following card replaces it.
 */

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: this.props.cards
    };
  }

  removeCard(side, cardId) {
    setTimeout(function() {
      if (side === 'left') {
        this.setState({alertLeft: false});
        this.props.reject();
      }
      else if (side === 'right') {
        this.setState({alertRight: false});
        this.props.accept();
      }
    }.bind(this), 3000);

    this.setState({
      cards: this.state.cards.filter(function(c) {
        return c.id !== cardId;
      }),
      alertLeft: side === 'left',
      alertRight: side === 'right'
    });
  }

  render() {
    const cards = this.state.cards.map(function(c, index, coll) {
      const props = {
        cardId: c.id,
        key: index,
        index: index,
        onOutScreenLeft: this.removeCard.bind(this, 'left'),
        onOutScreenRight: this.removeCard.bind(this, 'right'),
        title: c.title,
        text: c.text
        // image: c.image
      };

      const component = (index === (coll.length - 1))
        ? DraggableCard
        : Card;

      return React.createElement(component, props);
    }, this);

    const classesAlertLeft = classNames({
      'alert-visible': this.state.alertLeft,
      'alert-left': true,
      'alert': true
    });
    const classesAlertRight = classNames({
      'alert-visible': this.state.alertRight,
      'alert-right': true,
      'alert': true
    });

    return (
        <div>
          <div className={classesAlertLeft}>left</div>
          <div className={classesAlertRight}>right</div>
          <div style={style}>
            {cards}
          </div>
        </div>
    );
  }
}

Deck.propTypes = {
  children: PropTypes.any,
  index: PropTypes.number,
  cards: PropTypes.array,
  reject: PropTypes.any,
  accept: PropTypes.any
};

module.exports = Deck;
