import React from "react";
import styles from './Login.module.css'
function Login(){
    
    const googleAuth=()=>{
        window.open(`http://localhost:5000/auth/google/callback`, "_self");
    }
    return(
        <>
            <div className={styles.form}>
                <div className={styles.title}>Authentication</div>
                <button className={styles.btn} onClick={googleAuth}>Sign In With Google</button>
            </div>
        </>
    );
}
export default Login;