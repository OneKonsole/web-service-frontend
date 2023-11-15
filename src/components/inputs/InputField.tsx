import React from "react";

/**
 * Props interface for the InputField component
 * @interface Props
 * @param label the label of the input field
 * @param id the id of the input field
 * @param type the type of the input field
 * @param placeholder the placeholder of the input field
 */
type Props = {
    label: string | null;
    id: string;
    type: string;
    placeholder: string;
}

/**
 * InputField component is used to render an input field
 * @param label the label of the input field
 * @param id the id of the input field
 * @param type the type of the input field
 * @param placeholder the placeholder of the input field
 * @constructor React.FC<Props>
 */
const InputField: React.FC<Props> = ({label, id, type, placeholder}: Props) => (
    <div className="mb-4">
        <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor={id}>
            {label}
        </label>
        <input
            className="appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
            id={id}
            type={type}
            placeholder={placeholder}
        />
    </div>
);

export default InputField;