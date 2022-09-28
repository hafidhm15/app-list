import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';
const baseUrl = 'https://my-udemy-api.herokuapp.com/api/v1';

const Auth = () => {
  const { isAuthenticated, loginSuccess, loginFailed } =
    useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const [error, setError] = useState('');
  const [isError, setIserror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLogin = () => setLogin(!login);
  const userLogin = async () => {
    setIsLoading(true);
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post(`${baseUrl}/user/signin`, user);
      localStorage.setItem('token', response.data.token);
      // console.log(res);
      setEmail('');
      setPassword('');
      loginSuccess();
      setIsLoading(false);
    } catch (err) {
      setIserror(true);
      setError(err.response.data.errors);
      setIsLoading(false);
      setEmail('');
      setPassword('');
      setTimeout(() => {
        setIserror(false);
        setError('');
        loginFailed();
      }, 2000);
    }
  };
  const userRegister = async () => {
    setIsLoading(true);
    const user = {
      email,
      password,
      name,
    };
    try {
      const response = await axios.post(`${baseUrl}/user/signup`, user);
      localStorage.setItem('token', response.data.token);
      // console.log(res);
      setEmail('');
      setName('');
      setPassword('');
      loginSuccess();
      setIsLoading(false);
    } catch (err) {
      setIserror(true);
      setError(err.response.data.errors);
      setIsLoading(false);
      setEmail('');
      setName('');
      setPassword('');
      setTimeout(() => {
        setIserror(false);
        setError('');
        loginFailed();
      }, 2000);
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/task" />;
  }
  return (
    <>
      <div style={box}>
        <h3 style={head}>{login ? 'Login Admin' : 'register'}</h3>
        <div>
          {!login && (
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
        <div style={btn}>
          {isError && (
            <div>
              {error &&
                error.map((item, index) => (
                  <p key={index} style={{ color: 'red', margin: '0.4rem 0' }}>
                    {item.msg}
                  </p>
                ))}
            </div>
          )}
          <Button
            variant="primary"
            type="submit"
            load={isLoading}
            text={login ? 'login' : 'register'}
            action={login ? userLogin : userRegister}
          />
        </div>
        {login ? (
          <div style={paragraph}>
            <p>
              Sudah punya akun?
              <span onClick={isLogin} style={textBtn}>
                register
              </span>
            </p>
          </div>
        ) : (
          <div style={paragraph}>
            <p>
              Belum punya akun?
              <span style={textBtn} onClick={isLogin}>
                login
              </span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Auth;

const textBtn = {
  color: '#17A2B8',
  FontSize: '15px',
  MarginLeft: '5px',
  cursor: 'pointer',
};
const head = {
  textAlign: 'center',
  margin: '1rem  0',
  color: 'blue',
};

const btn = {
  textAlign: 'center',
  marginTop: '0.5rem',
};

const paragraph = {
  textAlign: 'center',
  marginTop: '0.5rem',
  FontSize: '14px',
};

const box = {
  background: '#fff',
  width: '35%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '0.9rem',
  backgroundColor: '#DBDFFD',
  borderRadius: '0.5rem',
  border: '2px solid #17A2B8',
};
