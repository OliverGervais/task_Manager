import React from 'react';
import './styles/main.css';
import axios from 'axios';
import AddTask from "./components/addTask"
const moment = require('moment');

class App extends React.Component {
  state = {
    _id: "" ,
    text:"",
    date: "" ,
    reminder: false,
    tasks:[]
  };

  componentDidMount = () => {
    this.getTask();
  };

  getTask = () => {
    axios.get("/api")
      .then((response) =>{
        const data = response.data;
        this.setState({ tasks: data })
        console.log("data has been received");
      })
      .catch(() =>{
        alert("Could not get taks")
      });
  }

  handleChangeUpdate = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
      _id: this.state._id,
    });
  };

  delete = (id) =>{

    
    axios({
      url: `/api/del/${id}`,
      method: "DELETE"
    })
    .then(() => {
      console.log("Data has been DELETE.")
      this.resetUserInput();
      this.getTask();

    })
    .catch(() =>{
      console.log("!!! ERROR !!!")

    });
  };

  updateDay = (id) =>{

    var payload = {
      _id:id,
      date:this.state.date,
    };
    axios({
      url: "/api/update",
      method: "PUT",
      data: payload
    })
    .then(() => {
      console.log("Data has been DELETE.")
      this.resetUserInput();
      this.getTask();

    })
    .catch(() =>{
      console.log("!!! ERROR !!!")

    });
  };

  updateDone = (id, reminder) =>{

    var payload = {
      _id:id,
      reminder:reminder,
    };
    axios({
      url: "/api/reminder",
      method: "PUT",
      data: payload
    })
    .then(() => {
      console.log("Data has been DELETE.")
      this.resetUserInput();
      this.getTask();

    })
    .catch(() =>{
      console.log("!!! ERROR !!!")

    });
  };

  resetUserInput = () => {
    this.setState({
      text:"",
      day:"",
    })
  };

  displayTask=(tasks) =>{
    if (!tasks.length) return null;

    return tasks.map((task, index) => (
      <div key={index} className="w-screen md:max-w-max  grid grid-cols-3 gap-2 place-self-center col-start-2 bg-green-100 px-4 py-2 rounded-lg  border-double border-4 border-blue-500">
        <div className="flex-1">
        <h3 className="flex col-start-1 ">{task.text}</h3>
        <button 
        onClick={() => this.updateDone(task._id, task.reminder)}  
        className="bg-green-100 my-1 p-1 rounded-lg  border-double border-4 border-blue-500">
        {task.reminder === true ?<p className="flex">Done</p>:<p className="flex">Not Done</p> }
        </button>
        </div>
        <div className="flex-1">
        <p className="col-start-2 flex">
        {moment(task.date).format("lll")}</p>
        <input 
        className="flex w-full bg-green-100 p-1  rounded-lg  border-double border-4 border-blue-500" 
        type="datetime-local" 
        placeholder="Edit date" 
        name="date"
        value={this.state.date} 
        onChange={this.handleChangeUpdate}/>
        <button  onClick={() => this.updateDay(task._id)} className="bg-green-100 my-1 p-1 rounded-lg  border-double border-4 border-blue-500">
        Update
        </button>
        </div>
        <button onClick={() => this.delete(task._id)} className="grid grid-cols-3 gap-1 col-start-3 bg-green-100  rounded-lg  border-double border-4 border-blue-500">          
          <p className="place-self-center col-start-2">Delete</p>
          </button>
      </div>
      ));
    };

  render() {
    console.log(this.state);

    //JSX
    return(
   
      <div className="bg-green-100">
        <div className= "grid grid-cols-3 gap-2">
        <h1 className="place-self-center col-start-2">Task Manager</h1>
        </div>
       <AddTask/>
        <div className="grid grid-cols-3 gap-2">
          {this.displayTask(this.state.tasks)}
        </div>
      </div>
    );
  }
}

export default App;
