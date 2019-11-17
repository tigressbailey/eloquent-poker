import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { replace } from 'connected-react-router';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import Message from '../../components/Message';
import Check from '../../components/Check';
import Members from '../../components/Members';
import StoryPoint from '../../components/StoryPoint';
import Bar from '../../components/Bar';
import { storyPoints } from '../../utils/voteTypes';
import { initiateTracker, trackPageView } from '../../utils/pageView';

import './Main.css';
import { classNames } from 'classnames';
import Modal from '../../components/Modal/Modal';
import validParam from '../../utils/validParam';

const roomExpression = /^[A-Za-z0-9_][A-Za-z0-9][A-Za-z0-9_]{1,20}$/;
const nameExpression = /^[A-Za-z0-9 _][A-Za-z0-9][A-Za-z0-9 _]{1,20}$/;

let io = socketIOClient(process.env.REACT_APP_IO_URL, {
  autoConnect: false,
  reconnection: true,
  timeout: 10000, //before connect_error and connect_timeout are emitted.
  transports: ['websocket'],
  rejectUnauthorized: false,
  secure: true,
});
let enableIO = false;
let roomName = 'not set';
let memberName = 'Anonym';

io.on('connect', () => {
  io.emit('attend', roomName, memberName);
});

function Main(props) {
  const { search, join } = props;

  const [msg, setMsg] = useState(null);
  const [check, setCheck] = useState(false);
  const [members, setMembers] = useState([]);
  const [activeSp, setActiveSp] = useState('');

  function joinRoom(room, name) {
    join(room, name);
  }

  function voteHandler(points) {
    setActiveSp(points);
    io.emit('vote', points);
  }

  function checkHandler(check) {
    io.emit('check', check);
  }

  function shuffleHandler() {
    setActiveSp('');
    io.emit('shuffle');
  }
  io.on('grooming', ({ check, members }) => {
    setCheck(check);
    setMembers(members);
  });

  io.on('reset', ({ check, members, activeSp }) => {
    setCheck(check);
    setMembers(members);
    setActiveSp(activeSp);
  });

  useEffect(() => {
    initiateTracker();
    trackPageView(search);

    if (!enableIO) {
      return;
    }

    io.connect();

    return () => {
      io.removeAllListeners();
    };
  }, [search]);

  const { room, name } = qs.parse(search, {
    ignoreQueryPrefix: true,
    parameterLimit: 2,
  });

  if (validParam(room, roomExpression) && validParam(name, nameExpression)) {
    enableIO = true;
    roomName = room.toLowerCase();
    memberName = name;
  } else {
    enableIO = false;
  }

  const roomTitle = roomName[0].toUpperCase() + roomName.slice(1);

  const pointsItems = storyPoints.map(storyPoint => (
    <StoryPoint
      key={storyPoint.id}
      sp={storyPoint.text}
      defaultClasses={storyPoint.defaultClasses}
      activeSp={activeSp}
      voteHandler={voteHandler}
    />
  ));

  return (
    <div className="columns">
      <Modal enableIO={enableIO} room={room} name={name} joinRoom={joinRoom} />
      <div className="column col-2 sidebar-poker">
        <section>
          <a
            className="github-link"
            rel="noopener noreferrer"
            href="https://github.com/tigressbailey/eloquent-poker"
            target="_blank"
          >
            <h1 className="sitename">Eloquent Poker</h1>
          </a>
        </section>
        <Check
          check={check}
          checkHandler={checkHandler}
          shuffleHandler={shuffleHandler}
        />
        <section>
          <blockquote className="quote-poker">
            <cite className="cite-poker">🎪{roomTitle}</cite>
            <p>Hi, {memberName}.</p>
          </blockquote>
          {pointsItems}
        </section>

        {/* <section>
              <div className="panel">
                <div className="panel-header">
                  <div className="panel-title h6">Activity</div>
                </div>
                <div className="panel-body">
                  <div className="tile">
                    <div className="tile-content">
                      <p className="tile-subtitle">
                        <Message message={msg} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section> */}
      </div>
      <div className="column">
        {check && <Bar members={members} />}
        <Members members={members} check={check} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  search: state.router.location.search,
});

const mapDispatchToProps = dispatch => ({
  join: (room, name) => dispatch(replace(`/?room=${room}&name=${name}`)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
