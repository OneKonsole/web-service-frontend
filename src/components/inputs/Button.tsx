import {Link} from "react-router-dom";
import React from "react";

/**
 * Props interface for the Button component
 * @interface Props
 * @param to the link to be navigated to
 * @param text the text to be displayed
 * @param borderColor the border color of the button
 * @param hoverColor the hover color of the button
 */
type Props = {
    to: string;
    text: string;
    borderColor: string | null | undefined;
    hoverColor: string | null | undefined;
    customClass?: string;
}

/**
 * Button component is used to render a button
 * @param to the link to be navigated to
 * @param text the text to be displayed
 * @param borderColor the border color of the button
 * @param hoverColor the hover color of the button
 * @param customClass
 * @constructor React.FC<Props>
 */
const Button: React.FC<Props> = ({to, text, borderColor, hoverColor, customClass}: Props) => (
    <Link to={to}>
        <button
            {
                ...customClass ? {className: customClass} : {
                    className: `text-gray-dark py-2 px-4 mr-4 border-b-2 ${borderColor} ${hoverColor}`
                }
            }
            type="submit"
        >
            {text}
        </button>
    </Link>
);

export default Button;