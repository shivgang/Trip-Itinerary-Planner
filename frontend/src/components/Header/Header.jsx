import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header(props) {

  const logout = () => {
    window.open(`http://localhost:5000/auth/logout`, "_self");
  }
  
  return (
    <header>
      <div className={styles.logo}>
        <img  src="logo.png"  alt="Logo "  />
      </div>
      <nav>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/itineraries'}>Itineraries</Link></li>
          <li><a href="#">About</a></li>
          <li>
            {props.user ? 
                      <Link  onClick={logout} >Logout </Link> 
                        : <Link  to={'/login'} >Log In </Link> }</li>
          {/* <!-- Add more navigation items if needed --> */}
        </ul>
      </nav>
    </header>
  );
}


export default Header;
