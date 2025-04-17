import React from "react";
import Main from "./components/Main/Main";
import Filter from "./components/Filter/Filter";
import './assets/styles/index.scss'
import "./App.css"

const App: React.FC = () => {
    return (
        <div>
            <Main />
            <Filter />
        </div>
    )
}

export default App;
