import React from "react";
import {PaymentInstance} from "@/type.ts";
import PaymentHistoryInstance from "@components/specifics/billing/PaymentHistoryInstance.tsx";

type Props = {
    PaymentHistory?: PaymentInstance[] | undefined
}

/**
 * Component to display the payment history on the billing page
 * @param PaymentHistory : list of payment instances
 */
const PaymentHistory: React.FC<Props> = ({PaymentHistory}: Props) => {

    const isPaymentHistoryEmpty = PaymentHistory === undefined || PaymentHistory.length === 0;

    return (

        <div>
            <label className="text-lg font-bold text-left">
                Payment history
            </label>

            <div className="grid grid-cols-9 bg-gray-light rounded-xl items-center text-center justify-between py-2 my-4">
                <label className="col-span-1 text-sm text-gray-dark font-bold">
                    Amount
                </label>
                <label className="col-span-1 text-sm text-gray-dark font-bold">
                    Status
                </label>
                <label className="col-span-2 text-sm text-gray-dark font-bold">
                    Recipient
                </label>
                <label className="col-span-1 text-sm text-gray-dark font-bold">
                    Date
                </label>
                <label className="col-span-2 text-sm text-gray-dark font-bold">
                    Payment method
                </label>
                <label className="col-span-1 text-sm text-gray-dark font-bold">
                    Download
                </label>
            </div>

            {isPaymentHistoryEmpty ? (
                <div className="flex flex-col items-center justify-center text-sm text-gray-dark mt-10 font-bold">
                    <label>No payment history</label>
                    <label>(┬┬﹏┬┬)</label>
                </div>
            ) : (
                PaymentHistory.map((payment, index) => (
                    <PaymentHistoryInstance
                        key={payment.invoiceDetails.invoiceId}
                        index={index}
                        paymentInstance={payment}
                    />
                ))
            )}
        </div>
    );
};
export default PaymentHistory;
