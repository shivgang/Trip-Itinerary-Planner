import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Itinerary from "./Itinerary";
import { useNavigate } from "react-router-dom";
import styles from './Itineraries.module.css';
import axios from "axios";


function Itineraries(){    
    const[itineraries,setItineraries] = useState([]);
    const navigate = useNavigate();
    // const [arr,setArr] = useState([]);

    async function getItineraries(){
        const savedItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
        setItineraries(savedItineraries);

        // console.log("out");
        // await axios.get('http://localhost:5000/itineraries/history').then((response)=>{
        //     console.log(10);
        //     console.log(response.data);
        //     console.log(10);
        // }).catch((err)=>{
        //     console.log(err);
        // });
        // console.log("in");
        // let a = [];
        // for(let i=0;i<savedItineraries.length;i++)  a.push(i);
        // setArr(a);
    }    

    const deleteItinerary = (id) => (e) =>{
        let itineraries = JSON.parse(localStorage.getItem("itineraries"));
        let updatedItineraries = itineraries.filter(function(itinerary){
            if(itinerary.id == id)  return false;
            return true;
        });
        
        localStorage.setItem("itineraries",JSON.stringify(updatedItineraries));
        getItineraries();
    }

    const editItinerary = (id) => (e) =>{
        e.preventDefault();
        navigate(`/edit/itineraries/${id}`);
    }

    const clicked = (id) => (e)=>{
        const itineraries = JSON.parse(localStorage.getItem("itineraries"));
        itineraries.map(itinerary =>{
          if(itinerary.id === id){
            console.log(itinerary);
            itinerary.completed = !itinerary.completed;
               
          }
        })
        localStorage.setItem("itineraries",JSON.stringify(itineraries));
        getItineraries();
    }

    function swapItems(pos1, pos2, nextArray) {
        const temp = nextArray[pos1]; // Temp variable
        nextArray[pos1] = nextArray[pos2]; // Swap the items
        nextArray[pos2] = temp;
        return nextArray; // Return the array
    }

    const dragUp = (id,index) => (e) =>{
        e.preventDefault();
        if(index==0)    return;

        const copy = itineraries;
        copy.forEach(itinerary =>{
            if(itinerary.id === id){
                let selectedActivities = itinerary.activities.slice();
                const swappedActivites = swapItems(index-1,index,selectedActivities);
                itinerary.activities = selectedActivities;
            }
        })
        localStorage.setItem("itineraries",JSON.stringify(copy));
        getItineraries();
    }

    const dragDown = (id,index) => (e) =>{
        e.preventDefault();
      
        const copy = itineraries;
        copy.forEach(itinerary =>{
            if(itinerary.id === id){
                if(itinerary.activities.length === index+1)
                    return;
                let selectedActivities = itinerary.activities.slice();
                const swappedActivites = swapItems(index,index+1,selectedActivities);
                itinerary.activities = selectedActivities;
            }
        })
        localStorage.setItem("itineraries",JSON.stringify(copy));
        getItineraries();
    }

    function undo(){
        let modification = JSON.pars(localStorage.getItem("modifications"));
    }

    function redo(){
        let modification = JSON.pars(localStorage.getItem("modifications"));
    }

    useEffect(()=>{
        getItineraries();
    },[]);
   
    return  (
        <>        
        <section id="itinerary-display" className="container">
            {/* <div className={`${styles[`modifications`]} container`}>
                <button className="btn" onClick={undo}>Undo</button>
                <button className="btn" onClick={redo}>Redo</button>
            </div> */}
            {(itineraries.length>0 ) && 
                (itineraries || []).map( (itinerary) => (      
                    <div className="itinerary" key={itinerary.id}>
                        <Itinerary 
                            id={itinerary.id}
                            name={itinerary.name} 
                            date={itinerary.date} 
                            activities={itinerary.activities}
                            delete={deleteItinerary}
                            edit={editItinerary}
                            completed={itinerary.completed}
                            clicked = {clicked}
                            dragUp = {dragUp}
                            dragDown = {dragDown}
                        />
                    </div>
                ))
            }
            
        </section>
        </> 
    );
}

export default Itineraries;