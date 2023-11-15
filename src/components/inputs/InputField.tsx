import React from "react";
import {InputType, Option} from "@/type.ts";

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
    type: InputType;
    placeholder: string;
    options?: Option[];
    customClass?: string;
    setValue?: (value: string) => void;
}

/**
 * InputField component is used to render an input field
 * @param label the label of the input field
 * @param id the id of the input field
 * @param type the type of the input field
 * @param placeholder the placeholder of the input field
 * @param options the options of the input field
 * @param customClass the custom class of the input field
 * @constructor React.FC<Props>
 */
const InputField: React.FC<Props> = ({label, id, type, placeholder, options, customClass, setValue}: Props) => {

    if (type === InputType.select) {
        return (
            <div className="mb-4">
                <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor={id}>
                    {label}
                </label>
                <select
                    {...customClass ? {className: customClass} : {
                        className: `appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline`
                    }
                    }
                    id={id}
                    placeholder={placeholder}
                >
                    {
                        options?.map((option: Option) => (
                            <option value={option.value} key={option.value}>
                                {option.text}
                            </option>
                        ))
                    }
                </select>
            </div>
        )
    }

    return (
        <div className="mb-4">
            <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                {...customClass ? {className: customClass} : {
                    className: `appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline`
                }
                }
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={(event) => {
                    if (setValue) {
                        setValue(event.target.value)
                    }
                }}
            />
        </div>
    )
}

export default InputField;