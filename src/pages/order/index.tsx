import React, {useEffect, useState} from "react";
import {InputType, SchemaIconType} from "@/type.ts";
import arrowRightIcon from "@assets/icons/arrow-right.svg";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import InputField from "@components/inputs/InputField.tsx";
import ToggleSwitch from "@components/inputs/ToggleSwitch.tsx";
import RangeSlider from "@components/inputs/RangeSlider.tsx";
import InfraSchema from "@components/inputs/InfraSchema.tsx";
import Button from "@components/inputs/Button.tsx";

const Order: React.FC = () => {

    const storageLim = {min: 0, max: 100};
    const [clusterName, setClusterName] = useState("");

    const [storageMonitoringValue, setStorageMonitoringValue] = useState(0);
    const [storageImgValue, setStorageImgValue] = useState(0);

    const [monitoringChecked, setMonitoringChecked] = useState(false);
    const [alertingChecked, setAlertingChecked] = useState(false);

    const [nextStepAllowed, setNextStepAllowed] = useState(false);

    /**
     * Check if the next step is allowed
     */
    useEffect(() => {
        if (
            storageMonitoringValue === 0
            || storageImgValue === 0
            || storageMonitoringValue === storageLim.max + 1
            || storageImgValue === storageLim.max + 1
            || clusterName === ""
        ) {
            setNextStepAllowed(false)
        } else {
            setNextStepAllowed(true)
        }
    }, [storageMonitoringValue, storageImgValue, clusterName, storageLim.max])

    /**
     * Handle the next step
     */
    const handleNextStep = () => {
        console.log("Order values :\n" +
            "Cluster name : " + clusterName + "\n" +
            "Control plane : " + true + "\n" +
            "Monitoring : " + monitoringChecked + "\n" +
            "Storage : " + storageMonitoringValue + "\n" +
            "Alerting : " + alertingChecked + "\n"
        )
    }

    return (
        <PanelLayout>
            <div className="flex h-screen">
                <div className="flex bg-gray-light w-1/3 flex-col rounded-r-3xl p-5">
                    <p className="text-lg font-bold text-center my-7">
                        Choose your options
                    </p>

                    <InputField
                        label="Your cluster Name"
                        id="clusterNameInput"
                        type={InputType.text}
                        placeholder="Cluster name"
                        setValue={setClusterName}
                    />

                    <ToggleSwitch
                        id="controlPlaneSwitch"
                        label="Control Plane"
                        description="Allows you to view and interpret your data"
                        checked={true}
                        disabled={true}
                        customParentClass="my-5"
                        onChange={() => {
                        }}
                    />

                    <RangeSlider
                        id="StorageSlider"
                        label="Images Storage"
                        valueUnit="Go"
                        min={storageLim.min}
                        max={storageLim.max}
                        value={storageImgValue}
                        onChange={setStorageImgValue}
                    />

                    <div className="my-5">
                        <label className="block text-gray-dark text-md font-bold mb-5">
                            Nodes
                        </label>
                        <div className="ml-5">

                            <ToggleSwitch
                                id="MonitoringSwitch"
                                label="Monitoring"
                                description="Allows you to view and interpret your data, the storage is the space where your data will be stored"
                                checked={monitoringChecked}
                                disabled={false}
                                customParentClass="my-5"
                                onChange={setMonitoringChecked}
                            />

                            <RangeSlider
                                id="StorageSlider"
                                label="Monitoring Storage"
                                valueUnit="Go"
                                min={storageLim.min}
                                max={storageLim.max}
                                value={storageMonitoringValue}
                                onChange={setStorageMonitoringValue}
                            />
                        </div>
                    </div>

                    <ToggleSwitch
                        id="AlertingSwitch"
                        label="Alerting"
                        description="Allow you to have alerts when something goes wrong"
                        checked={alertingChecked}
                        onChange={setAlertingChecked}
                    />

                    <div className="flex-grow"></div>

                    <div className="flex justify-center mb-7">

                        <Button
                            to="/billing"
                            content={
                                <div className="flex items-center">
                                    <label>Next step</label>
                                    <img
                                        src={arrowRightIcon}
                                        alt=""
                                        className="inline-block ml-4"/>
                                </div>
                            }
                            disabled={!nextStepAllowed}
                            customClass={`${nextStepAllowed ? 'bg-black-full hover:bg-gray-dark' : 'bg-gray'} text-white font-bold py-2 px-4 rounded-3xl`}
                            onClick={handleNextStep}/>
                    </div>
                </div>

                <div className="w-2/3">
                    <InfraSchema
                        kubeIcons={[
                            {
                                iconType: SchemaIconType.api,
                                instances: 1,
                            },
                            {
                                iconType: SchemaIconType.cm,
                                instances: 1,
                            },
                            {
                                iconType: SchemaIconType.scheduler,
                                instances: 1,
                            },

                        ]}
                        externIcons={[
                            {
                                iconType: SchemaIconType.etcd,
                                instances: 1,
                            },
                            {
                                iconType: SchemaIconType.harbor,
                                instances: 1,
                            },
                        ]}
                        toolsIcons={
                            alertingChecked ?
                                [
                                    {
                                        iconType: SchemaIconType.graphLoki,
                                        instances: 1,
                                    },
                                    {
                                        iconType: SchemaIconType.prometheus,
                                        instances: 1,
                                    },
                                ] : undefined
                        }
                        storageIcons={[
                            {
                                iconType: SchemaIconType.imgStorage,
                                instances: 1,
                                value: storageImgValue === storageLim.max + 1 ? "" : storageImgValue + " Go",
                            },
                            {
                                iconType: SchemaIconType.monitoringStorage,
                                instances: monitoringChecked ? 1 : 0,
                                value: storageMonitoringValue === storageLim.max + 1 ? "" : storageMonitoringValue + " Go",

                            },
                        ]}
                    />
                </div>
            </div>
        </PanelLayout>
    );
}

export default Order;