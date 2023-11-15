import React from 'react';
import logo from "@assets/logos/logo-full.svg";

/**
 * Props interface for the FormContainer component
 * @interface Props
 * @param children the children of the component
 * @param actionSection the action section of the form
 * @param title the title of the form
 */
type Props = {
    children: React.ReactNode;
    actionSection?: React.ReactNode;
    title: string;
}
/**
 * FormContainer component is used to render a form container
 * @param children the children of the component
 * @param title the title of the form
 * @param actionSection the action section of the form
 * @constructor React.FC<Props>
 */
const FormContainer: React.FC<Props> = ({children, title, actionSection}: Props) => {
    return (
        <div className="max-w-xs w-full mb-6 flex flex-col">
            <div className="flex items-center justify-center mb-10">
                <img src={logo} alt="logo" className="w-72 filter invert"/>
            </div>
            <h1 className="text-center text-2xl font-light text-gray-dark mb-8 uppercase">{title}</h1>
            <div className="flex-grow">
                {children}
            </div>
            <div className="mt-8">
                {actionSection}
            </div>
        </div>
    );
};

export default FormContainer;
