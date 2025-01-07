import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import '../stylings/App.css';
import {JSX, useEffect, useState} from "react";
import {Auth} from "./pages/Auth";
import {Home} from "./pages/Home";
import {RootState} from "../redux/store";
import {userSlice} from "../redux/slices/userSlice";
import {useSelector} from "react-redux";
import {Game} from "./pages/Game";


const App = (): JSX.Element => {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/play" element={<Game/>}/>
            </Routes>
        </Router>
    );
}

export default App;
