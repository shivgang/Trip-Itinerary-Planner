import React, { useState } from "react";
import { useEffect } from "react";
import CreateActivity from "./CreateActivity";
import CreateItinerary from "./CreateItinerary";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Itinerary from "../Itineraries/Itinerary";

function Main(){   

    const { id } = useParams();         // for edit option
    const [user,setUser] = useState(null);
    const[itineraries,setItineraries] = useState([]);
    const[itinerary,setItinerary] = useState({
        id: "",
        name: "",
        destination: "",
        date :"",
        activities: [{
            name :"",
            location:"",
            time : "",
        },],
        completed : false,
    }); 


    const [index,setIndex] = useState(1);   
    const navigate = useNavigate();

    function generateUniqueId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `${timestamp}-${random}`;
    }
    
    async function storeItinerary(itinerary) {
        if(!user){
            navigate('/login');
            return;
        }
        // Store the itinerary in local storage
        let itinerarys = localStorage.getItem("itineraries");
        if (itinerarys) {
            itinerarys = JSON.parse(itinerarys);
            itinerarys.push(itinerary);
            localStorage.setItem("itineraries", JSON.stringify(itinerarys));
        } else {
            let itinerarys = [itinerary];
            localStorage.setItem('itineraries', JSON.stringify(itinerarys));
        }

        itinerary.type = "insert";  
        let modifications = localStorage.getItem("modifications");
        if (modifications) {
            modifications = JSON.parse(modifications);
            modifications.push(itinerary);
            localStorage.setItem("modifications", JSON.stringify(modifications));
        } else {
            let modifications = [itinerary];
            localStorage.setItem('modifications', JSON.stringify(modifications));
        }
        getItineraries();

        itinerary.googleId = user.sub;
        // console
        await fetch("http://localhost:5000/itineraries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...itinerary}),
        }).catch(error => {
            // window.alert(error);
            console.log("error");
            return;
        });
    }

    function addItinearary(event){
        event.preventDefault(); // Prevent form submission
        
        if(!user){
            navigate('/login');
            return;
        }
        if(itinerary.id!==""){
            let itineraries = JSON.parse(localStorage.getItem("itineraries"));
            let updatedItineraries = itineraries.filter(function(itinerary){
                if(itinerary.id == id)  return false;
                return true;
            });
            localStorage.setItem("itineraries",JSON.stringify(updatedItineraries));
        }

        const itineraryId = generateUniqueId();;    
        const copy = itinerary;
        copy.id = itineraryId;
        setItinerary(copy);
        storeItinerary(itinerary);
        setItinerary({
            id: '',
            name: '',
            destination: '',
            date:'',
            activities :[{
                name :"",
                location:"",
                time : "",
            }],
        });
        setIndex(1);
       }

    function getItineraries(){
        const savedItineraries = JSON.parse(localStorage.getItem('itineraries')) || [];
        setItineraries(savedItineraries);
    }

    const nextStep = () => {
        setIndex(index + 1);
    }

    const prevStep = () => {
        setIndex(index - 1);
    }

    const handleChange = input => e => {    
        setItinerary({ ...itinerary, [input]: e.target.value });
    }

    const handleArrayChange = input => e =>{
        const split = input.split(' ');
        const field = split[0], subfield = split[1], index = split[2];
        const copy={...itinerary};
        copy[field][index][subfield] = e.target.value;
        setItinerary(copy);
    }

    const increaseField = input =>{ 
        const copy = itinerary;
        const activity = {
            name :"",
            location:"",
            time : "",
        };
        copy.activities.push(activity);
        setItinerary(copy);
    }

    const decreaseField = (input) => {
        const copy = itinerary;
        copy.activities.pop();
        setItinerary(copy);
    }

    const getUser = async ()=>{
        try{
          const url = `http://localhost:5000/auth/login/success`;
          const { data } = await axios.get(url, { withCredentials: true });
        //   console.log(data);
          setUser(data.user._json);
        }catch (err) {
          // console.log(err);
        }
        
      }

    useEffect(()=>{
        window.addEventListener('load', getItineraries);
    });

    useEffect(()=>{
        if(id){
            let itineraries = JSON.parse(localStorage.getItem("itineraries"));
            let newItinerary = itineraries.filter(function(itinerary){
                if(itinerary.id==id)    return true;
                return false;
            });
            newItinerary=newItinerary[0];
            setItinerary(newItinerary);
        }
    },[id]);

    useEffect(() => {
        getUser();
      }, []);

    let content = '';
    {
        switch (index){
            case 1:content =(
                <CreateItinerary onChange={handleChange} nextStep={nextStep} prevStep={prevStep} values={itinerary}/>
            );
            break;
            case 2:content = (
                <CreateActivity submit={addItinearary} onChange={handleArrayChange} onextStep={nextStep} prevStep={prevStep} values={itinerary} increase={increaseField} decrease={decreaseField}/>
            );
            break;
            default: content = (
                <h1>
                    'Thank You!' 
                </h1>
            );
                break;
        }
    }

    return (content);

}

export default Main;