import React from "react";
import SideBar from "@components/SideBar.tsx";

/**
 * Props interface for the PanelLayout component
 * @interface Props
 * @param children the children of the component
 */
type Props = {
    children: React.ReactNode;
}
/**
 * PanelLayout component is used to render a panel layout
 * @param children the children of the component
 * @constructor React.FC<Props>
 */
const PanelLayout: React.FC<Props> = ({children}: Props) => {
    return (
        <>
            <div className="flex h-screen">
                <SideBar/>
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </>
    );
};

export default PanelLayout;