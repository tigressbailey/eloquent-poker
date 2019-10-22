import React from 'react';
import './Check.css';

function Check(props) {
  const { check, checkHandler, shuffleHandler } = props;
  return check ? (
    <button className="btn btn-check" onClick={shuffleHandler}>
      Shuffle
    </button>
  ) : (
    <button className="btn btn-check" onClick={() => checkHandler(!check)}>
      Check
    </button>
  );
}

export default Check;
