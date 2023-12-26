import React, {useState} from 'react';
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js';
import {confirmOrderPayment, createOrderOnServer} from "@/requests/billingRequests.js";
const initialOptions = {
    clientId: "AQaC8NCUwYIr1c9KY_7-qWf6JpBaUwaJ6ncFqFsJbq_89gviTwvOAPAgbyWpLuMHClr0zwgLPbbMSG5h",
    currency: "USD",
};

type PayPalPaymentProps = {
    amount: number;
    currency: string;
};

const PayPalPayment: React.FC<PayPalPaymentProps> = ({amount, currency}) => {
    const [orderID, setOrderID] = useState<string | undefined>(undefined);
    const [isProcessing, setIsProcessing] = useState(false);

    // Simuler la création d'une commande sur le serveur
    const createOrder = async () : Promise<string> => {

        setIsProcessing(true);
        return new Promise((resolve, reject) => {
            createOrderOnServer(amount, currency).then((orderId) => {
                setOrderID(orderId);
                setIsProcessing(false);
                resolve(orderId);
            }
            ).catch((err) => {
                console.log(err);
                setIsProcessing(false);
                reject(err);
            });
        });
    };

    const onApprove = async () => {
        setIsProcessing(true);
        await confirmOrderPayment(orderID ?? "");
        setIsProcessing(false);
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                disabled={isProcessing}
            />
        </PayPalScriptProvider>
    );
};
export default PayPalPayment;
