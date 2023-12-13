import React, {useEffect, useState} from "react";
import {InputType, OrderInfos, SchemaIconType} from "@/type.ts";
import arrowRightIcon from "@assets/icons/arrow-right.svg";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import InputField from "@components/inputs/InputField.tsx";
import ToggleSwitch from "@components/inputs/ToggleSwitch.tsx";
import RangeSlider from "@components/inputs/RangeSlider.tsx";
import InfraSchema from "@components/inputs/InfraSchema.tsx";
import Button from "@components/inputs/Button.tsx";

const Order: React.FC = () => {

    const storageLimMonitor = {min: 5, max: 100};
    const storageLimImg = {min: 5, max: 100};
    const [clusterName, setClusterName] = useState("");

    const [storageMonitoringValue, setStorageMonitoringValue] = useState(storageLimMonitor.min);
    const [storageImgValue, setStorageImgValue] = useState(storageLimImg.min);

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
            || storageMonitoringValue === storageLimMonitor.max + 1
            || storageImgValue === storageLimImg.max + 1
            || clusterName === ""
        ) {
            setNextStepAllowed(false)
        } else {
            setNextStepAllowed(true)
        }
    }, [storageMonitoringValue, storageImgValue, clusterName, storageLimMonitor.max, storageLimImg.max])

    /**
     * Handle the next step
     */
    const handleNextStep = () => {

        const orderInfos: OrderInfos = {
            clusterName: clusterName,
            imagesStorage: storageImgValue,
            monitoringOption: monitoringChecked,
            monitoringStorage: monitoringChecked ? storageMonitoringValue : 0,
            alertingOption: monitoringChecked ? alertingChecked : false,
        }
        console.log(orderInfos);
    }

    return (
        <PanelLayout>
            <div className="flex h-fit">
                <div className="flex bg-gray-light w-1/3 min-h-screen max-h-fit flex-col rounded-r-3xl p-5">
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
                        description="Enables or disables the control plane. When enabled, it manages the state and configuration of the cluster. This switch is disabled by default and cannot be altered."
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
                        min={storageLimImg.min}
                        max={storageLimImg.max}
                        value={storageImgValue}
                        onChange={setStorageImgValue}
                    />

                    <ToggleSwitch
                        id="MonitoringSwitch"
                        label="Monitoring"
                        description="Toggle to activate or deactivate monitoring. Monitoring provides insights into the cluster's performance and health metrics. Requires additional storage for data collection."
                        checked={monitoringChecked}
                        customParentClass="my-5"
                        onChange={setMonitoringChecked}
                    />

                    <RangeSlider
                        id="StorageSlider"
                        label="Monitoring Storage"
                        valueUnit="Go"
                        disabled={!monitoringChecked}
                        min={storageLimMonitor.min}
                        max={storageLimMonitor.max}
                        value={storageMonitoringValue}
                        onChange={setStorageMonitoringValue}
                    />

                    <ToggleSwitch
                        id="AlertingSwitch"
                        label="Alerting"
                        description="Turn on or off alerting features. Alerting notifies you of critical issues and anomalies in your cluster, helping with proactive maintenance."
                        disabled={!monitoringChecked}
                        checked={alertingChecked}
                        customParentClass="my-5"
                        onChange={setAlertingChecked}
                    />

                    <div className="flex-grow"></div>

                    <div className="flex justify-center">

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
                            customClass={`${nextStepAllowed ? 'bg-black-full hover:bg-gray-dark' : 'bg-gray'} mt-5 text-white font-bold py-2 px-4 rounded-3xl`}
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
                            monitoringChecked ?
                                [
                                    {
                                        iconType: SchemaIconType.graphLoki,
                                        instances: 1,
                                    },
                                    {
                                        iconType: alertingChecked ? SchemaIconType.prometheusAlert : SchemaIconType.prometheus,
                                        instances: 1,
                                    },
                                ] : undefined
                        }
                        storageIcons={[
                            {
                                iconType: SchemaIconType.imgStorage,
                                instances: 1,
                                value: storageImgValue === storageLimImg.max + 1 ? "" : storageImgValue + " Go",
                            },
                            {
                                iconType: SchemaIconType.monitoringStorage,
                                instances: monitoringChecked ? 1 : 0,
                                value: storageMonitoringValue === storageLimMonitor.max + 1 ? "" : storageMonitoringValue + " Go",

                            },
                        ]}
                    />
                </div>
            </div>
        </PanelLayout>
    );
}

export default Order;