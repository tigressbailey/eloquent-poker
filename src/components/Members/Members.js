import React from 'react';
import ReactCardFlip from 'react-card-flip';
import './Members.css';

function Members(props) {
  const { members, check } = props;
  const listItems = [];

  for (const key of Object.keys(members)) {
    const voted = typeof members[key].points !== 'undefined';
    const nameClasses = `label label-rounded ${
      voted ? 'label-success member-name' : 'member-name'
    }`;
    const result = voted ? members[key].points : 'N/A';

    listItems.push(
      <div className="member" key={members[key].id.toString()}>
        <span className={nameClasses}>{members[key].name}</span>
        <ReactCardFlip isFlipped={check}>
          <div className="poker-chip front" key="front">
            <span className="poker-chip__points">☕</span>
          </div>
          <div className="poker-chip back" key="back">
            <span className="poker-chip__points">{result}</span>
          </div>
        </ReactCardFlip>
      </div>,
    );
  }

  return <div className="members">{listItems}</div>;
}

export default Members;
