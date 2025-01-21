import {JSX} from "react";
import cat from "../../cat.jpg";
import {useNavigate} from "react-router-dom";

export const UserCard = ({username} : {username: string}): JSX.Element => {
    const navigate = useNavigate()
    return(
        <div className="userCard" onClick={e => {
            e.preventDefault();
            navigate("/")
        }}>
            <img src={cat} alt="it's you" className="profilePhoto"/>
            <p className="username">{username}</p>
        </div>
    )
}