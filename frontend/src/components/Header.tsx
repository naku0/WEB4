import {JSX} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

export const Header = () : JSX.Element =>{
    const isAuth = useSelector((state:RootState) => state.userState.isAuth)
    return(
      <>
          {isAuth ? (
            <></>
          ) : (
            <></>
          )}
      </>
    );
}