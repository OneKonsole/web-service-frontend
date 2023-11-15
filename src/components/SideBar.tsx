import React, {useState} from 'react';
import {Link} from "react-router-dom";

import accountIcon from "@assets/icons/account.svg";
import billingIcon from "@assets/icons/billing.svg";
import clusterIcon from "@assets/icons/cluster.svg";
import downloadIcon from "@assets/icons/download.svg";
import logoutIcon from "@assets/icons/logout.svg";
import monitorIcon from "@assets/icons/monitor.svg";
import orderIcon from "@assets/icons/order.svg";

import logofull from "@assets/logos/logo-full.svg";
import logoshort from "@assets/logos/logo-short.svg";

type MenuItemProps = {
    link: string,
    imgSrc: string,
    imgAlt: string,
    text: string
    collapsed: boolean
    bonusClass?: string
}

/**
 * MenuItem component is used to render a menu item
 * @param link the link to be navigated to
 * @param imgSrc the image source
 * @param imgAlt the image alternative text
 * @param text the text to be displayed
 * @param collapsed the state of the sidebar
 * @param bonusClass the bonus class to be added to the menu item
 */
const MenuItem: React.FC<MenuItemProps> = ({link, imgSrc, imgAlt, text, bonusClass, collapsed}) => {
    return (
        <Link to={link}
              className={`flex items-center rounded-md hover:bg-blue-light transition-all duration-500 py-4 ${bonusClass} ${collapsed ? "justify-center" : "px-5 space-x-2"}`}>

            <img
                src={imgSrc}
                alt={imgAlt}
                className={`transition-all duration-500 ease-in-out ${collapsed ? "h-6 w-6" : "h-8 w-8"}`}>
            </img>
            <p
                className={`transition-all duration-500 ease-in-out ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
                {text}
            </p>
        </Link>
    );
};

/**
 * SideBar component is used to render the side bar
 */
const SideBar: React.FC = () => {

    const [collapsed, setCollapsed] = useState(false);

    // Fonction pour basculer l'état de rétractabilité
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const sidebarClass = collapsed ? "w-16" : "w-64";

    const midMenuItems = [
        {link: "/menus/monitor", imgSrc: monitorIcon, imgAlt: "Monitor", text: "Monitor"},
        {link: "/menus/clusters", imgSrc: clusterIcon, imgAlt: "Cluster", text: "Cluster"},
        {link: "/menus/billing", imgSrc: billingIcon, imgAlt: "Billing", text: "Billing"},
        {link: "/download", imgSrc: downloadIcon, imgAlt: "Download", text: "Download"},
        {link: "/order", imgSrc: orderIcon, imgAlt: "Order", text: "Order"}
    ];

    const bottomMenuItems = [
        {link: "/account", imgSrc: accountIcon, imgAlt: "Account", text: "Account"},
        {link: "/auth/logout", imgSrc: logoutIcon, imgAlt: "Logout", text: "Logout"}
    ];

    return (
        <aside
            className={`bg-blue text-white space-y-6 pt-7 pb-2 px-2 h-auto relative flex justify-between flex-col transition-all duration-500 ease-in-out ${sidebarClass}`}>

            <div className="text-white flex px-1 items-center absolute transition-opacity duration-500">
                <img
                    src={logofull}
                    alt="OneKonsole"
                    className={`transition-opacity duration-500 ${collapsed ? 'opacity-0' : 'opacity-100'}`}
                    onClick={toggleSidebar}>
                </img>
                <img
                    src={logoshort}
                    alt="OneKonsole"
                    className={`absolute transition-opacity duration-500 ${collapsed ? 'opacity-100' : 'opacity-0'}`}
                    onClick={toggleSidebar}>
                </img>
                <hr/>
            </div>

            <nav>
                <hr className={"mt-7 mb-2 opacity-20"}></hr>
                {midMenuItems.map(item => <MenuItem key={item.text} {...item} collapsed={collapsed}/>)}
            </nav>

            <nav className="mt-auto">
                <hr className={"opacity-20 mb-2"}></hr>
                {bottomMenuItems.map(item => <MenuItem key={item.text} {...item} collapsed={collapsed}/>)}
            </nav>
        </aside>
    );
};
export default SideBar;