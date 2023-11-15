import {Suspense} from "react";
import {useRoutes} from "react-router-dom";

import routes from '~react-pages';

const App = () => {
    const elements = useRoutes(routes);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {elements}
        </Suspense>
    );
};

export default App;