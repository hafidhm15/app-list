import React from 'react';
import axios from 'axios';
import Button from './Button';
import '../styles/FormInput.css';
const baseUrl = 'https://my-udemy-api.herokuapp.com/api/v1/todo';

class FormInput extends React.Component {
  state = {
    text: '',
  };
  change = (e) => {
    this.setState({ text: e.target.value });
  };

  submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (this.state.text !== '') {
      const newTodo = {
        title: this.state.text,
      };
      const res = await axios.post(`${baseUrl}`, newTodo, {
        headers: {
          Authorization: token,
        },
      });
      //   console.log(res);
      this.props.add(res.data.todo);
    }
    this.setState({
      text: '',
    });
  };
  render() {
    return (
      <form style={inputForm} onSubmit={this.submit}>
        <input
          type="text"
          onChange={this.change}
          value={this.state.text}
          style={input}
          placeholder="add task"
        />
        <Button text="add" variant="primary" action={this.submit} />
      </form>
    );
  }
}

export default FormInput;

const inputForm = {
  background: '#fff',
  color: 'fff',
  display: 'flex',
  alignItems: 'center',
  height: '3rem',
  padding: '0 1rem',
  justifyContent: 'space-between',
  margin: '0.5rem 0',
};

const input = {
  width: '70%',
  border: 'none',
};
