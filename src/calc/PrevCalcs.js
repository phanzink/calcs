import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PrevCalcs extends PureComponent {

  static propTypes = {
    prevCalcs: PropTypes.array,
  }

  static defaultProps = {
    prevCalcs: [],
  }

  render () {
    const { prevCalcs } = this.props;

    return (
      <div className="prev-calcs">
        <div className="red-lines"></div>
        <ul>
          <li className="header">Husky notes</li>
          { prevCalcs.map((calc,k) => {
            return (<li key={ k }>{ calc }</li>)
          }) }
        </ul>
      </div>
    );
  }
}

export default PrevCalcs;
