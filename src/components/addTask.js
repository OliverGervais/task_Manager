import React, { Component } from 'react'
import '../styles/main.css';
import axios from 'axios';



export default class AddTask extends Component {
    state = {
        _id: "" ,
        text:"",
        date: "" ,
        reminder: false,
        tasks:[]
      };

      



      handleChange = ({target}) => {
        
        const {name, value} = target;
    
        this.setState({[name]: value});
    
      };
    
      handleChangeReminder = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
    
    
        this.setState({
          [name]: value,
          reminder: !this.state.reminder
    
        });
    
    
      };


      submit = (event) =>{
        
    
        var payload = {
          text:this.state.text,
          date:this.state.date,
          reminder:this.state.reminder
        };
        axios({
          url: "https://ollytask.herokuapp.com/api/save",
          method: "POST",
          data: payload
        })
        .then(() => {
          console.log("Data has been send to server.")
          this.resetUserInput();        
        })
        .catch(() =>{
          console.log("Data has not been received !!! ERROR !!!.")
    
        });
    
      };
    

    render() {
        return (
            <div>
                <form className="grid grid-cols-4 gap-1" onSubmit={this.submit}>
                    <div className="flex-1 col-start-1 place-self-start md:place-self-center md:col-start-2 ">
                        <div className= "flex-auto">
                            <input 
                            className="bg-green-100 px-4 py-2 rounded-lg  border-double border-4 border-blue-500"
                            type="text"
                            name= "text"
                            value={this.state.text}
                            placeholder="Name of your task"
                            onChange={this.handleChange}
                            />
                            </div>
                            <div className="flex-auto">
                                
                                <input 
                                className="w-1/2 sm:w-full bg-green-100 px-4 py-2 my-2 rounded-lg border-double border-4 border-blue-500"
                                type="datetime-local"
                                name= "date"
                                value={this.state.date}
                                placeholder="DD-MM-YYYY HH:MM"
                                onChange={this.handleChange}/>
                                
                                </div>
                                </div>
                                <div className="flex-1 place-self-end col-start-4 md:place-self-center md:col-start-3 ">
                                    <div className="flex-auto bg-green-100 md:px-4 md:py-2 my-1 rounded-lg border-double border-4 border-blue-500">
                                        <input 
                                        className="mt-1"
                                        type="checkbox"
                                        name= "reminder"
                                        value={this.state.reminder}
                                        onChange={this.handleChangeReminder}/>
                                        <label className=" mx-3 ">Task Done?</label>
                                        </div>
                                        <div className="grid grid-cols-1 gap-1">
                                            <button className="flex-auto mb-1 bg-green-500 px-4 py-2 rounded-lg  border-double border-4 border-light-blue-500">Submit</button>
                                            </div>
                                            </div>
                                            </form>
                                            </div>
                                            )
                                        }
                                    }

