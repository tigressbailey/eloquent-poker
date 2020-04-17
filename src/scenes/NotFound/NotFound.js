import React from 'react';
import './NotFound.css';

export function NotFound() {
  return (
    <div className="empty">
      <div className="empty-icon">
        <i className="icon icon-people"></i>
      </div>
      <p className="empty-title h5">
        We are unable to find the page you are looking for.
      </p>
      <p className="empty-subtitle">
        The URL should be like https://eloquentpoker.com/?room=platform
      </p>
    </div>
  );
}

export default NotFound;
