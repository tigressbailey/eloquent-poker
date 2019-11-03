import React from 'react';
import Flip from 'react-reveal/Flip';
import './Members.css';

function Members(props) {
  const { members, check } = props;
  const listItems = [];

  for (const key of Object.keys(members)) {
    const voted = typeof members[key].points !== 'undefined';
    const nameClasses = `label label-rounded ${
      voted ? 'label-success member-name' : 'label-primary member-name'
    }`;
    const result = voted ? members[key].points : 'N/A';

    listItems.push(
      <div className="member" key={members[key].id.toString()}>
        <span className={nameClasses}>{members[key].name}</span>
        {check ? (
          <Flip left>
            <div className="poker-chip">
              <span className="poker-chip__points">{result}</span>
            </div>
          </Flip>
        ) : (
          <div className="poker-chip">
            <span className="poker-chip__points">☕</span>
          </div>
        )}
      </div>,
    );
  }

  return <div className="members">{listItems}</div>;
}

export default Members;
