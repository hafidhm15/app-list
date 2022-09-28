import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';
import FormInput from '../components/FormInput';
import TodoItem from '../components/TodoItem';
import EditModal from '../components/EditModal';
import Button from '../components/Button';
import logo from '../logo.svg';
import '../App.css';
import SkeletonLoading from '../components/SkeletonLoading';
const baseUrl = 'https://my-udemy-api.herokuapp.com/api/v1';

const Task = () => {
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsedit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [editdata, setEditdata] = useState({
    id: '',
    title: '',
  });

  const update = () => {
    const { id, title } = this.state.editData;
    const newData = { id, title };
    const newTodos = this.state.todos;
    newTodos.splice(id - 1, 1, newData);
    setTodos(newTodos);
    setIsedit(false);
    setEditdata({ id: '', title: '' });
  };

  const setTitle = (e) => {
    setEditdata({
      ...editdata,
      title: e.target.value,
    });
  };

  const openModal = (id, data) => {
    setIsedit(true);
    setEditdata({ id, title: data.title });
  };

  const deleteModal = (id, data) => {
    setIsDelete(true);
    setEditdata({ id, title: data.title });
  };

  const closeModal = () => {
    setIsedit(false);
  };

  //delete task
  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    await axios.get(`${baseUrl}/todo/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    setTodos(todos.filter((item) => item._id !== id));
  };
  // deleteTask = (id, data) => {
  //   this.setState({
  //     isDelete: true,
  //     deleteData: {
  //       id,
  //       title: data,
  //     },
  //     todos: this.state.todos.filter((item) => item.id !== id),
  //   });
  // };

  const addTask = (data) => {
    setTodos([...todos, data]);
  };

  const getData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseUrl}/todo`, {
      headers: {
        Authorization: token,
      },
    });
    setTodos(res.data.todos);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="app">
      <div className="logo">
        <img src={logo} alt="" />
        <h3>Task List</h3>
        <Button text="logout" variant="primary" action={logout} />
      </div>
      <div className="list">
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
            del={deleteTask}
            open={openModal}
            loading={loading}
          />
        ))}
      </div>
      <div className="input-form">
        <FormInput add={addTask} />
      </div>
      <EditModal
        edit={isEdit}
        close={closeModal}
        change={setTitle}
        data={editdata}
        update={update}
      />
      <deleteModal
        delet={isDelete}
        dlt={deleteTask}
        close={closeModal}
        data={deleteData}
      />
    </div>
  );
};

export default Task;
