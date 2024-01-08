import React, {useEffect, useState} from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import Button from "@components/inputs/Button.tsx";
import InputField from "@components/inputs/InputField.tsx";
import {InputType, Option, UserInfo} from "@/type.ts";

import defaultAvatar from "@assets/icons/default-avatar.svg";
import {useAuth} from "@context/AuthContext.tsx";
import {getUserInfo, updateUserInfo} from "@utils/auth.ts";

const Account: React.FC = () => {

    const {token} = useAuth();
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        getUserInfo({token})
            .then((res) => {
                setId(res.sub);
                setFirstName(res.given_name);
                setLastName(res.family_name);
                setEmail(res.email);
                setPhone(res?.phone);
                setCompany(res?.company);
                setRole(res?.role);
                setCountry(res?.country);

                console.log("User ID : " + res.sub + " - " + id)
            })
            .catch((er) => {
                console.log(er)
            })
    }, [token]);
    const [, setSelectedFile] = React.useState<File | null>(null);

    // Handler for file selection or drop
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            // TODO: Handle the file upload logic here
        }
    };

    // Handler for file drop
    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
            // TODO: Handle the file upload logic here
        }
    };

    // Prevent default behavior (Prevent file from being opened)
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleSave = (): void => {
        const userInfo = {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            company: company,
            role: role,
            country: country
        }

        console.log(userInfo)

        updateUserInfo(token, userInfo)
            .then((res) => {
                console.log(res)
            })
            .catch((er) => {
                console.log(er)
            })

        console.log(userInfo)
    };

    return (
        <PanelLayout>
            <div className="px-11">
                <div className="mx-2 flex items-center justify-between mt-14">
                    <div className="flex justify-start flex-col items-start">

                        <h2 className="text-2xl text-gray-dark">
                            Account
                        </h2>
                        <p className="text-sm text-gray">
                            Update your photo and your personal information
                        </p>

                    </div>
                    <div className="flex justify-center items-center">
                        <Button
                            content="Cancel"
                            customClass="text-gray-dark py-2 px-4 mr-4 rounded-md border border-gray hover:border-blue hover:text-blue"
                            to=''
                        />
                        <Button
                            content="Save"
                            customClass="text-white py-2 px-4 rounded-md bg-blue hover:bg-blue-light"
                            to=''
                            onClick={() => {
                                handleSave()
                            }}
                        />
                    </div>
                </div>

                <hr className="mx-2 my-2 border-gray"/>

                <div className="mx-2 flex items-center justify-between relative">
                    <h2 className="text-xl text-gray-dark">
                        Name
                    </h2>
                    <div className="flex justify-center items-center gap-2">
                        <InputField
                            label={null}
                            id="firstname"
                            type={InputType.text}
                            placeholder={firstName ? firstName : 'First name'}
                            value={firstName}
                            setValue={setFirstName}
                            customClass="w-96 appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <InputField
                            label={null}
                            id="lastname"
                            type={InputType.text}
                            placeholder={lastName ? lastName : 'Last name'}
                            customClass="w-96 appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                            value={lastName}
                            setValue={setLastName}
                        />
                    </div>
                </div>
                <hr className="mx-2 my-2 border-gray"/>

                <div className="mx-2 flex items-center justify-between relative">
                    <h2 className="text-xl text-gray-dark">
                        Email
                    </h2>
                    <div className="flex justify-center items-center gap-2">
                        <InputField
                            label={null}
                            id="email"
                            type={InputType.text}
                            placeholder={email ? email : 'Email'}
                            customClass="w-96 appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            setValue={setEmail}
                        />
                    </div>
                </div>

                <hr className="mx-2 my-2 border-gray"/>

                <div className="mx-2 flex items-center justify-between relative">
                    <div className="flex flex-col justify-center">
                        <h2 className="text-xl text-gray-dark mb-2">
                            Profile picture
                        </h2>
                        <p className="text-sm text-gray mb-4">
                            This will be displayed on your profile
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-2 ml-8" id="picture-render">
                        <img src={defaultAvatar} alt="Profile" className="rounded-full h-20 w-20"/>
                    </div>
                    <div
                        className="flex-grow flex flex-col items-center justify-center border rounded border-gray px-4 py-8 ml-8"
                        id="picture-upload"
                        onDragOver={handleDragOver}
                        onDrop={handleFileDrop}
                    >
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/svg+xml, image/png, image/jpeg"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload"
                               className="flex flex-col items-center justify-center cursor-pointer">
                            <img src="https://placehold.co/400x400" alt="Profile" className="rounded-full h-12 w-12"/>
                            <p className="text-sm text-gray text-center mt-4">
                                <span className="text-blue hover:underline">
                                    Click to Upload&nbsp;
                                </span>
                                or drag and drop your photo (SVG, PNG, JPG)
                            </p>
                        </label>
                    </div>
                </div>

                <hr className="mx-2 my-2 border-gray"/>

                <div className="mx-2 flex items-center justify-between relative">
                    <h2 className="text-xl text-gray-dark align-middle">
                        Your company
                    </h2>
                    <div className="flex justify-center items-center gap-2">
                        <InputField
                            label={null}
                            id="role"
                            type={InputType.text}
                            customClass="w-96 appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                            placeholder={company ? company : 'Google, Amazon, Meta..."'}
                            value={company}
                            setValue={setCompany}
                        />
                    </div>
                </div>

                <hr className="mx-2 my-2 border-gray"/>

                <div className="mx-2 flex items-center justify-between relative">
                    <h2 className="text-xl text-gray-dark align-middle">
                        Country
                    </h2>
                    <div className="flex justify-center items-center gap-2">
                        <InputField
                            label={null}
                            id="country"
                            type={InputType.select}
                            options={[
                                {value: 'France', text: 'France'},
                                {value: 'Germany', text: 'Germany'},
                                {value: 'United Kingdom', text: '"United Kingdom'},
                                {value: 'United States', text: '"United States'},
                                {value: 'Canada', text: 'Canada'},
                                {value: 'Australia', text: 'Australia'},
                                {value: 'Japan', text: 'Japan'},
                                {value: 'China', text: 'China'},
                                {value: 'India', text: 'India'},
                                {value: 'Russia', text: 'Russia'}
                            ] as Option[]}
                            customClass="w-96 appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Country"
                            value={country}
                            setValue={setCountry}
                        />
                    </div>
                </div>

                <hr className="mx-2 my-2 border-gray"/>
                <div className="flex justify-end items-center">
                    <Button
                        content="Cancel"
                        customClass="text-gray-dark py-2 px-4 mr-4 rounded-md border border-gray hover:border-blue hover:text-blue"
                        to=''
                    />
                    <Button
                        content="Save"
                        customClass="text-white py-2 px-4 rounded-md bg-blue hover:bg-blue-light"
                        to=''
                        onClick={() => {
                            handleSave()
                        }}
                    />
                </div>
            </div>
        </PanelLayout>
    );
}

export default Account;