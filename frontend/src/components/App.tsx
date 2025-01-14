import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import '../stylings/App.css';
import {JSX} from "react";
import {Auth} from "./pages/Auth";
import {Home} from "./pages/Home";
import {Game} from "./pages/Game";
import {$404} from "./pages/$404";


const App = (): JSX.Element => {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/play" element={<Game/>}/>
                <Route path='*' element={<$404/>}/>
            </Routes>
        </Router>
    );
}

export default App;
