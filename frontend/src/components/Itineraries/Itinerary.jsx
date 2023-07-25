import React from "react";
import Activity from "./Activity";
import styles from './Itineraries.module.css';

function Itinerary(props) {
  
  let arr = [];
  for (let i = 0; i < props.activities.length; i++) arr.push(i);

  const up = (id,index) =>(e) =>{
    e.preventDefault();
    console.log(id);
    console.log(index);
  }
  return (
    <> 
    <form>
      <div className={`${styles[`itinerary-card`]}`} key={props.id}>
        
        <div className={`${styles[`itinerary-number`]}`}>Itinerary</div>
          {
            props.completed ? (
              
              <div className={`${styles[`heading`]} ${styles.completed}`}>

                <div className={`${styles[`itinerary-name`]}`}>              
                  <h1>
                  {props.name}
                  </h1>
                </div>

                <div className={`${styles[`options`]}`}>

                  <div className="form-check">
                    <label className="form-check-label" htmlFor="flexCheckChecked">Done</label>
                    <input className="form-check-input completed" onChange={props.clicked(props.id)} type="checkbox" id="flexCheckChecked" checked/>
                  </div>
                  
                  <button className={`${styles[`option`]}`} onClick={props.delete(props.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button className={`${styles[`option`]}`} onClick={props.edit(props.id)}>
                    <i className="fa-solid fa-pen"></i>
                  </button>

                </div>
                
               

              </div>
            ) : (
              <div className={`${styles[`heading`]}`}>
                
                <div className={`${styles[`itinerary-name`]}`}>              
                  <h1>
                  {props.name}
                  </h1>
                </div>

                <div className={`${styles[`options`]}`}>

                  <div className="form-check">
                    <label className="form-check-label" htmlFor="flexCheckChecked">Done</label>
                    <input className="form-check-input" onChange={props.clicked(props.id)} type="checkbox" id="flexCheckChecked"/>
                  </div>

                  <button onClick={props.delete(props.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button onClick={props.edit(props.id)}>
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </div>
                

              </div>

            )
          }
          

        <p>Date: {props.date}</p>
        
          {(arr || []).map((i) => (
            <div key={i + 1}>
              <Activity
                id = {props.id}
                name={props.activities[i].name}
                location={props.activities[i].location}
                time={props.activities[i].time}
                index={i}
                dragUp = {props.dragUp}
                dragDown = {props.dragDown}
              />
            </div>
          ))}
        
      </div>
      </form>
    </>
  );
}

export default Itinerary;
