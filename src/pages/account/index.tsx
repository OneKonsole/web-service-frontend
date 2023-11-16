import React from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import Button from "@components/inputs/Button.tsx";
import InputField from "@components/inputs/InputField.tsx";
import {InputType, Option} from "@/type.ts";

import defaultAvatar from "@assets/icons/default-avatar.svg";

const Account: React.FC = () => {

    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

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
                            borderColor={null}
                            hoverColor={null}
                            to={""}
                        />
                        <Button
                            content="Save"
                            customClass="text-white py-2 px-4 rounded-md bg-blue hover:bg-blue-light"
                            to={""}
                            borderColor={null}
                            hoverColor={null}
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
                            placeholder="Firstname"
                            customClass="w-96 appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"

                        />
                        <InputField
                            label={null}
                            id="lastname"
                            type={InputType.text}
                            placeholder="Lastname"
                            customClass="w-96 appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
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
                        <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
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
                        Your role
                    </h2>
                    <div className="flex justify-center items-center gap-2">
                        <InputField
                            label={null}
                            id="role"
                            type={InputType.text}
                            customClass="w-96 appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Product Owner, Cloud Architect..."
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
                                {value: "France", text: "France"},
                                {value: "Germany", text: "Germany"},
                                {value: "United Kingdom", text: "United Kingdom"},
                                {value: "United States", text: "United States"},
                                {value: "Canada", text: "Canada"},
                                {value: "Australia", text: "Australia"},
                                {value: "Japan", text: "Japan"},
                                {value: "China", text: "China"},
                                {value: "India", text: "India"},
                                {value: "Russia", text: "Russia"}
                            ] as Option[]}
                            customClass="w-96 appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Country"
                        />
                    </div>
                </div>

                <hr className="mx-2 my-2 border-gray"/>

                <div className="mx-2 flex items-center justify-between relative">
                    <h2 className="text-xl text-gray-dark align-middle">
                        Timezone
                    </h2>
                    <div className="flex justify-center items-center gap-2">
                        <InputField
                            label={null}
                            id="role"
                            type={InputType.select}
                            options={[
                                {value: "GMT+1", text: "GMT+1"},
                                {value: "GMT+2", text: "GMT+2"},
                                {value: "GMT+3", text: "GMT+3"},
                                {value: "GMT+4", text: "GMT+4"},
                                {value: "GMT+5", text: "GMT+5"},
                                {value: "GMT+6", text: "GMT+6"},
                                {value: "GMT+7", text: "GMT+7"},
                                {value: "GMT+8", text: "GMT+8"},
                                {value: "GMT+9", text: "GMT+9"},
                                {value: "GMT+10", text: "GMT+10"},
                                {value: "GMT+11", text: "GMT+11"},
                                {value: "GMT+12", text: "GMT+12"},
                            ] as Option[]}
                            customClass="w-96 appearance-none border rounded border-gray w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Product Owner, Cloud Architect..."
                        />
                    </div>
                </div>

                <hr className="mx-2 my-2 border-gray"/>
                <div className="flex justify-end items-center">
                    <Button
                        content="Cancel"
                        customClass="text-gray-dark py-2 px-4 mr-4 rounded-md border border-gray hover:border-blue hover:text-blue"
                        borderColor={null}
                        hoverColor={null}
                        to={""}
                    />
                    <Button
                        content="Save"
                        customClass="text-white py-2 px-4 rounded-md bg-blue hover:bg-blue-light"
                        to={""}
                        borderColor={null}
                        hoverColor={null}
                    />
                </div>
            </div>
        </PanelLayout>
    );
}

export default Account;