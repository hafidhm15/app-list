import React from "react";
import FormInput from "../components/FormInput";
import TodoItem from "../components/TodoItem";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import logo from "../logo.svg";
import "../App.css";

class Home extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        title: "reading a book",
      },
      {
        id: 2,
        title: "work",
      },
    ],
    isEdit: false,
    editData: {
      id: "",
      title: "",
    },
    isDelete: false,
    deleteData: {
      id: "",
      title: "",
    },
  };

  update = () => {
    const { id, title } = this.state.editData;
    const newData = { id, title };
    const newTodos = this.state.todos;
    newTodos.splice(id - 1, 1, newData);
    this.setState({
      todos: newTodos,
      isEdit: false,
      editData: {
        id: "",
        title: "",
      },
    });
  };

  setTitle = (e) => {
    this.setState({
      editData: {
        ...this.state.editData,
        title: e.target.value,
      },
    });
  };

  openModal = (id, data) => {
    this.setState({
      isEdit: true,
      editData: {
        id,
        title: data,
      },
    });
  };

  deleteModal = (id, data) => {
    this.setState({
      isDelete: true,
      deleteData: {
        id,
        title: data,
      },
    });
  };

  closeModal = () => {
    this.setState({
      isEdit: false,
      isDelete: false,
    });
  };

  //delete task
  deleteTask = () => {
    const { id } = this.state.deleteData;
    const newTodos = this.state.todos;
    newTodos.splice(id - 1, 1);
    this.setState({
      todos: this.state.todos.filter((item) => item.id !== id),
      isDelete: false,
      deleteData: {
        id: "",
        title: "",
      },
    });
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

  addTask = (data) => {
    const id = this.state.todos.length;
    const newData = {
      id: id + 1,
      title: data,
    };
    this.setState({
      todos: [...this.state.todos, newData],
    });
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="app">
        <div className="logo">
          <img src={logo} alt="" />
          <h3>Task List</h3>
        </div>
        <div className="list">
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              todo={item}
              del={this.deleteModal}
              open={this.openModal}
            />
          ))}
        </div>
        <div className="input-form">
          <FormInput add={this.addTask} />
        </div>
        <EditModal
          edit={this.state.isEdit}
          close={this.closeModal}
          change={this.setTitle}
          data={this.state.editData}
          update={this.update}
        />
        <DeleteModal
          delet={this.state.isDelete}
          dlt={this.deleteTask}
          close={this.closeModal}
          data={this.state.deleteData}
        />
      </div>
    );
  }
}

export default Home;
