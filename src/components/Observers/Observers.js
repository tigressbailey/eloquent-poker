import React from 'react';
import './Observers.css';

function Observers(props) {
  const { members } = props;
  const listItems = [];

  for (const key of Object.keys(members)) {
    const member = members[key];

    if (member.observer === '1') {
      listItems.push(
        <span className="label label-rounded label-secondary observer-label">
          {member.name}
        </span>,
      );
    }
  }

  return (
    <section className="observer-list">
      <h6 className="observer-title">👀Observers</h6>
      {listItems}
    </section>
  );
}

export default Observers;
