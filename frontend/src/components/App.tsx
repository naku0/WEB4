import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import '../App.css';
import {JSX} from "react";
import {Auth} from "./Auth";
import {Home} from "./Home";


const App = (): JSX.Element => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
            </Routes>
        </Router>
    );
}

export default App;
