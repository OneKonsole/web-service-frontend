import React from 'react';

interface ToggleSwitchProps {
    id: string;
    label: string;
    description: string;
    checked?: boolean;
    disabled?: boolean;
    customParentClass?: string;
    onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = (
    {
        label,
        description,
        id,
        checked ,
        disabled = false,
        customParentClass,
        onChange
    }) => {

    // Handle the change event
    const handleToggle = () => {
        if (!disabled) {
            onChange(!checked);
        }
    };

    return (
        <div className={`flex flex-col ${customParentClass}`}>
            <div>
                <div className="flex items-center mb-2">
                    <label htmlFor={id} className="flex items-center cursor-pointer">
                        <div className="relative">

                            <input
                                id={id}
                                type="checkbox"
                                className="sr-only"
                                checked={checked}
                                onChange={handleToggle}
                                disabled={disabled}
                            />

                            <div className={`block w-9 h-5 rounded-full  
                            ${checked ? `${disabled ? 'bg-blue-light-light' : 'bg-blue'}` : 'bg-gray'}`}/>
                            <div className={`dot absolute bg-white left-0.5 top-0.5 w-4 h-4 rounded-full transition 
                        ${checked ? 'transform translate-x-full bg-blue-500' : ''}`}/>
                        </div>
                    </label>

                    <label className="block text-gray-dark text-sm font-bold ml-2" htmlFor={id}>
                        {label}
                    </label>
                </div>
                <label className="block text-gray-light-dark text-sm" htmlFor={id}>
                    {description}
                </label>
            </div>
        </div>
    );
};

export default ToggleSwitch;
