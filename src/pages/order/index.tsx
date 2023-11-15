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
    const [storageValue, setStorageValue] = useState(0);

    const [ctrlPlaneChecked, setCtrlPlaneChecked] = useState(false);
    const [ctrlPlaneDisabled, setCtrlPlaneDisabled] = useState(false);
    const [monitoringChecked, setMonitoringChecked] = useState(false);
    const [monitoringDisabled, setMonitoringDisabled] = useState(false);
    const [alertingChecked, setAlertingChecked] = useState(false);

    const [nextStepAllowed, setNextStepAllowed] = useState(false);

    /**
     * Check if the next step is allowed
     */
    useEffect(() => {
        if (
            storageValue === 0
            || storageValue === storageLim.max + 1
            || clusterName === ""
        ) {
            setNextStepAllowed(false)
        } else {
            setNextStepAllowed(true)
        }
    }, [storageValue, clusterName, storageLim.max])

    /**
     * Handle the switch state change for the control plane and monitoring
     * @param controlPlaneValue true if the control plane is checked, false otherwise
     * @param monitoringValue true if the monitoring is checked, false otherwise
     */
    const handleSwitch = (controlPlaneValue: boolean, monitoringValue: boolean) => {
        setCtrlPlaneChecked(controlPlaneValue);
        setMonitoringChecked(monitoringValue);
    };

    /**
     * Handle the switch state change for the control plane and monitoring
     */
    useEffect(() => {
        if (ctrlPlaneChecked && monitoringChecked) {
            setCtrlPlaneDisabled(true);
            setMonitoringDisabled(false);
        } else if (ctrlPlaneChecked && !monitoringChecked) {
            setCtrlPlaneDisabled(false);
            setMonitoringDisabled(false);
        } else if (!ctrlPlaneChecked && monitoringChecked) {
            setCtrlPlaneChecked(true);
            setCtrlPlaneDisabled(true);
            setMonitoringDisabled(false);
        } else {
            setCtrlPlaneDisabled(false);
            setMonitoringDisabled(false);
        }
    }, [ctrlPlaneChecked, monitoringChecked]);

    return (
        <PanelLayout>
            <div className="flex h-screen">
                <div className="flex bg-light-gray w-1/3 flex-col rounded-r-3xl p-5">
                    <p className={"text-lg font-bold text-center my-7"}>
                        Choose your options
                    </p>

                    <InputField
                        label={"Your cluster Name"}
                        id={"clusterNameInput"}
                        type={InputType.text}
                        placeholder={"Cluster name"}
                        setValue={setClusterName}
                    />

                    <ToggleSwitch
                        id={"controlPlaneSwitch"}
                        label={"Control Plane"}
                        description={"Allows you to view and interpret your data"}
                        checked={ctrlPlaneChecked}
                        disabled={ctrlPlaneDisabled}
                        customParentClass={"my-5"}
                        onChange={(checked: boolean) => {
                            handleSwitch(checked, monitoringChecked)
                        }}
                    />

                    <div className={"my-5"}>
                        <label className="block text-gray-dark text-md font-bold mb-5">
                            Nodes
                        </label>
                        <div className="ml-5">

                            <ToggleSwitch
                                id={"MonitoringSwitch"}
                                label={"Monitoring"}
                                description={"Allows you to view and interpret your data"}
                                checked={monitoringChecked}
                                disabled={monitoringDisabled}
                                customParentClass={"my-5"}
                                onChange={(checked: boolean) => {
                                    handleSwitch(ctrlPlaneChecked, checked)
                                }}
                            />

                            <RangeSlider
                                id={"StorageSlider"}
                                label={"Storage"}
                                valueUnit={"Go"}
                                min={storageLim.min}
                                max={storageLim.max}
                                value={storageValue}
                                onChange={setStorageValue}
                            />
                        </div>
                    </div>

                    <ToggleSwitch
                        id={"AlertingSwitch"}
                        label={"Alerting"}
                        description={"Allow you to have alerts when something goes wrong"}
                        checked={alertingChecked}
                        onChange={setAlertingChecked}
                    />

                    <div className="flex-grow"></div>

                    <div className="flex justify-center mb-7">

                        <Button
                            to={"/billing"}
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
                            onClick={() => {
                                console.log("Order values :\n" +
                                    "Cluster name : " + clusterName + "\n" +
                                    "Control plane : " + ctrlPlaneChecked + "\n" +
                                    "Monitoring : " + monitoringChecked + "\n" +
                                    "Storage : " + storageValue + "\n" +
                                    "Alerting : " + alertingChecked + "\n"
                                )
                            }}/>
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
                        toolsIcons={[
                            {
                                iconType: SchemaIconType.graphLoki,
                                instances: 1,
                            },
                            {
                                iconType: SchemaIconType.prometheus,
                                instances: 1,
                            },
                        ]}
                        externIcons={[
                            {
                                iconType: SchemaIconType.etcd,
                                instances: 1,
                            },
                        ]}
                    />
                </div>
            </div>
        </PanelLayout>
    );
}

export default Order;