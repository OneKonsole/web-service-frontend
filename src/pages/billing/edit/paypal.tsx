import React from "react";
import PanelLayout from "@components/layout/PanelLayout.tsx";
import {PayPalInfo} from "@/type.ts";
import {getUserBillingPayPalInfo} from "@/requests/billingRequests.ts";


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
                    </div>
                </div>
            </div>
        </PanelLayout>
    );
}

export default EditPaypalInfos;


