import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import PaymentMethod from "@components/billing/PaymentMethod.tsx";
import PaymentAddress from "@components/billing/PaymentAddress.tsx";
import PaymentDisplay from "@components/billing/PaymentDisplay.tsx";
import PaymentHistory from "@components/billing/PaymentHistory.tsx";
import {getUserBillingDetails} from "@/requests/billingRequests.ts";
import {getUserInfo} from "@/requests/userInfoRequests.ts";


const Billing: React.FC = () => {

    const navigate = useNavigate();
    let userInfo = getUserInfo();

    useEffect(() => {
        if (!userInfo) {
            navigate('/auth/login');
        }
    }, [navigate]);

    if (userInfo) {
        userInfo = getUserBillingDetails(userInfo);
    }

    return (
        <PanelLayout>
            <div className="h-screen justify-center p-5">
                <label className="text-xl font-bold text-left ml-5">
                    Your billing details
                </label>
                <div className="flex">
                    <div className="flex w-2/3 flex-col p-5">

                        <div className="flex flex-row space-x-5 mb-5">

                            <PaymentDisplay
                                type="current"
                                onGoingInfo={userInfo ? userInfo.billingInfo?.onGoingInfo : undefined}
                            />

                            <PaymentDisplay
                                type="next"
                                onGoingInfo={userInfo ? userInfo.billingInfo?.onGoingInfo : undefined}
                            />
                        </div>

                        <PaymentHistory
                            PaymentHistory={userInfo ? userInfo.billingInfo?.paymentInstances : undefined}
                        />

                    </div>

                    <div className="flex w-1/3 flex-col p-5 border-l-2 border-gray h-auto">

                        <PaymentMethod
                            method="Card"
                            cardInfo={userInfo ? userInfo.billingInfo?.cardInfo : undefined}
                        />

                        <PaymentMethod
                            method="PayPal"
                            payPalInfo={userInfo ? userInfo.billingInfo?.payPalInfo : undefined}
                        />

                        <PaymentAddress
                            postalAddress={userInfo ? userInfo.address : undefined}
                        />
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}

export default Billing;


