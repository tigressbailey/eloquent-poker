import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Redirect } from 'react-router';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import Message from '../../components/Message';
import Check from '../../components/Check';
import Members from '../../components/Members';

import './Main.css';
import { classNames } from 'classnames';

const roomExpression = /^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_]*$/;
const nameExpression = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

let io = socketIOClient(process.env.REACT_APP_IO_URL, {
  autoConnect: false,
  reconnection: false,
  rejectUnauthorized: false,
  secure: true,
});
let enableIO = false;

function validParam(param, expression) {
  return typeof param !== 'undefined' && expression.test(param);
}

function Main(props) {
  const { search } = props;
  let roomName, memberName;

  const [msg, setMsg] = useState(null);
  const [check, setCheck] = useState(false);
  const [members, setMembers] = useState([]);

  function voteHandler(points) {
    io.emit('vote', points);
  }

  function checkHandler(check) {
    io.emit('check', check);
  }

  function shuffleHandler() {
    io.emit('shuffle');
  }

  io.once('connect', () => {
    io.emit('attend', roomName, memberName);
  });

  io.on('grooming', ({ check, members }) => {
    setCheck(check);
    setMembers(members);
  });

  io.on('message', msg => {
    // setMsg(msg);
  });

  io.on('disconnect', () => {
    io.removeAllListeners();
    // setMsg('You are offline now');
  });

  useEffect(() => {
    if (!enableIO) {
      return;
    }

    io.connect();

    return () => {
      io.removeAllListeners();
    };
  }, []);

  try {
    const { room, name } = qs.parse(search, {
      ignoreQueryPrefix: true,
      parameterLimit: 2,
    });

    if (validParam(room, roomExpression) && validParam(name, nameExpression)) {
      enableIO = true;
      roomName = room.toLowerCase();
      memberName = name;

      const roomTitle = room[0].toUpperCase() + room.slice(1);

      return (
        <div className="columns">
          <div className="column col-2 sidebar-poker">
            <section>
              <h1 className="sitename">Eloquent Poker</h1>
            </section>
            <Check
              check={check}
              checkHandler={checkHandler}
              shuffleHandler={shuffleHandler}
            />
            <section>
              <blockquote className="quote-poker">
                <cite className="cite-poker">🎪 {roomTitle}</cite>
                <p>Hi, {name}.</p>
              </blockquote>
              <button
                className="btn btn-action btn-primary btn-sm s-circle btn-poker"
                onClick={() => voteHandler('0')}
              >
                0
              </button>
              <button
                className="btn btn-action btn-primary btn-sm s-circle btn-poker"
                onClick={() => voteHandler('1/2')}
              >
                1/2
              </button>
              <button
                className="btn btn-action btn-primary btn-sm s-circle btn-poker"
                onClick={() => voteHandler('1')}
              >
                1
              </button>
              <button
                className="btn btn-action btn-primary btn-sm s-circle btn-poker"
                onClick={() => voteHandler('2')}
              >
                2
              </button>
              <button
                className="btn btn-action btn-primary s-circle btn-poker"
                onClick={() => voteHandler('3')}
              >
                3
              </button>
              <button
                className="btn btn-action btn-primary s-circle btn-poker"
                onClick={() => voteHandler('5')}
              >
                5
              </button>
              <button
                className="btn btn-action btn-primary s-circle btn-poker"
                onClick={() => voteHandler('8')}
              >
                8
              </button>
              <button
                className="btn btn-action btn-primary btn-lg s-circle btn-poker"
                onClick={() => voteHandler('13')}
              >
                13
              </button>
              <button
                className="btn btn-action btn-primary btn-lg s-circle btn-poker"
                onClick={() => voteHandler('20')}
              >
                20
              </button>
              <button
                className="btn btn-action btn-primary btn-lg s-circle btn-poker"
                onClick={() => voteHandler('40')}
              >
                40
              </button>
              <button
                className="btn btn-action btn-primary btn-lg s-circle btn-poker"
                onClick={() => voteHandler('?')}
              >
                ?
              </button>
            </section>
          </div>
          <div className="column">
            <Members members={members} check={check} />
            {/* <section>
              <Message message={msg} />
            </section> */}
          </div>
        </div>
      );
    }
    throw Error('Invalid params');
  } catch (error) {
    enableIO = false;
    return <Redirect to="/NotFound" />;
  }
}

export const mapStateToProps = state => ({
  search: state.router.location.search,
});

export default connect(mapStateToProps)(Main);
