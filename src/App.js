import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import {io} from 'socket.io-client';



function App() {


  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
