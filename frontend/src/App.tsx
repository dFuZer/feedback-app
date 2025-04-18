import React from "react";
import "./App.css";
import "./assets/styles/index.scss";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import TanstackQueryProvider from "./providers/TanstackQueryProvider";

const App: React.FC = () => {
    return (
        <div>
            <TanstackQueryProvider>
                <Header />
                <Main />
            </TanstackQueryProvider>
        </div>
    );
};

export default App;
