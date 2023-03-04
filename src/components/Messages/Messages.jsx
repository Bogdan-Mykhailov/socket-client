import React from 'react';
import s from './Messages.module.css'

export const Messages = ({messages, name}) => {
  return (
    <div className={s.messages}>
      {messages.map(({ user, message }, index) => {

        const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? s.me : s.user;

        return (
          <div
            key={index}
            className={`${s.message} ${className}`}
          >
            <span className={s.user}>{user.name}</span>
            <div className={s.text}>{message}</div>
          </div>
        );
      })}
    </div>
  );
};
