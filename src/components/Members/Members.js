import React from 'react';
import Flip from 'react-reveal/Flip';
import Tada from 'react-reveal/Tada';
import Zoom from 'react-reveal/Zoom';
import './Members.css';

function Members(props) {
  const { members, check } = props;
  const listItems = [];

  for (const key of Object.keys(members)) {
    const voted = typeof members[key].points !== 'undefined';
    const nameClasses = `label ${
      voted
        ? 'label label-success member-name'
        : 'label label-primary member-name'
    }`;
    const result = voted ? members[key].points : 'N/A';

    listItems.push(
      <Flip left key={members[key].id.toString()}>
        <div className="member">
          <span className={nameClasses}>{members[key].name}</span>
          <div className="card points">
            {check ? (
              <Tada>{result}</Tada>
            ) : (
              <Zoom>
                <span className="emoji-poker">☕</span>
              </Zoom>
            )}
          </div>
        </div>
      </Flip>,
    );
  }

  return <div className="members">{listItems}</div>;
}

export default Members;
