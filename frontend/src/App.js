import React, { useState ,useEffect} from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Itinerary from "./components/Itineraries/Itineraries";
import Itineraries from "./components/Itineraries/Itineraries";
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Login from "./components/Login/Login";
import axios from 'axios';

function App() {
  const [user,setUser] = useState(null);

  const getUser = async ()=>{
    try{
      const url = `http://localhost:5000/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
      setUser(data.user._json);
    }catch (err) {
      // console.log(err);
    }
    
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        {
          <Header user={user}/>
        }
        <Routes>
          <Route
            exact
            path="/login"
            element={!user ? <Login/> : <Navigate to='/'/>}
          />
          <Route
              exact
              path="/"
              element={<Main/>}
          />
          <Route
            exact
            path="/itineraries"
            element={user ? <Itineraries/> :<Navigate to='/login'/>}
          />

          <Route
            exact
            path="/edit/itineraries/:id"
            element={user ? <Main/> :<Navigate to='/login'/>}
          />
          
        </Routes>
          
      </BrowserRouter> 
    
    </>
  );
}

export default App;



// task 6 undo redo not done
//  for now authentication with google only
// not implementing password reset functionalu=ity via email