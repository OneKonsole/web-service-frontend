import React, {useEffect, useState} from "react";
import chevronUpIcon from "@assets/icons/chevron-up.svg";
import chevronDownIcon from "@assets/icons/chevron-down.svg";
import {PaymentInstance} from "@/type.ts";
import {formatDate} from "@utils/DateHelper.ts";
import {billingDetailsStr, paymentInstanceToPdf} from "@utils/BillingHelper.ts";
import {useAuth} from "@components/common/AuthContext.tsx";

type Props = {
    index: number,
    paymentInstance: PaymentInstance
}


const PaymentHistoryInstance: React.FC<Props> = ({paymentInstance, index}: Props) => {

    const [isToggled, setIsToggled] = React.useState(false);
    const [textColor, setTextColor] = React.useState("gray-dark");
    const [billingDetails, setBillingDetails] = useState<string | undefined>(undefined);
    const {token} = useAuth();

    // set billing details
    if (token && !billingDetails) {
        billingDetailsStr(paymentInstance, token).then((res) => {
            setBillingDetails(res);
        });
    }

    enum classesByStatus {
        Paid = "text-green bg-green-light",
        Pending = "text-yellow bg-yellow-light",
        Failed = "text-red bg-red-light",
    }

    /**
     * Download the invoice for the payment instance
     */
    const downloadInvoice = () => {
        if (!token) {
            alert("You must be logged in to download the invoice");
            return;
        }

        paymentInstanceToPdf(paymentInstance, token).then((pdfBlob) => {
            if (pdfBlob === null) {
                alert("An error occurred while generating the invoice");
                return;
            }
            // Créez un lien pour le téléchargement
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = `Invoice-${paymentInstance.invoiceDetails.order_id}.pdf`;

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            // Nettoyez l'URL créée
            URL.revokeObjectURL(downloadLink.href);
        });
    }

    useEffect(() => {
        isToggled ? setTextColor("white") : setTextColor("gray-dark");
    }, [isToggled]);

    return (
        <div className={`flex flex-col`} key={index}>
            <div
                className={`grid grid-cols-9 items-center justify-center text-center py-2 ${isToggled ? 'bg-blue-light rounded-t-xl' : 'bg-white border-[1px] border-gray rounded-xl mb-4'}`}>

                <label className={`col-span-1 text-sm text-${textColor}`}>
                    {paymentInstance.invoiceDetails.currency} {paymentInstance.invoiceDetails.amount.toFixed(2)}
                </label>

                <div
                    className={`col-span-1 ${isToggled ? 'text-white bg-blue-light-light' : classesByStatus[paymentInstance.status]} flex rounded-xl items-center justify-center px-2 py-1`}>
                    <label className={`text-sm font-bold`}>
                        {paymentInstance.status}
                    </label>
                </div>

                <label className={`col-span-3 text-sm text-${textColor}`}>
                    {paymentInstance.invoiceDetails.recipient}
                </label>

                <label className={`col-span-1 text-sm text-${textColor}`}>
                    {paymentInstance.invoiceDetails.invoiceDate.toLocaleDateString()}
                </label>

                <label className={`col-span-1 text-sm text-${textColor}`}>
                    {paymentInstance.invoiceDetails.paymentMethod}
                </label>

                <button className="col-span-1 flex items-center justify-center"
                        onClick={downloadInvoice}>

                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21.2004 15.486V19.486C21.2004 20.0164 20.9897 20.5251 20.6147 20.9002C20.2396 21.2752 19.7309 21.486 19.2004 21.486H5.20045C4.67001 21.486 4.16131 21.2752 3.78623 20.9002C3.41116 20.5251 3.20045 20.0164 3.20045 19.486V15.486"
                            stroke={isToggled ? 'white' : 'black'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"/>
                        <path d="M7.20045 10.486L12.2004 15.486L17.2004 10.486" stroke={isToggled ? 'white' : 'black'}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M12.2004 15.486V3.48596" stroke={isToggled ? 'white' : 'black'} strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>

                <div className={`col-span-1 flex justify-center`}>
                    <button
                        className={`flex items-center justify-center ${isToggled ? 'bg-blue' : 'bg-gray-light'} rounded-lg w-10 h-10`}
                        onClick={() => setIsToggled(!isToggled)}>
                        <img src={isToggled ? chevronUpIcon : chevronDownIcon} alt={'chevron'} className="w-6 h-6"/>
                    </button>
                </div>
            </div>
            <div
                className={`grid grid-cols-12 p-6 bg-white rounded-b-xl shadow-xl ${isToggled ? 'visible mb-4' : 'hidden'}`}>

                <div className={`col-span-5 flex flex-col`}>
                    <label className={`text-sm text-gray-dark text-left mb-2`}>
                        Details
                    </label>
                    <pre className={`text-sm text-gray-dark text-left bg-gray-light rounded-xl p-2 mr-6`}>
                        {(token && paymentInstance.invoiceDetails.order_infos) ? (billingDetails ? billingDetails : "No details") : "Unavailable"}
                    </pre>
                </div>

                <div className={`col-span-2 flex flex-col pr-4`}>
                    <label className={`text-sm text-gray-dark text-left`}>
                        Status
                    </label>
                    <label className={`text-md font-bold text-gray-dark text-left mb-6`}>
                        {paymentInstance.status}
                    </label>
                    <label className={`text-sm text-gray-dark text-left`}>
                        ID number
                    </label>
                    <label className={`text-md font-bold text-gray-dark text-left`}>
                        {paymentInstance.invoiceDetails.order_id}
                    </label>
                </div>

                <div className={`col-span-2 flex flex-col pr-4`}>
                    <label className={`text-sm text-gray-dark text-left`}>
                        Invoice date
                    </label>
                    <label className={`text-md font-bold text-gray-dark text-left mb-6`}>
                        {formatDate(paymentInstance.invoiceDetails.invoiceDate)}
                    </label>
                    <label className={`text-sm text-gray-dark text-left`}>
                        Paid date
                    </label>
                    <label className={`text-md font-bold text-gray-dark text-left`}>
                        {formatDate(paymentInstance.invoiceDetails.paidDate)}
                    </label>
                </div>

                <div className={`col-span-3 flex flex-col border-gray border-l-[1px]`}>
                    <label className={`text-sm text-gray-dark text-center mb-6`}>
                        Amount due
                    </label>
                    <label className={`text-3xl text-gray-dark font-bold text-center`}>
                        {paymentInstance.invoiceDetails.currency} {paymentInstance.invoiceDetails.amount.toFixed(2)}
                    </label>
                </div>
            </div>
        </div>
    );
};
export default PaymentHistoryInstance;
