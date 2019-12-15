import React, { useState } from 'react';
import './Modal.css';
import validParam from '../../utils/validParam';

const defaultClasses = 'modal';

const roomExpression = /^[A-Za-z0-9_][A-Za-z0-9][A-Za-z0-9_]{1,20}$/;
const nameExpression = /^[A-Za-z0-9 _][A-Za-z0-9][A-Za-z0-9 _]{1,20}$/;
const typeExpression = /^(sp|ts|sq)$/;
const observerExpression = /^(0|1)$/;
function Modal(props) {
  const { enableIO, room, name, type, observer, joinRoom } = props;
  const [roomValue, setRoomValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [typeValue, setTypeValue] = useState('sp');
  const [observerValue, setObserverValue] = useState('0');
  const [validInputs, setValidInputs] = useState(true);

  const formClasses = validInputs ? 'form-group' : 'form-group has-error';

  const validConfig = validParam(room, roomExpression);
  const validType = validParam(type, typeExpression);

  const modalClasses = enableIO ? defaultClasses : `${defaultClasses} active`;

  const generalInfo = validConfig
    ? {
        title: 'Join a room',
        btnText: 'Join',
      }
    : {
        title: 'Create a room',
        btnText: 'Create',
      };

  function join() {
    let validInputs = true;

    if (validConfig) {
      validInputs = validParam(nameValue, nameExpression);

      setValidInputs(validInputs);
      if (validInputs) {
        joinRoom(room, type, nameValue, observerValue);
      }
    } else {
      validInputs =
        validParam(roomValue, roomExpression) &&
        validParam(nameValue, nameExpression);

      setValidInputs(validInputs);

      if (validInputs) {
        joinRoom(roomValue, typeValue, nameValue, observerValue);
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
          <div className="modal-title h4 modal-poker">{generalInfo.title}</div>
        </div>
        <div className="modal-body">
          <div className="content">
            <div className={formClasses}>
              <p className="form-input-hint">Invalid Room/Name</p>
              <section className="section-modal">
                <label className="form-label" htmlFor="room-input">
                  🎪Room
                </label>
                {validConfig ? (
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
              {!validType && (
                <section className="section-modal">
                  <label className="form-label">🎴Card Set</label>
                  <label className="form-radio form-inline">
                    <input
                      type="radio"
                      name="votetype"
                      value="sp"
                      defaultChecked
                      onChange={e => setTypeValue(e.target.value)}
                    />
                    <i className="form-icon"></i> Modified Fibonacci
                  </label>
                  <label className="form-radio form-inline">
                    <input
                      type="radio"
                      name="votetype"
                      value="ts"
                      onChange={e => setTypeValue(e.target.value)}
                    />
                    <i className="form-icon"></i> T-Shirt
                  </label>
                  <label className="form-radio form-inline">
                    <input
                      type="radio"
                      name="votetype"
                      value="sq"
                      onChange={e => setTypeValue(e.target.value)}
                    />
                    <i className="form-icon"></i> Sequence
                  </label>
                </section>
              )}
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
                  placeholder="Tom"
                />
              </section>
              <section className="section-modal">
                <label className="form-switch">
                  <input
                    type="checkbox"
                    onChange={e => setObserverValue(e.target.checked + 0 + '')}
                  />
                  <i className="form-icon"></i> Observer
                </label>
              </section>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary btn-modal btn-lg" onClick={join}>
            {generalInfo.btnText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
