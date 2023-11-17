import {AcceptedCurrency, FixedPrices, UserInfo} from "@/type.ts";

/**
 * Return the static prices
 */
export const getPrices = (): FixedPrices | undefined => {

    // TODO : get the prices from the backend

    const prices: FixedPrices = {
        minimum: 20,
        alertingOption: 50,
        logUnitPrice: 0.002,
        storageUnitPrice: 1,
    }
    return prices;
}


/**
 * Add the billing details to the user info
 * @param userInfo : user info
 */
export const getUserBillingDetails = (userInfo : UserInfo) : UserInfo | undefined => {

    // TODO : get the billing details from the backend
    const billingDetails = userInfo;

    // add the billing details to the user info
    billingDetails.billingInfo = {
        onGoingInfo: {
            currency: AcceptedCurrency.USD,
            actualPrice: 7.52,
            nextEstimatedPrice: 19.95,
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        },
        payPalInfo: {
            email: "john.doe@oneKonsole.fr",
        },
        cardInfo: {
            holderName: "John Doe",
            cardNumber: "1234 5678 9012 3456",
            expDate: new Date(),
            cardType: "Visa",
            cvv: "123",
        },
        paymentInstances: [
            {
                status: "Paid",
                invoiceDetails: {
                    invoiceId: "1A2B3C4D5E",
                    amount: 10,
                    currency: AcceptedCurrency.USD,
                    paymentMethod: "CreditCard",
                    recipient: "John Doe",
                    invoiceDate: new Date(),
                    paidDate: new Date(),
                    logQuantity: 50000,
                    storageCapacity: 50,
                }
            },
            {
                status: "Pending",
                invoiceDetails: {
                    invoiceId: "2B3C4D5E6F",
                    amount: 20,
                    currency: AcceptedCurrency.USD,
                    paymentMethod: "PayPal",
                    recipient: "John Doe",
                    invoiceDate: new Date(),
                    paidDate: new Date(),
                    logQuantity: 10000,
                    storageCapacity: 30,
                }
            },
            {
                status: "Failed",
                invoiceDetails: {
                    invoiceId: "3C4D5E6F7G",
                    amount: 30,
                    currency: AcceptedCurrency.USD,
                    paymentMethod: "CreditCard",
                    recipient: "John Doe",
                    invoiceDate: new Date(),
                    paidDate: new Date(),
                    logQuantity: 10000,
                    storageCapacity: 30,
                }
            },
        ]
    }
    return billingDetails;
}