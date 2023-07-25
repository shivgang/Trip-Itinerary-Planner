import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Itinerary from "./Itinerary";
import { useNavigate } from "react-router-dom";
import styles from './Itineraries.module.css';

function Itineraries(){    
    const[itineraries,setItineraries] = useState([]);
    const navigate = useNavigate();
    // const [arr,setArr] = useState([]);

    function getItineraries(){
        const savedItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
        setItineraries(savedItineraries);
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



// import React from "react";
// import { useEffect } from "react";

// function initializeApp(event) {
//     event.preventDefault();
//     // Retrieve saved itineraries from local storage
//     const savedItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
//     const itineraryContainer = document.querySelector('#itinerary-display');

//     (savedItineraries || []).forEach((itinerary) => {
//         const itineraryCard = document.createElement('div');
//         itineraryCard.classList.add('itinerary-card');

//         const nameElement = document.createElement('h1');
//         // nameElement.textContent = itinerary.name;
//         nameElement.innerHTML = `
//                 <div class="itinerary-name">    
//                     ${itinerary.name}
//                 </div>
//                 <div class="options">

//                     <button>
//                         <i class="fa-solid fa-trash"></i>
//                     </button>
//                     <button>
//                         <i class="fa-solid fa-pen"></i>
//                     </button>
//                 </div>
//         `;
//         itineraryCard.appendChild(nameElement);


//         const datesElement = document.createElement('p');
//         datesElement.textContent = `Date: ${itinerary.date}`;
//         itineraryCard.appendChild(datesElement);

//         const activitiesElement = document.createElement('ul');
//         (itinerary.activities || []).forEach((activity) => {
//             const activityName = activity.name;
//             const activityLocation = activity.location;
//             const activityTime = activity.time;

//             activitiesElement.innerHTML += `
//             <p><strong>Activity Name:</strong> ${activityName}</p>
//             <p><strong>Location:</strong> ${activityLocation}</p>
//             <p><strong>Time:</strong> ${activityTime}</p>
//             `;  
//         }); 
//         itineraryCard.appendChild(activitiesElement);

//         itineraryContainer.appendChild(itineraryCard);
//     });

// }

// function Display(){
    
//     useEffect(() => {        
//         window.addEventListener('load', initializeApp);
//     });
    
//     return  (
//         <>
//         <section id="itinerary-display">
//             {/* <!-- Itinerary display elements will be added here --> */}
            
//         </section>
//         </> 
//     );
// }

// export default Display;