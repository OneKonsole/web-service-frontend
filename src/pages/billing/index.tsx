import React from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import PaymentMethod from "@components/billing/PaymentMethod.tsx";
import PaymentAddress from "@components/billing/PaymentAddress.tsx";
import PaymentDisplay from "@components/billing/PaymentDisplay.tsx";
import PaymentHistory from "@components/billing/PaymentHistory.tsx";
import {getUserBillingDetails} from "@/requests/billingRequests.ts";
import {BillingInfo} from "@/type.ts";


const Billing: React.FC = () => {

    const [billingInfo, setBillingInfo] = React.useState<BillingInfo>();

    getUserBillingDetails()
        .then((resp) => {
            if (resp) {
                setBillingInfo(resp);
            }
        }).catch((err) => {
        console.log(err);
    });

    return (
        <PanelLayout>
            <div className="h-screen justify-center p-5">
                <label className="text-xl font-bold text-left ml-5">
                    Your billing details
                </label>
                <div className="flex">
                    <div className="flex flex-col w-2/3 p-5">

                        <div className="flex flex-row space-x-5 mb-5">

                            <PaymentDisplay
                                type="current"
                                onGoingInfo={billingInfo ? billingInfo.onGoingInfo : undefined}
                            />

                            <PaymentDisplay
                                type="next"
                                onGoingInfo={billingInfo ? billingInfo?.onGoingInfo : undefined}
                            />
                        </div>

                        <PaymentHistory
                            PaymentHistory={billingInfo ? billingInfo?.paymentInstances : undefined}
                        />

                    </div>

                    <div className="flex flex-col w-1/3 p-5 border-l-2 border-gray h-auto">

                        <PaymentMethod
                            method="Card"
                            cardInfo={billingInfo ? billingInfo?.cardInfo : undefined}
                        />

                        <PaymentMethod
                            method="PayPal"
                            payPalInfo={billingInfo ? billingInfo?.payPalInfo : undefined}
                        />

                        <PaymentAddress
                            postalAddress={billingInfo ? billingInfo?.address : undefined}
                        />
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}

export default Billing;


