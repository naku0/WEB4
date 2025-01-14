import {JSX, useEffect} from "react";
import army from '../../404.jpg'
import "../../stylings/404.css"
import {Header} from "../smart/Header";

export const $404 = () :JSX.Element => {
    useEffect(() => {
        setTimeout(() =>{
            window.location.href = '/';
        }, 5000);
    }, []);
    return(
        <>
            <Header/>
        <div className="errorPage">
         <div className="errorBlock">
             <h1>404</h1>
             <p>PAGE NOT FOUND</p>
         </div>
            <img src={army} alt="404-error" onClick={e =>
                window.location.href = "https://службапоконтракту.рф/"}/>
        </div>
        </>
    );
}