import React from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import {PayPalInfo} from "@/type.ts";
import {getUserBillingPayPalInfo} from "@/requests/billingRequests.ts";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {PayPalScriptOptions} from "@paypal/paypal-js/types/script-options";


const paypalScriptOptions: PayPalScriptOptions = {
    "client-id":
        "AQaC8NCUwYIr1c9KY_7-qWf6JpBaUwaJ6ncFqFsJbq_89gviTwvOAPAgbyWpLuMHClr0zwgLPbbMSG5h",
    currency: "USD"
};

const EditPaypalInfos: React.FC = () => {

    const [paypalInfos, setPaypalInfos] = React.useState<PayPalInfo>();

    if (!paypalInfos) {
        getUserBillingPayPalInfo()
            .then((resp) => {
                if (resp) {
                    setPaypalInfos(resp);
                }
            }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <PanelLayout>
            <div className="flex h-screen justify-center p-5">

                <div className="flex flex-col w-full mt-5 items-center">
                    <label className="text-xl font-bold text-left pb-10">
                        Connect your PayPal account
                    </label>
                    <div className="border-2 border-gray-light p-10 shadow rounded-3xl ">
                        <label
                            className="flex flex-row space-x-5 items-center mb-5">
                            {paypalInfos?.email}
                        </label>

                        <PayPalScriptProvider options={paypalScriptOptions}>

                            <PayPalButtons
                                // build a button to connect your paypal account or pay with a card
                                style={{layout: "horizontal"}}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: "1.00"
                                                }
                                            }
                                        ]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then(function (details) {
                                        alert('Transaction completed by ' + details.payer.name.given_name);
                                    });
                                }}
                                onError={(err) => {
                                    console.log(err);
                                }}

                            />
                        </PayPalScriptProvider>

                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}

export default EditPaypalInfos;


