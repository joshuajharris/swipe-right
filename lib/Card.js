'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Component = React.Component;
const PropTypes = React.PropTypes;
const classNames = require('classnames');

/**
 * A React card component.
 */

const cardStyle = {
  width: 200,
  height: 300,
  border: '1px solid #999999',
  padding: '.5rem',
  position: 'absolute',
  background: 'white'
};

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: {
        x: 0,
        y: 0
      }
    };

    this.setInitialPosition = this.setInitialPosition.bind(this);
  }

  setInitialPosition() {
    const screen = document.getElementById('root'),
      card = ReactDOM.findDOMNode(this),

      initialPosition = {
        x: Math.round((screen.offsetWidth - card.offsetWidth) / 2),
        y: Math.round((screen.offsetHeight - card.offsetHeight) / 2)
      };

    this.setState({
      initialPosition: initialPosition
    });
  }

  componentDidMount() {
    this.setInitialPosition();

    window.addEventListener('resize', this.setInitialPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setInitialPosition);
  }

  render() {
    const initialTranslate = ''.concat('translate3d(',
      this.state.initialPosition.x + 'px,',
      this.state.initialPosition.y + 'px,',
      '0px)');

    const style = Object.assign({},
      cardStyle,
      {
        msTransform: initialTranslate,
        WebkitTransform: initialTranslate,
        transform: initialTranslate,
        zIndex: this.props.index
      }, this.props.style);

    const classes = classNames(
      {
        card: true
      },
      this.props.classes);

    return (
      <div style={style} className={classes}>
        <h1>{this.props.title}</h1>
        <p>{this.props.text}</p>
      </div>
    );
  }

}

Card.propTypes = {
  children: PropTypes.any,
  index: PropTypes.number,
  style: PropTypes.any,
  classes: PropTypes.any,
  title: PropTypes.string,
  text: PropTypes.string
};

module.exports = Card;
