import React from "react";
import "./App.css";
import "./assets/styles/index.scss";
import Filter from "./components/Filter/Filter";
import Main from "./components/Main/Main";
import TanstackQueryProvider from "./providers/TanstackQueryProvider";

const App: React.FC = () => {
    return (
        <div>
            <TanstackQueryProvider>
                <Main />
                <Filter />
            </TanstackQueryProvider>
        </div>
    );
};

export default App;
