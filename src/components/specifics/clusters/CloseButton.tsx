import React from "react";

type Props = {
    onClick: () => void
}

/**
 * Component to display a close button in the cluster details
 * @param onClick the function to call when the button is clicked
 */
const CloseButton: React.FC<Props> = ({onClick}: Props) => {
    return (
        <div className="absolute top-0 right-0 cursor-pointer hover:bg-gray-light rounded-full p-1 mt-1 mr-1"
             onClick={onClick}>
            <svg className="hover:stroke-red stroke-black-full" width="25" height="25" viewBox="0 0 25 25"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M18.8015 6.38403L6.80151 18.384" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"/>
                <path d="M6.80151 6.38403L18.8015 18.384" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"/>
            </svg>
        </div>
    );
};
export default CloseButton;