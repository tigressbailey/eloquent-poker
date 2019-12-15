import React from 'react';
import ReactCardFlip from 'react-card-flip';
import './Members.css';

function Members(props) {
  const { members, check } = props;
  const listItems = [];

  for (const key of Object.keys(members)) {
    const member = members[key];

    if (member.observer === '0') {
      const voted = typeof member.points !== 'undefined';
      const nameClasses = `label label-rounded ${
        voted ? 'label-success member-name' : 'member-name'
      }`;
      const result = voted ? member.points : 'N/A';

      listItems.push(
        <div className="member" key={member.id.toString()}>
          <span className={nameClasses}>{member.name}</span>
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
  }

  return <div className="members">{listItems}</div>;
}

export default Members;
