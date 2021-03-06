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
    axios.get("https://ollytask.herokuapp.com/api")
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
      url: `https://ollytask.herokuapp.com/api/del/${id}`,
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
      url: "https://ollytask.herokuapp.com/api/update",
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
      url: "https://ollytask.herokuapp.com/api/reminder",
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
      <div key={index} className="w-screen md:max-w-max  grid grid-cols-3 gap-2 place-self-center col-start-2 px-4 py-2  rounded-lg font-serif bg-newblue border-2 border-back">
        <div className="flex-1">
        <h3 className="flex col-start-1 text-xl font-bold ">{task.text}</h3>
        <button 
        onClick={() => this.updateDone(task._id, task.reminder)}  
        className="my-1 p-1 rounded-lg  ">
        {task.reminder === true ?<p className="flex p-1 rounded-lg text-back bg-newblue border-2 border-newgreen  font-black text-xl animate-bounce">Done</p>:<p className=" font-black text-xl flex p-1 rounded-lg text-newblue bg-newgreen border-2 border-back">Not Done</p> }
        </button>
        </div>
        <div className="flex-1">
        <p className="col-start-2 flex text-xl font-bold ">
        {moment(task.date).format("lll")}</p>
        <input 
        className="flex w-full p-1 text-xl font-bold  bg-newgreen rounded-lg text-back font-serif bg-newblue border-2 border-back" 
        type="datetime-local" 
        placeholder="Edit date" 
        name="date"
        value={this.state.date} 
        onChange={this.handleChangeUpdate}/>
        <button  onClick={() => this.updateDay(task._id)} className="bg-newgreen my-1 p-1 hover:bg-newgreen hover:border-back  rounded-lg font-serif bg-back border-2 border-newblue text-newblue  font-black text-xl">
        Update
        </button>
        </div>
        <button onClick={() => this.delete(task._id)} className="grid grid-cols-3 gap-1 col-start-3 hover:bg-newgreen hover:border-back  rounded-lg font-serif bg-back border-2 border-newblue text-newblue font-black text-3xl">          
          <p className="place-self-center col-start-2">Delete</p>
          </button>
      </div>
      ));
    };

  render() {
    console.log(this.state);

    //JSX
    return(
   
      <div className="bg-gradient-to-t from-newgreen via-back to-newblue h-full">
        <div className="grid grid-cols-1">
        <img className="place-self-center col-start-1 w-60"  src="logo.png" />
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
