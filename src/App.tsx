import {Suspense} from "react";
import {
    useRoutes
} from "react-router-dom";

import routes from '~react-pages';

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {useRoutes(routes)}
        </Suspense>
    )
};

export default App;