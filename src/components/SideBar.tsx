import React, {useState} from 'react';
import {Link} from "react-router-dom";

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
        {link: "/menus/monitor", imgSrc: "/src/icons/monitor.svg", imgAlt: "Monitor", text: "Monitor"},
        {link: "/menus/clusters", imgSrc: "/src/icons/cluster.svg", imgAlt: "Cluster", text: "Cluster"},
        {link: "/menus/billing", imgSrc: "/src/icons/billing.svg", imgAlt: "Billing", text: "Billing"},
        {link: "/menus/download", imgSrc: "/src/icons/download.svg", imgAlt: "Download", text: "Download"},
        {link: "/menus/order", imgSrc: "/src/icons/order.svg", imgAlt: "Order", text: "Order"}
    ];

    const bottomMenuItems = [
        {link: "/menus/account", imgSrc: "/src/icons/account.svg", imgAlt: "Account", text: "Account"},
        {link: "/auth/logout", imgSrc: "/src/icons/logout.svg", imgAlt: "Logout", text: "Logout"}
    ];

    return (
        <aside
            className={`bg-blue text-white space-y-6 pt-7 pb-2 px-2 h-screen relative flex justify-between flex-col transition-all duration-500 ease-in-out ${sidebarClass}`}>

            <Link to={"/monitor"}
                  className="text-white flex px-1 items-center absolute transition-opacity duration-500"
                  onClick={toggleSidebar}>
                <img
                    src="/src/icons/logos/logo-full.svg"
                    alt="OneKonsole"
                    className={`transition-opacity duration-500 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
                </img>
                <img
                    src="/src/icons/logos/logo-short.svg"
                    alt="OneKonsole"
                    className={`absolute transition-opacity duration-500 ${collapsed ? 'opacity-100' : 'opacity-0'}`}>
                </img>

                <hr className={""}></hr>

            </Link>

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