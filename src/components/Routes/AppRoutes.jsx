import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Main} from "../Main/Main";
import {Chat} from "../Chat/Chat";

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Main/>}/>
    <Route path='/chat' element={<Chat/>}/>
  </Routes>
);
