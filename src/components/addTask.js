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
            <>
            <form className="bg-white border-back  md:px-4 py-4 mb-2 md:mx-20 lg:mx-36 xl:mx-56 2xl:mx-96 mt-2 grid grid-flow-col grid-cols-2 grid-rows-2 gap-2" onSubmit={this.submit}>
                  
                  
                        <input 
                            className=" text-xl font-bold px-4 py-2  font-mono bg-white border-b-2 border-back"
                            type="text"
                            name= "text"
                            value={this.state.text}
                            placeholder="Name of your task"
                            onChange={this.handleChange}
                            />
               
                 
                            <input 
                                className="w-1/2 sm:w-full text-xl font-bold  px-4 py-2 my-2 bg-white  text-back font-mono bg-newblue border-b-2 border-back"
                                type="datetime-local"
                                name= "date"
                                value={this.state.date}
                                placeholder="DD-MM-YYYY HH:MM"
                                onChange={this.handleChange}/>
                                <div className=" mx-auto  md:px-4 md:py-2 my-1 rounded-lg font-mono ">
                                  
                                    <input 
                                        className="mt-1 "
                                        type="checkbox"
                                        name= "reminder"
                                        value={this.state.reminder}
                                        onChange={this.handleChangeReminder}/>
                                        <label className="font-mono mx-3 text-back text-xl font-bold">Task Done?</label>
                                        </div>
                            
                                        <button className="flex-automb-1 px-4 py-2 hover:bg-newgreen hover:border-back   font-mono bg-white border-b-2 border-newblue text-newblue font-black text-xl">Submit</button>
                             
                                  </form>
                                            </>
                                            )
                                        }
                                    }

