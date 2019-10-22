import React from 'react';
import Flip from 'react-reveal/Flip';
import './Members.css';

function Members(props) {
  const { members, check } = props;
  const listItems = [];

  for (const key of Object.keys(members)) {
    const voted = typeof members[key].points !== 'undefined';
    const badge = voted ? 'v' : '';
    const result = voted ? members[key].points : 'N/A';

    listItems.push(
      <ul className="menu member" key={members[key].id.toString()}>
        <li className="menu-item">
          <div className="tile tile-centered">
            <div className="tile-content badge" data-badge={badge}>
              {members[key].name}
            </div>
          </div>
        </li>
        <li className="divider"></li>
        <li className="menu-item points">
          <Flip left>
            {check ? result : <span className="emoji-poker">☕</span>}
          </Flip>
        </li>
      </ul>,
    );
  }

  return <div className="members">{listItems}</div>;
}

export default Members;
