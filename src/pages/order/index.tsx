import React, {useEffect, useState} from "react";
import {AcceptedCurrency, FixedPrices, InputType, OrderInfos, SchemaIconType} from "@/type.ts";
import arrowRightIcon from "@assets/icons/arrow-right.svg";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import InputField from "@components/inputs/InputField.tsx";
import ToggleSwitch from "@components/inputs/ToggleSwitch.tsx";
import RangeSlider from "@components/inputs/RangeSlider.tsx";
import InfraSchema from "@components/inputs/InfraSchema.tsx";
import PaypalCheckout from "@components/specifics/billing/PaypalCheckout.tsx";
import {getPrices} from "@/requests/billingRequests.ts";

const Order: React.FC = () => {


    const [prices, setPrices] = useState<FixedPrices | undefined>(undefined);
    const [orderInfo, setOrderInfo] = useState<OrderInfos | undefined>(undefined);

    const storageLimMonitor = {min: 5, max: 100};
    const storageLimImg = {min: 5, max: 100};
    const [clusterName, setClusterName] = useState("");

    const [storageMonitoringValue, setStorageMonitoringValue] = useState(storageLimMonitor.min);
    const [storageImgValue, setStorageImgValue] = useState(storageLimImg.min);

    const [monitoringChecked, setMonitoringChecked] = useState(false);
    const [alertingChecked, setAlertingChecked] = useState(false);

    const [checkoutAllowed, setCheckoutAllowed] = useState(false);
    const [isCheckingOrder, setIsCheckingOrder] = useState(false);

    /**
     * Check if the checkout is allowed
     */
    useEffect(() => {
        if (
            storageMonitoringValue === 0
            || storageImgValue === 0
            || storageMonitoringValue === storageLimMonitor.max + 1
            || storageImgValue === storageLimImg.max + 1
            || clusterName === ""
        ) {
            setCheckoutAllowed(false)
        } else {
            setCheckoutAllowed(true)
        }
    }, [storageMonitoringValue, storageImgValue, clusterName, storageLimMonitor.max, storageLimImg.max])

    /**
     * Handle the checkout
     */
    const handleCheckout = () => {

        const orderInfos: OrderInfos = {
            clusterName: clusterName,
            imagesStorage: storageImgValue,
            monitoringOption: monitoringChecked,
            monitoringStorage: monitoringChecked ? storageMonitoringValue : 0,
            alertingOption: monitoringChecked ? alertingChecked : false,
        }

        setOrderInfo(orderInfos);
        setIsCheckingOrder(true);

        getPrices().then((resp) => {
            setPrices(resp);
        }).catch((err) => {
            console.log(err);
        });
    }

    /**
     * Get the sum of the order based on the order infos and the prices
     */
    const getSum = (): number | undefined => {
        if (prices && orderInfo) {
            let sum = prices.basic;
            sum += prices.ImgStoragePrice_Unit * orderInfo.imagesStorage;
            if (monitoringChecked) {
                sum += prices.MonitoringOption;
                sum += prices.MonitoringStoragePrice_Unit * orderInfo.monitoringStorage;
            }
            if (alertingChecked) {
                sum += prices.alertingOption;
            }
            return sum;
        }
        return undefined;
    }


    return (
        <PanelLayout>
            <div className="flex h-fit">
                {!isCheckingOrder ? (
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

                            <button
                                disabled={!checkoutAllowed}
                                className={`${checkoutAllowed ? 'bg-black-full hover:bg-gray-dark' : 'bg-gray'} mt-5 text-white font-bold py-2 px-4 rounded-3xl`}
                                onClick={handleCheckout}>
                                <div className="flex items-center">
                                    <label>Checkout</label>
                                    <img
                                        src={arrowRightIcon}
                                        alt=""
                                        className="inline-block ml-4"/>
                                </div>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex bg-gray-light w-1/3 min-h-screen max-h-fit flex-col rounded-r-3xl p-5">

                        <p className="text-lg font-bold text-center my-7"> Details </p>

                        <div className="flex flex-col">
                            <div className="flex flex-row justify-between text-center">
                                <p className="font-bold"> Cluster Name </p>
                                <p>{orderInfo?.clusterName}</p>
                            </div>

                            <div className="flex flex-row justify-between text-center">
                                <p className="font-bold"> Basic Price </p>
                                <p> {prices?.basic}$</p>
                            </div>

                            <div className="flex flex-row justify-between text-center">
                                <p className="font-bold"> Images storage </p>
                                <p> {orderInfo?.imagesStorage} Go * {prices?.ImgStoragePrice_Unit}$/Go
                                    = {(prices?.ImgStoragePrice_Unit ?? 0) * (orderInfo?.imagesStorage ?? 0)}$
                                </p>
                            </div>

                            {monitoringChecked &&
                                <div className="flex flex-row justify-between text-center">
                                    <p className="font-bold"> Monitoring </p>
                                    <p> {orderInfo?.monitoringStorage} Go * {prices?.MonitoringStoragePrice_Unit}$/Go
                                        = {(prices?.MonitoringStoragePrice_Unit ?? 0) * (orderInfo?.monitoringStorage ?? 0)}$
                                    </p>
                                </div>
                            }

                            {alertingChecked &&
                                <div className="flex flex-row justify-between text-center">
                                    <p className="font-bold"> Alerting </p>
                                    <p> {prices?.alertingOption}$ </p>
                                </div>
                            }
                        </div>

                        <div className="flex flex-col my-7">
                            <p className="text-lg font-bold text-center">
                                Initial Price : {getSum()}$/month *
                            </p>
                            <p className="text-sm text-center">
                                * Price may increase depending on your usage of logs and metrics
                            </p>
                        </div>
                        <PaypalCheckout
                            amount={getSum() ?? 0}
                            currency={AcceptedCurrency.USD}
                        />
                    </div>
                )};


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