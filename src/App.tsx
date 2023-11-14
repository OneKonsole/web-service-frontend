import React, {Suspense} from "react";
import SideBar from "./components/SideBar.tsx";
import {useRoutes} from "react-router-dom";
import routes from "~react-pages";


const App: React.FC = () => {
    return (
        <div className="flex">
            <SideBar/>
            <div className="flex-1">
                <Suspense fallback={
                    <div>Loading...</div>
                }>
                    {useRoutes(routes)}
                </Suspense>
            </div>
        </div>
    );
}
export default App;