import React, {useState} from 'react';
import s from './Main.module.css';
import {Link} from "react-router-dom";

const FIELDS = {
  NAME: 'name',
  ROOM: 'room',
};

export const Main = () => {
  const {NAME, ROOM} = FIELDS;

  const [values, setValues] = useState({
    [NAME]: '',
    [ROOM]: '',
  });

  const handleChange = ({target: {value, name}}) => {
    setValues({...values, [name]: value});
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some(value => !value);

    isDisabled && e.preventDefault();
  };

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        <h1 className={s.heading}>Join</h1>

        <form className={s.form}>
          <div className={s.group}>
            <input
              type="text"
              name='name'
              value={values[NAME]}
              placeholder='Name'
              className={s.input}
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>

          <div className={s.group}>
            <input
              type="text"
              name='room'
              value={values[ROOM]}
              placeholder='Room'
              className={s.input}
              onChange={handleChange}
              autoComplete='off'
              required
            />
          </div>

          <Link
            className={s.group}
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
            onClick={handleClick}
          >
            <button
              type='submit'
              className={s.button}
            >
              Sign in
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
