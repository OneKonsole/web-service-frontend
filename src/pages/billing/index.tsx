import React, {useState} from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import PaymentMethod from "@components/specifics/billing/PaymentMethod.tsx";
import PaymentAddress from "@components/specifics/billing/PaymentAddress.tsx";
import PaymentDisplay from "@components/specifics/billing/PaymentDisplay.tsx";
import PaymentHistory from "@components/specifics/billing/PaymentHistory.tsx";
import {getUserBillingDetails} from "@/requests/billingRequests.ts";
import {BillingInfo} from "@/type.ts";
import LoadingPage from "@components/LoadingPage.tsx";


const Billing: React.FC = () => {

    const [billingInfo, setBillingInfo] = React.useState<BillingInfo>();
    const [isLoading, setIsLoading] = useState(true);

    getUserBillingDetails()
        .then((resp) => {
            if (resp) {
                setBillingInfo(resp);
            }
        }).catch((err) => {
        console.log(err);
    }).finally(() => {
        setIsLoading(false);
    });

    if (isLoading) {
        return <LoadingPage/>;
    } else {
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
}
export default Billing;


