import React from "react";
import {OnGoingInfo} from "@/type.ts";
import creditCardIcon from "@assets/icons/credit-card-gold.svg";
import arrowRightIcon from "@assets/icons/arrow-right-2.svg";
import {formatDate} from "@utils/DateHelper.ts";

type Props = {
    type: 'next' | 'current';
    onGoingInfo?: OnGoingInfo;
}

const PaymentDisplay: React.FC<Props> = ({type, onGoingInfo}: Props) => {

    const isNext = type === 'next';

    /**
     * Get the string values of the price
     * @param price - Price to format
     * @param val - Type of value to return (integer or cents of the price)
     */
    const getPriceStringValues = (price: number | undefined, val: 'integer' | 'cents'): string => {
        if (price === undefined) {
            return '';
        }
        if (val === 'integer') {
            return price.toFixed(0);
        } else {
            return (price - Math.floor(price)).toFixed(2).substring(2);
        }
    }

    return (
        <div
            className={`flex flex-col w-1/2 ${isNext ? 'border-gray border-[1px] bg-white' : 'bg-gray-light'} rounded-xl p-6`}>

            <div className="flex flex-row mb-2 justify-between">
                <label className={`text-sm ${isNext ? 'text-gray' : 'text-gray-dark'} font-bold`}>
                    {isNext ? 'Next payment' : 'Current payment'}
                </label>
                <div
                    className={`flex ${isNext ? 'bg-yellow-light' : 'bg-blue-light-light+'} rounded-full w-10 h-10 items-center justify-center`}>
                    <img
                        src={isNext ? creditCardIcon : arrowRightIcon}
                        alt={isNext ? 'credit card' : 'next'}
                        className="w-6 h-6"
                    />
                </div>
            </div>

            {onGoingInfo ? (
                <div>
                    <div className="flex flex-row items-baseline mb-2">
                        <label className="text-5xl text-dark-full font-bold mb-4">
                            {onGoingInfo.currency} {isNext ? getPriceStringValues(onGoingInfo.nextPrice, 'integer') : getPriceStringValues(onGoingInfo.actualPrice, 'integer')}
                        </label>
                        <label className="text-sm text-dark-full font-bold">
                            ,{isNext ? getPriceStringValues(onGoingInfo.nextPrice, 'cents') : getPriceStringValues(onGoingInfo.actualPrice, 'cents')}
                        </label>
                    </div>

                    <label className="text-sm text-dark-full font-bold">
                        {isNext ? 'On ' : 'Since '} {isNext ? formatDate(onGoingInfo.endDate) : formatDate(onGoingInfo.startDate)}
                    </label>
                </div>

            ) : (
                <label className="text text-xl text-dark-full text-center font-bold mb-4">
                    {isNext ? 'No next payment' : 'No current payment'}
                </label>
            )}
        </div>
    );
}
export default PaymentDisplay;
