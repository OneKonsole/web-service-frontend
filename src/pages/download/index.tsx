import React from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import Button from "@components/inputs/Button.tsx";

import DiscIcon from "@assets/icons/disc.svg";
import GameIcon from "@assets/icons/game.svg";

const Download: React.FC = () => {

    return (
        <PanelLayout>
            <div className="px-11">
                <div className="mx-2 flex items-center justify-between mt-14">
                    <div className="flex justify-start flex-col items-start">

                        <h2 className="text-2xl text-gray-dark">
                            Download
                        </h2>

                    </div>
                </div>

                <div className="mx-2 flex items-center justify-around relative mt-4">
                    <Button
                        to="#"
                        content={
                            <div className="flex items-center justify-center">
                                <img src={DiscIcon} alt="Disc Icon"
                                     className="w-12 h-12 rounded-full bg-blue text-white bg-opacity-30 p-2"/>
                                <span className="ml-2 text-gray-dark ">
                                ISO
                            </span>
                            </div>
                        }
                        customClass="p-2"
                        borderColor={null}
                        hoverColor={null}
                        onClick={() => {
                            // Add your file download logic here for the first file
                        }}
                    />
                    <Button
                        to="#"
                        content={
                            <div className="flex items-center justify-center">
                                <img src={GameIcon} alt="Game Icon"
                                     className="w-12 h-12 rounded-full bg-orange text-white bg-opacity-30 p-2"/>
                                <span className="ml-2 text-gray-dark ">
                                Binary
                            </span>
                            </div>
                        }
                        customClass="p-2"
                        borderColor={null}
                        hoverColor={null}
                        onClick={() => {
                            // Add your file download logic here for the second file
                        }}
                    />

                </div>
            </div>
        </PanelLayout>
    );
}

export default Download;