import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import './assets/styles/index.scss'
import "./App.css"

const App: React.FC = () => {
    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}

export default App;
