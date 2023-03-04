import React, {useEffect, useState} from 'react';
import io from 'socket.io-client'
import {useLocation, useNavigate} from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

import s from './Chat.module.css'
import emoji from '../../assets/images/emoji.svg'
import {Messages} from "../Messages/Messages";

const socket = io.connect('http://localhost:4000');

export const Chat = () => {
  const navigate = useNavigate();
  const {search} = useLocation();
  const [params, setParams] = useState({room: '', user: ''});
  const [state, setState] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams)
    socket.emit('join', searchParams)
  }, [search]);

  useEffect(() => {
    socket.on('message', ({data}) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on('room', ({data: {users}}) => {
      setUsers(users.length);
    });
  }, []);

  const leftRoomHandle = () => {
    socket.emit('leftRoom', {params});

    navigate('/');
  }
  const handleChange = ({target: {value}}) => {
    setMessage(value)
  }

  const openEmojiHandle = () => {
    setOpen(!isOpen);
  };

  const onEmojiClick = ({emoji}) => setMessage(`${message} ${emoji}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit('sendMessage', {message, params});

    setMessage('');
  }

  return (
    <div className={s.wrap}>
      <div className={s.header}>
        <div className={s.title}>
          {params.room.toUpperCase()}
        </div>

        <div className={s.title}>
          {users === 1
            ? `${users} user in this room`
            : `${users} users in this room`
          }
        </div>

        <button
          className={s.left}
          onClick={leftRoomHandle}
        >
          Left the room
        </button>
      </div>

      <div className={s.messages}>
        <Messages messages={state} name={params.name}/>
      </div>

      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.input}>
          <input
            type="text"
            name='message'
            placeholder='Enter your message...'
            value={message}
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>

        <div className={s.emoji}>
          <img
            src={emoji}
            alt="Smiling emoji"
            onClick={openEmojiHandle}
          />

          {isOpen && (
            <div className={s.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick}/>
            </div>
          )}
        </div>

        <div className={s.button}>
          <input
            type="submit"
            value='Send a message'
            onSubmit={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};
