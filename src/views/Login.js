import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';
const baseUrl = 'https://my-udemy-api.herokuapp.com/api/v1';

const Auth = () => {
  const history = useNavigate();
  const [login, setLogin] = useState(true);


  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLogin = () => setLogin(!login);
  const userLogin = async () => {
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post(`${baseUrl}/user/signin`, user);
      localStorage.setItem('token', response.data.token);
      setName('');
      setEmail('');
      setPassword('');
      setIsLoading(false);
      history.push('/task');
    } catch (error) {
        console.log(error);
        setIsLoading(false);
    }
  };
  const userRegister = () => console.log('ok');
  return (
    <div style={box}>
      <h3 style={head}>{isLogin ? 'Login' : 'Daftar'}</h3>
      <div>
        {!isLogin && (
          <Input
            placeholder="name"
            value={name}
            type="text"
            change={(e) => setName(e.target.value)}
          />
        )}
        <Input
          placeholder="email"
          value={email}
          type="email"
          change={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          value={password}
          type="password"
          change={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '0.8rem' }}>
        <div>
         
        </div>
        <Button
          variant="primary"
          text={isLogin ? 'Login' : 'Daftar'}
          load={isLoading}
        />
      </div>
      {isLogin ? (
        <div style={para}>
          <p>Belum punya akun? Silahkan</p>
          <span style={isReg}>
            Daftar
          </span>
        </div>
      ) : (
        <div style={para}>
          <p>Sudah punya akun? Silahkan </p>
        
        </div>
      )}
    </div>
  );
};

export default Auth;

const isReg = {
  fontSize: '15px',
  color: '#57ae4f',
  cursor: 'pointer',
};

const para = {
  textAlign: 'center',
  marginTop: '1rem',
  fontSize: '14px',
};

const head = {
  textAlign: 'center',
  margin: '1rem  0',
};

const box = {
  background: '#fff',
  width: '25%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  paddingBottom: '0.7rem',
};
