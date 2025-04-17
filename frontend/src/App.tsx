import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import './assets/styles/index.scss'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </Router>
    )
}

export default App;
