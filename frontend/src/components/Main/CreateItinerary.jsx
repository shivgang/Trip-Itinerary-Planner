import React from "react";
import styles from "./Main.module.css";
import Input from "../Input/Input";

function CreateItinerary(props) {

  function continueForm(e) {
    e.preventDefault();
    props.nextStep();
  }

  return (
    <>
      <main className="container" id={styles["itinerary-section"]}>
        <div id={styles["section-header"]}>
          <h1>Create an Itinerary</h1>
        </div>
        <div id={styles["section-content"]}>
          <form>
            
            <Input 
              className={"itinerary-input"}
              type={"text"} 
              id={"name"} 
              name={"name"}
              description={"Enter the Name of your Itinerary"}
              value={props.values.name}
              handleChange={props.onChange('name')}
              // isRequired = {'required'}
            />

            <Input 
              className={"itinerary-input"}
              type={"text"} 
              id={"destination"} 
              name={"destination"}
              description={"Enter destination"}
              value={props.values.destination}
              handleChange={props.onChange('destination')}
              // isRequired = {'required'}
            />

            <Input 
              className={"itinerary-input"}
              type={"date"} 
              id={"date"} 
              name={"date"}
              description={"Enter the Date"}
              value={props.values.date}
              handleChange={props.onChange('date')}
              // isRequired = {'required'}
            />

            {/* <input  className="itinerary-input" type="text" id="name" name="name" required  placeholder="Enter the Name of your Itinerary"  value={props.values.name} onChange={props.onChange('name')}/> */}
            {/* <input  className="itinerary-input" type="text" id="destination"  name="destination"  required  placeholder="Enter destination" value={props.values.destination}  onChange={props.onChange('destination')}/> */}
            {/* <input  className="itinerary-input" type="date" id="date" name="date" required  placeholder="Enter the Dates" value={props.values.date} onChange={props.onChange('date')} /> */}
            {/* <!-- Add more form fields as needed --> */}

            <button
              className={styles["add-itinerary"]}
              type="submit"
              onClick={continueForm}
            >
              Start Planning
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default CreateItinerary;
