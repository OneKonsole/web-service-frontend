import React, {useState} from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";
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
                        <div className="flex flex-col w-full p-5">

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
                    </div>
                </div>
            </PanelLayout>
        );
    }
}
export default Billing;


