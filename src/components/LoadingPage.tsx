import React from 'react';
import logoIcon from "@assets/logos/logo-short.svg";
import PanelLayout from "@components/layout/PanelLayout.tsx";

const LoadingPage: React.FC = () => {
    return (
        <PanelLayout>
            <div className="flex justify-center items-center h-screen">
                <div className="relative">
                    {/* Logo */}
                    <img
                        src={logoIcon}
                        alt="logo"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 filter invert"
                    />
                    {/* Spinner */}
                    <div className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-gray-900"/>
                </div>
            </div>
        </PanelLayout>
    );
}

export default LoadingPage;
