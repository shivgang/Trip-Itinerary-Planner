import React from "react";

function Input(props){
    return (
        <>
             <input
                className={props.class}
                type={props.type}
                id={props.id}
                name={props.name}
                placeholder={props.description}
                value={props.value}
                onChange={props.handleChange} 
            />
        </>
    );
}
export default Input;