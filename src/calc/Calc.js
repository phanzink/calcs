import React, { Component } from 'react';
import firebase from '../services/firebase';

import PrevCalcs from './PrevCalcs';

import './assets/styles/styles.scss';

class Calc extends Component {
  state = {
    loading: false,
    num1: 0,
    num2: 0,
    operand: '',
    output: '',
    invalid: false,
    readError: null,
    writeError: null,
    calcs: [],
  };

  componentDidMount () {
    firebase
      .database()
      .ref('show-me-the-calcs/calcs')
      .limitToLast(10)
      .on('value', snap => {
        const getCalcs = snap.val();
        let calcs = [];

        for (const [k, cal] of Object.entries(getCalcs)) {
          calcs.push(cal);
        }
        this.setState({ calcs });
    });
  }

  buttonPress(action) {
    let { num1, num2, operand, output, invalid } = this.state;

    if (invalid) {
      this.setState({ invalid: false });
    }

    switch (action) {
      case ('clear'):
        this.setState({
          num1: 0,
          num2: 0,
          operand: '',
          output: '',
        });

        break;
      case ('del'):
        if (output === '') {
          this.setState({ invalid: true });
        }

        this.setState({
          output: output.substring(0, output.length -1)
        });

        break;
      case ('/'):
      case ('x'):
      case ('-'):
      case ('+'):
        if (output === '') {
          output = 0;
        }

        this.setState({
          num1: output,
          operand: action,
          output: '',
        });

        break;
      case ('.'):
        this.setState({
          output: (output + action)
        });

        break;
      case ('='):
        if (operand === '' || output === '') {
          this.setState({
            invalid: true,
          });

          break;
        }

        num2 = output;
        let operation = '';

        switch (operand) {
          case('+'):
            operation = parseFloat(num1) + parseFloat(num2);
          break;
          case('-'):
            operation = parseFloat(num1) - parseFloat(num2);
          break;
          case('x'):
            operation = parseFloat(num1) * parseFloat(num2);
          break;
          case('/'):
            operation = parseFloat(num1) / parseFloat(num2);
          break;
          default:
            return this.setState({ invalid: true });
        }

        let string = `${num1} ${operand} ${num2} = ${operation}`;
        this.addCalcs(string);

        this.setState({
          output: (operation + ''),
          num1: 0,
          num2: 0,
          operand: '',
        });

        break;
      default: {
        this.setState({
          output: ('' + output + action)
        });
      }
    }
  }

  addCalcs (val) {
    firebase.database().ref('show-me-the-calcs/calcs').push(val);
  }

  operandDisplay () {
    const { operand } = this.state;
    return (<div className="operand">{ operand }</div>);
  }

  showPrev () {
    const { calcs } = this.state;
    return <PrevCalcs prevCalcs={ calcs } />
  }

  render () {
    const { output, invalid, operand } = this.state;
    let display = output;

    if (output === '') {
      display = 0;
    }

    return (
      <div className='container'>
        <div className='calculator'>
          <div className='calc-display'>
            { invalid && <div className="not-allowed"></div>}
            { operand !== '' && this.operandDisplay() }
            { display }
          </div>
          <div className="button-grid">
          <div className="cluster-small">
              <button tabIndex='17' onClick={ () => this.buttonPress('clear') }>Clear</button>
              <button tabIndex='16' onClick={ () => this.buttonPress('del') }>Del</button>
              <button tabIndex='11' onClick={ () => this.buttonPress('/') }>/</button>
          </div>
          <div className="cluster">
              <button tabIndex='7' onClick={ () => this.buttonPress(7) }>7</button>
              <button tabIndex='8' onClick={ () => this.buttonPress(8) }>8</button>
              <button tabIndex='9' onClick={ () => this.buttonPress(9) }>9</button>
              <button tabIndex='12' onClick={ () => this.buttonPress('x') }>*</button>
            </div>
            <div className="cluster">
              <button tabIndex='4' onClick={ () => this.buttonPress(4) }>4</button>
              <button tabIndex='5' onClick={ () => this.buttonPress(5) }>5</button>
              <button tabIndex='6' onClick={ () => this.buttonPress(6) }>6</button>
              <button tabIndex='13' onClick={ () => this.buttonPress('-') }>-</button>
            </div>
            <div className="cluster">
              <button tabIndex='1' onClick={ () => this.buttonPress(1) }>1</button>
              <button tabIndex='2' onClick={ () => this.buttonPress(2) }>2</button>
              <button tabIndex='3' onClick={ () => this.buttonPress(3) }>3</button>
              <button tabIndex='14' onClick={ () => this.buttonPress('+') }>+</button>
            </div>
            <div className="cluster-small">
              <button tabIndex='15' onClick={ () => this.buttonPress('=') }>=</button>
              <button tabIndex='0' onClick={ () => this.buttonPress(0) }>0</button>
              <button tabIndex='10' onClick={ () => this.buttonPress('.') }>.</button>
            </div>
          </div>
        </div>
        <div className="log-calcs">
          { this.showPrev() }
        </div>
      </div>
    );
  }
}

export default Calc;
