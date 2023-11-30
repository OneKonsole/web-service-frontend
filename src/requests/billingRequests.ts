import {AcceptedCurrency, BillingInfo, FixedPrices, PayPalInfo, PostalAddress} from "@/type.ts";


const prices: FixedPrices = {
    minimum: 20,
    alertingOption: 50,
    logUnitPrice: 0.002,
    storageUnitPrice: 1,
};

let billingInfo: BillingInfo = {
    address: {
        name: "John Doe",
        street: "1, rue de la Paix",
        zipCode: "75000",
        city: "Paris",
        country: "France",
    },
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
    ],
};

/**
 * Return the static prices
 */
export const getPrices = (): FixedPrices | undefined => {
    // TODO : get the prices from the backend
    return prices;
}


/**
 * Return the billing address of the user
 */
export const getUserBillingPostalAddress = async (): Promise<PostalAddress | undefined> => {

    // TODO : get the billing postal address from the backend

    return new Promise((resolve) => {
        if (billingInfo.address) {
            setTimeout(() => resolve(billingInfo.address), 500);
        }
    });
}

export const getUserBillingPayPalInfo = async (): Promise<PayPalInfo | undefined> => {

    // TODO : get the paypal info from the backend

    return new Promise((resolve) => {
        if (billingInfo.payPalInfo) {
            setTimeout(() => resolve(billingInfo.payPalInfo), 500);
        }
    });
}

/**
 * Return the billing details of the user
 */
export const getUserBillingDetails = async (): Promise<BillingInfo> => {

    // TODO : get the billing details from the backend

    // add the billing details to the user info
    return new Promise((resolve) => {
        setTimeout(() => resolve(billingInfo), 500);
    });
}


/**
 * Update the billing address
 * @param adr : PostalAddress to update
 */
export const updateUserBillingAddress = async (adr: PostalAddress): Promise<boolean> => {

    // TODO : update the billing address in the backend
    if (adr) {
        billingInfo.address = adr;
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 500);
        });
    } else {
        return new Promise((resolve) => {
            setTimeout(() => resolve(false), 500);
        });
    }
}
