import React, { useState } from "react";
import { useEffect } from "react";
import Input from "../Input/Input";

function CreateActivity(props) {

  let arr = [];
  for (let i = 0; i < (props.values.activities.length); i++) {
    arr.push(i + 1);
  }

const [activities,setActivities] = useState(arr);
  const backForm = (e) => {
    e.preventDefault();
    props.prevStep();
  };

  const addButton = (e) =>{
    e.preventDefault();
    setActivities(activites=>[...activities,activities.length+1]);  
    props.increase('activities');
    console.log(props.values.activities);
  }

  const subtractButton = (e) =>{
    e.preventDefault(); 
    props.decrease('activities');
    const copy=activities;
    copy.pop();
    setActivities(copy);  
    console.log(props.values.activities);
  }

  useEffect(()=>{
    
  },[activities]);

  return (
    <form onSubmit={props.submit} className="activity-form container" id="activity-form">
      <h1>Add Activitites</h1>

      {activities.map((e, i) => (
        <div className="activity" key={e}>
          <div className="numbering"><h6>Activity {i + 1}</h6></div>

          <Input 
            type={"text"} 
            id={"activity-name"} 
            description={"Name of Activity"}
            value={props.values.activities[i].name}
            handleChange={props.onChange(`activities name ${i}`)}
            // isRequired = {'required'}
          />
          <Input 
            type={"text"} 
            id={"activity-location"} 
            description={"Location"}
            value={props.values.activities[i].location}
            handleChange={props.onChange(`activities location ${i}`)}
            // isRequired = {'required'}
          />
          <Input 
            type={"text"} 
            id={"activity-time"} 
            description={"Time"}
            value={props.values.activities[i].time}
            handleChange={props.onChange(`activities time ${i}`)}
            // isRequired = {'required'}
          />
          {/* <input    type="text" id="activity-name"  value={props.values.activities[i].name} onChange={props.onChange(`activities name ${i}`)}    required/> */}
          {/* <input    type="text" id="activity-location"  value={props.values.activities[i].location} onChange={props.onChange(`activities location ${i}`)} required/> */}
          {/* <input    type="text" id="activity-time"  value={props.values.activities[i].time} onChange={props.onChange(`activities time ${i}`)}   required/> */}
          
        </div>
      ))}

      <div className="add-sub" id="field-buttons">
        <span className="add">
          <button
            type="button"
            className="add-btn"
            onClick={addButton}
          >
            +
          </button>
        </span>
        <span className="subtract">
          <button
            type="button"
            className="add-btn"
            onClick={subtractButton}
          >
            -
          </button>
        </span>
      </div>

      <div className="buttons">
        <span className="btn-left" onClick={backForm}>
          <button className="button">Previous</button>
        </span>
        <span className="btn-right" >
          <button className="button" type="submit">Submit</button>
        </span>
      </div>
    </form>
  );
}

export default CreateActivity;
