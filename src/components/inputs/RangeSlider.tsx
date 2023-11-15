import React, {useState} from 'react';

interface NumericSliderProps {
    id: string;
    label: string;
    valueUnit: string;
    min: number;
    max: number;
    value?: number;
    customParentClass?: string;
    onChange: (value: number) => void;
}

const RangeSlider: React.FC<NumericSliderProps> = ({
                                                       id,
                                                       label,
                                                       valueUnit,
                                                       min,
                                                       max,
                                                       value: initialValue,
                                                       customParentClass,
                                                       onChange
                                                   }) => {
    const [value, setValue] = useState<number>(initialValue || min);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        onChange(newValue);
    };

    // Function to determine the display text
    const displayValue = (value: number) => {
        if (value === max + 1) {
            return "On request!";
        }
        return `${value} ${valueUnit}`;
    };

    return (

        <div className={`flex flex-col ${customParentClass}`}>

            <label className="block text-gray-dark text-sm font-bold ml-2 mb-2" htmlFor={id}>
                {label}
            </label>

            <div className="flex flex-col space-y-2">

                <input
                    type="range"
                    min={min}
                    max={max + 1}
                    value={value}
                    onChange={handleChange}
                    className="range range-primary"
                />
                <output className="self-center">
                    {displayValue(value)}
                </output>
            </div>
        </div>
    );
};

export default RangeSlider;