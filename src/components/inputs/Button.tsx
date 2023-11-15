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
    content: string | JSX.Element;
    borderColor?: string | null | undefined;
    hoverColor?: string | null | undefined;
    disabled?: boolean;
    customClass?: string;
    onClick?: () => void;
}

/**
 * Button component is used to render a button
 * @param to the link to be navigated to
 * @param content the content to be displayed
 * @param borderColor the border color of the button
 * @param hoverColor the hover color of the button
 * @param customClass the custom class of the button
 * @param onClick the onClick function of the button
 * @param disabled the disabled state of the button
 * @constructor React.FC<Props>
 */
const Button: React.FC<Props> = (
    {
        to,
        content,
        borderColor,
        hoverColor,
        customClass,
        onClick,
        disabled
    }: Props) => (

    <Link to={to}>
        <button
            {
                ...customClass ? {className: customClass} : {
                    className: `text-gray-dark py-2 px-4 mr-4 border-b-2 ${borderColor} ${hoverColor}`
                }
            }
            disabled={disabled}
            onClick={onClick}
            type="submit"
        >
            {content}
        </button>
    </Link>
);

export default Button;