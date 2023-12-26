import {AcceptedCurrency, BillingInfo, FixedPrices, PayPalInfo, PostalAddress} from "@/type.ts";


const prices: FixedPrices = {
    basic: 20,
    ImgStoragePrice_Unit: 1,
    MonitoringOption: 5,
    MonitoringStoragePrice_Unit: 1,
    alertingOption: 1,
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
export const getPrices = async (): Promise<FixedPrices | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(prices), 500);
    });
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

export const createOrderOnServer = async (amount : number, currency : string) : Promise <string> => {
    // TODO : create the order on the backend
    console.log("amount : " + amount + " currency : " + currency);
    return new Promise((resolve) => {
        setTimeout(() => resolve("1A2B3C4D5E"), 1000);
    });
}

export const confirmOrderPayment = async (orderId : string) : Promise <boolean> => {
    // TODO : confirm the payment on the backend
    console.log("orderId : " + orderId);
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
    });
}

