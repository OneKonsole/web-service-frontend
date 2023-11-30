import React from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import {InputType, PostalAddress} from "@/type.ts";
import InputField from "@components/inputs/InputField.tsx";
import Button from "@components/inputs/Button.tsx";
import CountriesList from "@ressources/countries.json";
import {getUserBillingPostalAddress, updateUserBillingAddress} from "@/requests/billingRequests.ts";
import {useNavigate} from "react-router";

const EditBillingAddress: React.FC = () => {

    const navigate = useNavigate();
    const [address, setAddress] = React.useState<PostalAddress>();
    const [fullFilled, setFullFilled] = React.useState<boolean>(false);

    if (!address) {
        getUserBillingPostalAddress()
            .then((resp) => {
                if (resp) {
                    setAddress(resp);
                }
            }).catch((err) => {
            console.log(err);
        });
    }

    /**
     * Check if all fields are filled
     */
    React.useEffect(() => {

        const countryOk = address?.country !== '- Select your country -';

        if (address?.name && address?.street && address?.zipCode && address?.city && countryOk) {
            setFullFilled(true);
        } else {
            setFullFilled(false);
        }
    }, [address]);

    const handleSubmit = () => {

        if (!fullFilled) {
            alert('Please fill all the fields');
            return;
        }

        if (address) {
            updateUserBillingAddress(address).then(() => {
                alert('Address updated');
                navigate('/billing');
            });

        }
    }


    const inputFieldCommonClass = 'border-2 border-gray-light rounded-md px-2 py-1';

    return (
        <PanelLayout>
            <div className="flex h-screen items-center justify-center p-5">

                <div className="flex flex-col w-full mt-5 items-center">
                    <label className="text-xl font-bold text-left pb-10">
                        Update your billing address
                    </label>

                    <div className="border-2 border-gray-light p-10 shadow rounded-3xl ">

                        <InputField
                            id="CompanyOrName"
                            label="Your name or your company name"
                            value={address?.name || ''}
                            setValue={(value) => {
                                if (address) {
                                    setAddress({...address, name: value});
                                }
                            }}
                            type={InputType.text}
                            placeholder="Name"
                            customClass={`${inputFieldCommonClass} w-full`}
                        />

                        <InputField
                            id="street"
                            label="Street"
                            value={address?.street || ''}
                            setValue={(value) => {
                                if (address) {
                                    setAddress({...address, street: value});
                                }
                            }}
                            type={InputType.text}
                            placeholder="Street"
                            customClass={`${inputFieldCommonClass} w-full`}
                        />

                        <div className='flex flex-row'>
                            <InputField
                                id="ZIP code"
                                label="ZIP code"
                                value={address?.zipCode || ''}
                                setValue={(value) => {
                                    if (address) {
                                        setAddress({...address, zipCode: value});
                                    }
                                }}
                                type={InputType.number}
                                placeholder="ZIP code"
                                customClass={`${inputFieldCommonClass} w-full`}
                                parentCustomClass='mb-4 mr-4 w-full'
                            />
                            <InputField
                                id="city"
                                label="City"
                                value={address?.city || ''}
                                setValue={(value) => {
                                    if (address) {
                                        setAddress({...address, city: value});
                                    }
                                }}
                                type={InputType.text}
                                placeholder="City"
                                customClass={`${inputFieldCommonClass} mr-4 w-full`}
                            />
                        </div>

                        <div className='flex flex-row items-center'>
                            <InputField
                                id="state-region"
                                label="State / Region"
                                value={address?.stateRegion || ''}
                                setValue={(value) => {
                                    if (address) {
                                        setAddress({...address, stateRegion: value});
                                    }
                                }}
                                type={InputType.text}
                                placeholder="State / Region, ..."
                                customClass={`${inputFieldCommonClass} w-full`}
                                parentCustomClass='mb-4 mr-4 w-full'
                            />

                            <InputField
                                label="Country"
                                type={InputType.select}
                                id="country"
                                placeholder="Country"
                                disableFirstOption={true}
                                options={
                                    CountriesList.map((country) => ({
                                        value: country.shortName,
                                        text: country.name
                                    }))
                                }
                                value={address?.country || ''}
                                setValue={(value) => {
                                    if (address) {
                                        setAddress({...address, country: value});
                                    }
                                }}
                                customClass={`${inputFieldCommonClass} w-full h-full`}
                            />
                        </div>

                        <div className='flex justify-center'>
                            <Button
                                to={''}
                                content={'Update your address'}
                                disabled={!fullFilled}
                                customClass={`${!fullFilled ? 'bg-gray' : 'bg-blue'} text-white font-bold py-2 px-4 rounded-full mt-4`}
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
};

export default EditBillingAddress;