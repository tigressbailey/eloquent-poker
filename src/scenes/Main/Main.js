import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Redirect } from 'react-router';
import ReactGA from 'react-ga';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import Message from '../../components/Message';
import Check from '../../components/Check';
import Members from '../../components/Members';
import StoryPoint from '../../components/StoryPoint';
import Bar from '../../components/Bar';

import './Main.css';
import { classNames } from 'classnames';

const roomExpression = /^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_]*$/;
const nameExpression = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

let io = socketIOClient(process.env.REACT_APP_IO_URL, {
  autoConnect: false,
  reconnection: true,
  rejectUnauthorized: false,
  secure: true,
});
let enableIO = false;
let roomName, memberName;

function validParam(param, expression) {
  return typeof param !== 'undefined' && expression.test(param);
}

io.on('connect', () => {
  io.emit('attend', roomName, memberName);
});

function Main(props) {
  const { search } = props;

  const [msg, setMsg] = useState(null);
  const [check, setCheck] = useState(false);
  const [members, setMembers] = useState([]);
  const [activeSp, setActiveSp] = useState(undefined);

  function voteHandler(points) {
    setActiveSp(points);
    io.emit('vote', points);
  }

  function checkHandler(check) {
    io.emit('check', check);
  }

  function shuffleHandler() {
    setActiveSp(undefined);
    io.emit('shuffle');
  }

  function trackPageView(search) {
    ReactGA.pageview(search);
  }

  io.on('grooming', ({ check, members }) => {
    setCheck(check);
    setMembers(members);
  });

  io.on('message', msg => {
    // setMsg(msg);
  });

  // io.on('disconnect', () => {
  // io.removeAllListeners();
  // setMsg('You are offline now');
  // });

  useEffect(() => {
    ReactGA.initialize('UA-128279645-2');
    trackPageView(search);

    if (!enableIO) {
      return;
    }

    io.connect();

    return () => {
      io.removeAllListeners();
    };
  }, [search]);

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
                <cite className="cite-poker">🎪 {roomTitle}</cite>
                <p>Hi, {name}.</p>
              </blockquote>
              <StoryPoint
                sp="0"
                defaultClasses="btn btn-action btn-primary btn-sm s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
              <StoryPoint
                sp="1/2"
                defaultClasses="btn btn-action btn-primary btn-sm s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
              <StoryPoint
                sp="1"
                defaultClasses="btn btn-action btn-primary btn-sm s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
              <StoryPoint
                sp="2"
                defaultClasses="btn btn-action btn-primary btn-sm s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
              <StoryPoint
                sp="3"
                defaultClasses="btn btn-action btn-primary s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
              <StoryPoint
                sp="5"
                defaultClasses="btn btn-action btn-primary s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
              <StoryPoint
                sp="8"
                defaultClasses="btn btn-action btn-primary s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
              <StoryPoint
                sp="13"
                defaultClasses="btn btn-action btn-primary btn-lg s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
              <StoryPoint
                sp="20"
                defaultClasses="btn btn-action btn-primary btn-lg s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
              <StoryPoint
                sp="40"
                defaultClasses="btn btn-action btn-primary btn-lg s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
              <StoryPoint
                sp="?"
                defaultClasses="btn btn-action btn-primary btn-lg s-circle btn-poker"
                activeSp={activeSp}
                check={check}
                voteHandler={voteHandler}
              />
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
