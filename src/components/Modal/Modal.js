import React, { useState } from 'react';
import './Modal.css';
import validParam from '../../utils/validParam';

const defaultClasses = 'modal';

const roomExpression = /^[A-Za-z0-9_][A-Za-z0-9][A-Za-z0-9_]{1,20}$/;
const nameExpression = /^[A-Za-z0-9 _][A-Za-z0-9][A-Za-z0-9 _]{1,20}$/;
function Modal(props) {
  const { enableIO, room, name, joinRoom } = props;
  const [roomValue, setRoomValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [validInputs, setValidInputs] = useState(true);

  const formClasses = validInputs ? 'form-group' : 'form-group has-error';
  const modalClasses = enableIO ? 'modal' : `${defaultClasses} active`;
  const validRoom = validParam(room, roomExpression);

  function join() {
    let validInputs = true;

    if (validRoom) {
      validInputs = validParam(nameValue, nameExpression);
      setValidInputs(validInputs);
      if (validInputs) {
        joinRoom(room, nameValue);
      }
    } else {
      validInputs =
        validParam(roomValue, roomExpression) &&
        validParam(nameValue, nameExpression);

      setValidInputs(validInputs);
      if (validInputs) {
        joinRoom(roomValue, nameValue);
      }
    }
  }

  function keyPressHandler(e) {
    if (event.key === 'Enter') {
      join();
    }
  }

  return (
    <div className={modalClasses} id="eloquent-poker-modal">
      <div className="modal-overlay"></div>
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title h4 modal-poker">Join a Room</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <div className={formClasses}>
              <p className="form-input-hint">Invalid room/name</p>
              <section className="section-modal">
                <label className="form-label" htmlFor="room-input">
                  🎪Room
                </label>
                {validRoom ? (
                  <span className="label label-secondary label-rounded label-modal">
                    {room[0].toUpperCase() + room.slice(1)}
                  </span>
                ) : (
                  <input
                    className="form-input"
                    type="text"
                    id="room-input"
                    value={roomValue}
                    onChange={e => setRoomValue(e.target.value)}
                    placeholder="Slytherin"
                  />
                )}
              </section>
              <section className="section-modal">
                <label className="form-label" htmlFor="name-input">
                  ☕Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="name-input"
                  value={nameValue}
                  onChange={e => setNameValue(e.target.value)}
                  onKeyPress={keyPressHandler}
                  placeholder="Dostoyevsky"
                />
              </section>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary btn-modal btn-lg" onClick={join}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
