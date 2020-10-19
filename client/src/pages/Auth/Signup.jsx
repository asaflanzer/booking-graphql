import React from 'react';
import loginImg from '../../assets/login.svg';
// styles
import * as S from './styles';

const Signup = (props) => {
  const { ref } = props;
  return (
    <S.Container ref={ref}>
      <div className='content'>
        <div className='image'>
          <img src={loginImg} alt='' />
        </div>
        <div className='form'>
          <div className='form-group'>
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='First Name'
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Last Name'
            />
          </div>
          <div className='form-group'>
            <input type='email' id='email' name='email' placeholder='Email' />
          </div>
          <div className='form-group'>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
            />
          </div>
          <div className='footer'>
            <button type='button' className='btn'>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </S.Container>
  );
};

export default Signup;
