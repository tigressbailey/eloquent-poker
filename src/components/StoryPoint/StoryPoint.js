import React from 'react';
import './StoryPoint.css';

function StoryPoint(props) {
  const { sp, voteHandler, activeSp, defaultClasses } = props;
  const spClasses =
    sp !== activeSp ? defaultClasses : `${defaultClasses} btn-poker--active`;

  function activeHandler() {
    voteHandler(sp);
  }

  return (
    <button className={spClasses} onClick={activeHandler}>
      {sp}
    </button>
  );
}

export default StoryPoint;
