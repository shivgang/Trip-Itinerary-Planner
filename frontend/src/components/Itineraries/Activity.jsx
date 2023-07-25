import React from "react";
import styles from './Itineraries.module.css';

function Activity(props){
    
    return (
        <>
        <div className={`${styles[`activity`]}`}>
            <div className={`${styles[`acitivity-number`]}`}>
                <strong>
                    Activity {props.index+1}
                </strong>
            </div>
            <div className={`${styles[`activity-heading`]}`}>
                <div className="activity-name">
                    <p><strong>Name:</strong> {props.name}</p>
                </div>
                <div className={`${styles[`drag-handles`]}`}>
                    <button onClick={props.dragDown(props.id,props.index)}>
                        <i className="fa-solid fa-caret-down"></i>
                    </button>
                    <button onClick={props.dragUp(props.id,props.index)}>
                        <i className="fa-solid fa-caret-up"></i>
                    </button>
                </div>
            </div>
            
            <p><strong>Location:</strong> {props.location}</p>
            <p><strong>Time:</strong> {props.time}</p> 
        </div>
        </>
    );
}

export default Activity;