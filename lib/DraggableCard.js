'use strict';

const DIRECTIONS = {
  NONE: 1,
  LEFT: 2,
  RIGHT: 4,
  UP: 8,
  DOWN: 16,
  HORIZONTAL: 6,
  VERTICAL: 24,
  ALL: 30
};

const Card = require('./Card');
const React = require('react');
const ReactDOM = require('react-dom');
const Component = React.Component;
const PropTypes = React.PropTypes;
const Hammer = require('react-hammerjs');

/**
 * A React card component that implements a draggable behavior.
 */

class DraggableCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      initialPosition: {
        x: 0,
        y: 0
      },
      startPosition: {
        x: 0,
        y: 0
      },
      animation: null
    };

    this.onSwipe = this.onSwipe.bind(this);
    this.onPanStart = this.onPanStart.bind(this);
    this.onPanEnd = this.onPanEnd.bind(this);
    this.onPan = this.onPan.bind(this);
    this.onPanCancel = this.onPanCancel.bind(this);
  }

  getInitialState() {
    return {
      x: 0,
      y: 0,
      initialPosition: {
        x: 0,
        y: 0
      },
      startPosition: {
        x: 0,
        y: 0
      },
      animation: null
    };
  }

  resetPosition() {
    const screen = document.getElementById('root'),
      card = ReactDOM.findDOMNode(this);


    const initialPosition = {
      x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
      y: Math.round((screen.offsetHeight - card.offsetHeight) / 2)
    };

    const initialState = this.getInitialState();
    this.setState({
      x: initialPosition.x,
      y: initialPosition.y,
      initialPosition: initialPosition,
      startPosition: initialState.startPosition
    });
  }

  onPanStart() {
    this.setState({
      animation: false,
      startPosition: {
        x: this.state.x,
        y: this.state.y
      }
    });
    // console.log('------------ON PAN START---------------');
    // console.log(this.state);
  }

  onPanEnd(ev) {
    // console.log('------------ON PAN END---------------');
    // console.log(this.state);
    const screen = document.getElementById('root'),
      card = ReactDOM.findDOMNode(this);


    if (this.state.x < -50) {
      this.props.onOutScreenLeft(this.props.cardId);
    }
    else if ((this.state.x + (card.offsetWidth - 50)) > screen.offsetWidth) {
      this.props.onOutScreenRight(this.props.cardId);
    }
    else {
      this.resetPosition();
      this.setState({
        animation: true
      });
    }
  }

  onPan(ev) {
    this.setState(this.calculatePosition(
      ev.deltaX, ev.deltaY
    ));
    // console.log(this.state);
  }

  onPanCancel(ev) {
    console.log(ev.type);
  }

  onSwipe(event) {
    switch (event.direction) {
    case DIRECTIONS.LEFT:
      console.log('i swipe left');
      break;
    case DIRECTIONS.RIGHT:
      console.log('i swipe right');
      break;
    default:
      console.log('direction was neither left nor right');
      break;
    }
  }

  calculatePosition(deltaX, deltaY) {
    return {
      x: (this.state.initialPosition.x + deltaX),
      y: (this.state.initialPosition.y + deltaY)
    };
  }

  componentDidMount() {
    this.resetPosition();
    window.addEventListener('resize', this.resetPosition);
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.resetPosition);
  }

  render() {
    const translate = ''.concat(
      'translate3d(',
      this.state.x + 'px,',
      this.state.y + 'px,',
      '0px)'
    );

    const style = {
      msTransform: translate,
      WebkitTransform: translate,
      transform: translate
    };

    const classes = {
      animate: this.state.animation
    };

    return (
      <Hammer onPanStart={this.onPanStart}
        onPan={this.onPan}
        onPanCancel={this.onPanCancel}
        onPanEnd={this.onPanEnd}
        onSwipe={this.onSwipe}>
        <Card {...this.props}
          style={style}
          classes={classes}></Card>
      </Hammer>
    );
  }

}

DraggableCard.propTypes = {
  children: PropTypes.node,
  onOutScreenLeft: PropTypes.any,
  onOutScreenRight: PropTypes.any,
  cardId: PropTypes.any
};

module.exports = DraggableCard;
