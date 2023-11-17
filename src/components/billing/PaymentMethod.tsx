import React from "react";
import Button from "@components/inputs/Button.tsx";
import {CardInfo, PayPalInfo} from "@/type.ts";
import editIcon from "@assets/icons/edit.svg";
import creditCardIcon from "@assets/icons/credit-card-dark.svg";
import payPalIcon from "@assets/logos/paypal-full.svg";

type Props = {
    method: "PayPal" | "Card";
    payPalInfo?: PayPalInfo | undefined;
    cardInfo?: CardInfo | undefined;
}

/**
 * format the card number to display it on the billing page
 * @param cardNumber : number to format
 * @return string : formatted card number with the last 4 digits
 */
const formatCardNumber = (cardNumber: string): string => {
    return "**** **** **** " + cardNumber.slice(-4);
};

const PaymentMethod: React.FC<Props> = ({method, payPalInfo, cardInfo}: Props) => {

    const isPayPal = method === "PayPal";
    const EditButton = ({to}: { to: string }) => (
        <Button
            to={to}
            content={
                <img
                    src={editIcon}
                    alt="edit"
                    className="h-6 w-6 bg-gray p-1 rounded"
                />
            }
            customClass="border-none"
        />
    );

    const PayPalDisplay = () => (
        <div className="flex-1 flex-row text-center">
            <label className="text-sm text-gray-dark pr-2">
                {payPalInfo ? (
                    <label className="text-sm text-gray-dark text-right">
                        {payPalInfo.email}
                    </label>
                ) : (
                    <label className="text-sm text-gray-dark text-right font-bold">
                        No account added
                    </label>
                )}
            </label>
        </div>
    );

    const CardDisplay = () => (
            <div className="flex-1 flex-col">
                {cardInfo ? (
                    <div className="ml-5">
                        <div className="flex flex-row justify-between">
                            <label className="text-sm text-gray text-left pr-2">
                                {cardInfo.cardType}
                            </label>
                            <label className="text-sm text-gray-dark text-right">
                                {formatCardNumber(cardInfo.cardNumber)}
                            </label>
                        </div>

                        <div className="flex flex-row justify-between">
                            <label className="text-sm text-gray text-left pr-2">
                                Exp. date
                            </label>
                            <label className="text-sm text-gray-dark text-right">
                                {cardInfo.expDate.getMonth()}/{cardInfo.expDate.getFullYear()}
                            </label>
                        </div>
                    </div>

                ) : (
                    <div className="flex-1 flex-col text-center">
                        <label className="text-sm text-gray-dark font-bold text-left pr-2">
                            No card added
                        </label>
                    </div>
                )}
            </div>
        )
    ;

    return (
        <div className={`bg-gray-light rounded-xl py-4 px-6 mb-4`}>
            <div className="flex justify-end">
                <EditButton to={`/billing/edit/${isPayPal ? 'paypal' : 'card'}`}/>
            </div>

            <div className="flex flex-row items-center">
                <img
                    src={isPayPal ? payPalIcon : creditCardIcon}
                    alt={isPayPal ? 'PayPal' : 'Card'}
                    className="h-28 w-28"
                />
                {isPayPal ? <PayPalDisplay/> : <CardDisplay/>}
            </div>
        </div>
    );
};

export default PaymentMethod;
