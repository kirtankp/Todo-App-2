import React from 'react';
import Signup from './components/Signup';
import './App.css'

const App = () => {
  return (
    <div className='container'>
      <div className='form'>
        <h2 className='form-heading'>Sign Up</h2>
        <Signup />
      </div>
    </div>
  );
};

export default App;
