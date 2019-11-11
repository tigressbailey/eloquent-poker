import React from 'react';
import './Bar.css';
import Bounce from 'react-reveal/Bounce';

function Bar(props) {
  const { members } = props;
  const results = {
    '0': 0,
    '1/2': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '5': 0,
    '8': 0,
    '13': 0,
    '20': 0,
    '40': 0,
    '?': 0,
  };
  const memberKeys = Object.keys(members);
  const memberLength = memberKeys.length;
  const barItems = [];

  for (const key of memberKeys) {
    if (typeof members[key].points !== 'undefined') {
      const points = members[key].points;
      results[`${points}`] =
        results[`${points}`] + ((1 / memberLength) * 100).toFixed(0) * 1;
    }
  }

  for (const key of Object.keys(results)) {
    if (results[key] !== 0) {
      const percent = `${results[key]}%`;
      barItems.push(
        <div
          key={key}
          className="bar-item tooltip tooltip-bottom"
          data-tooltip={percent}
          role="progressbar"
          style={{ width: percent }}
        >
          {key}
        </div>,
      );
    }
  }

  return (
    <Bounce right>
      <div className="bar">{barItems}</div>
    </Bounce>
  );
}

export default Bar;
