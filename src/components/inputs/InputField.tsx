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
    disableFirstOption?: boolean;
    parentCustomClass?: string;
    customClass?: string;
    value?: string;
    setValue?: (value: string) => void;
}

/**
 * InputField component is used to render an input field
 * @param label the label of the input field
 * @param id the id of the input field
 * @param type the type of the input field
 * @param placeholder the placeholder of the input field
 * @param options the options of the input field
 * @param disableFirstOption the option to disable the first option of the input field
 * @param parentCustomClass the custom class of the parent div
 * @param customClass the custom class of the input field
 * @param setValue the function to set the value of the input field
 * @param value the value of the input field
 * @constructor React.FC<Props>
 */
const InputField: React.FC<Props> = ({
                                         label,
                                         id,
                                         type,
                                         placeholder,
                                         options,
                                         disableFirstOption,
                                         parentCustomClass,
                                         customClass,
                                         setValue,
                                         value
                                     }: Props) => {

    if (type === InputType.select) {

        return (
            <div className={parentCustomClass ? parentCustomClass : 'mb-4 w-full'}>
                <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor={id}>
                    {label}
                </label>
                <select
                    {...customClass ? {className: customClass} : {
                        className: `appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline`
                    }}
                    id={id}
                    onChange={(event) => {
                        if (setValue) {
                            setValue(event.target.value)
                        }
                    }}
                >
                    {
                        options?.map((option: Option, index: number) => (
                            <option
                                value={option.value}
                                key={option.value}
                                disabled={disableFirstOption && index === 0}
                                {...option.text === value ? {selected: true} : {}}
                            >
                                {option.text}
                            </option>
                        ))
                    }
                </select>
            </div>
        )
    }

    return (
        <div className={parentCustomClass ? parentCustomClass : 'mb-4 w-full'}>
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
                value={value}
            />
        </div>
    )
}

export default InputField;