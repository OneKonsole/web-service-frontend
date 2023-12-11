import React, {useEffect, useState} from 'react';
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';
import {confirmOrder, createOrder} from "@/requests/billingRequests.js";
import {FixedPrices, OrderInfos} from "@/type.ts";
import {useAuth} from "@context/AuthContext.tsx";

const initialOptions = {
    clientId: "AQaC8NCUwYIr1c9KY_7-qWf6JpBaUwaJ6ncFqFsJbq_89gviTwvOAPAgbyWpLuMHClr0zwgLPbbMSG5h",
    currency: "USD",
};

type PayPalPaymentProps = {
    amount: number;
    orderInfos: OrderInfos;
    fixedPrices: FixedPrices;
    setOrderCompleted: (value: boolean) => void;
};

const PayPalPayment: React.FC<PayPalPaymentProps> = ({orderInfos, amount, setOrderCompleted}) => {

    const [orderID, setOrderID] = useState<string | undefined>(undefined);
    const [isProcessing, setIsProcessing] = useState(false);

    // Get the user id from the token
    const {token} = useAuth();

    const createOrderP = () => {
        if (!token) {
            return;
        }
        return new Promise((resolve) => {
            setIsProcessing(true);
            createOrder(token, orderInfos, amount, initialOptions.currency).then((res) => {
                setOrderID(res);
                resolve(res);
            });
        });
    };

    // use effect on orderID
    useEffect(() => {
        console.log("orderID", orderID)
    }, [orderID])


    const onApprove = (data, actions) => {

        console.log("onApprove", data, actions)

        if (!token) {
            return;
        }
        return actions.order.capture().then((res) => {
            console.log("res", res)

            confirmOrder(token, res.id).then(() => {
                setIsProcessing(false);
                setOrderCompleted(true);
            });
        });
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={createOrderP}
                onApprove={onApprove}
                disabled={isProcessing}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalPayment;
