import {JSX, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Link} from "react-router-dom";

export const Header = () : JSX.Element =>{
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const userInfo = (localStorage.getItem('userInfo'));
    const [username, setUsername] = useState<string>('');
    if (userInfo){
        setUsername(JSON.parse(userInfo)?.username) ;
    }
    useEffect(() => {
        if(localStorage.getItem('token')) setIsAuthenticated(true)
    }, []);


    return(
      <>
          {isAuthenticated ? (
            <div>Приветь {username}</div>
          ) : (
            <Link to="/auth">Вход</Link>
          )}
      </>
    );
}