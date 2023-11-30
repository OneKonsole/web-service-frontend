import React from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";


const EditCardInfos: React.FC = () => {

    return (
        <PanelLayout>
            <div className="h-screen justify-center p-5">
                <label className="text-xl font-bold text-left">
                    Update your card informations
                </label>

                <div className="flex flex-col w-full p-4">
                    <label className="text-sm text-gray-dark text-left pr-2">
                        Address
                    </label>
                </div>
            </div>
        </PanelLayout>
    );
}

export default EditCardInfos;


