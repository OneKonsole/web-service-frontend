import React from "react";
import Button from "@components/inputs/Button.tsx";
import editIcon from "@assets/icons/edit.svg";
import {PostalAddress} from "@/type.ts";

type Props = {
    postalAddress?: PostalAddress
}

/**
 * Component to display the payment address on the billing page
 * @param postalAddress the postal address to display
 */
const PaymentAddress: React.FC<Props> = ({postalAddress}: Props) => {

    return (
        <div className="flex flex-col bg-gray-light rounded-xl py-4 px-6">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">

                    {postalAddress ? (
                        <label className="text-sm font-bold text-left pr-2">
                            {postalAddress ? postalAddress.name : ''}
                        </label>
                    ) : (
                        <label className="flex-1 text-sm text-gray-dark text-center font-bold pr-2">
                            No address set
                        </label>
                    )}

                    <Button
                        to="/billing/edit/address"
                        content={
                            <img
                                src={editIcon}
                                alt="edit"
                                className="h-6 w-6 bg-gray p-1 rounded"
                            />
                        }
                        customClass="border-none"
                    />
                </div>

                {postalAddress && (
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-dark text-left">
                            {postalAddress.street}
                        </label>
                        <label className="text-sm text-gray-dark text-left">
                            {postalAddress.zipCode} {postalAddress.city}
                        </label>
                        <label className="text-sm text-gray-dark text-left">
                            {postalAddress.country}
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaymentAddress;