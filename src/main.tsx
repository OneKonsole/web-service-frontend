import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router,} from "react-router-dom";

import './index.css'
import '@assets/base.css'
import {AuthProvider} from "@provider/AuthProvider.tsx";
import ProtectedRoutes from "@components/ProtectedRoutes.tsx";
import {startAutoRefreshToken} from "@utils/runWorkers.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <ProtectedRoutes/>
            </Router>
        </AuthProvider>
    </React.StrictMode>
    ,
)
