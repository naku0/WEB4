import {JSX} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

export const Header = () : JSX.Element =>{
    const isAuth = useSelector((state:RootState) => state.user.isAuth);
    const username = useSelector((state:RootState) => state.user.user?.username)
    return(
      <>
          {isAuth ? (
            <div>Добро Пожаловать {username}</div>
          ) : (
            <div>Зарегестрируйтесь</div>
          )}
      </>
    );
}