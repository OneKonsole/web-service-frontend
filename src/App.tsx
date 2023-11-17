import {Suspense} from "react";
import {useRoutes} from "react-router-dom";

import routes from '~react-pages';
import {SidebarProvider} from "@components/layout/SideBarContext.tsx";

const App = () => {
    const elements = useRoutes(routes);

    return (
        <SidebarProvider>
            <Suspense fallback={<div>Loading...</div>}>
                {elements}
            </Suspense>
        </SidebarProvider>
    );
};

export default App;