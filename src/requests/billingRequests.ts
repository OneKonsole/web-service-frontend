import {AcceptedCurrency, BillingInfo, FixedPrices, OrderInfos, PostalAddress} from "@/type.ts";

let billingInfo: BillingInfo = {
    address: {
        name: "John Doe",
        street: "1, rue de la Paix",
        zipCode: "75000",
        city: "Paris",
        country: "France",
    },
    onGoingInfo: {
        currency: AcceptedCurrency.USD_symbol,
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
                currency: AcceptedCurrency.USD_symbol,
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
                currency: AcceptedCurrency.USD_symbol,
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
                currency: AcceptedCurrency.USD_symbol,
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
 * Return the services prices
 * @param token user token
 */
export const getPrices = async (token: string): Promise<FixedPrices | undefined> => {

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors'
    }
    const resp = await fetch('/billing-api/order/prices', options);
    const json = await resp.json();
    return new Promise((resolve) => {
        resolve(json);
    });
}


/**
 * Create a new order for the user on the backend
 * @param token user token
 * @param orderInfos infos about the order
 * @param amount amount to pay
 * @param currency currency of the amount
 * @returns a PayPal Order id
 */
export const createOrder = async (token: string, orderInfos: OrderInfos, amount: number, currency: string) => {
    const resp = await fetch('/billing-api/order/create', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        body: JSON.stringify({
            order_details: orderInfos,
            amount: amount.toString(),
            currency: currency,
        })
    });

    const json = await resp.json();
    return new Promise((resolve) => {
        resolve(json.order_id);
    });
}

/**
 * Confirm the order on the backend once the payment is done
 * @param token user token
 * @param orderID id of the order
 * @returns true if validated by the backend, false otherwise
 */
export const confirmOrder = async (token: string, orderID: string): Promise<boolean> => {
    const res = await fetch('/billing-api/order/approve', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        body: JSON.stringify({order_id: orderID})
    });
    return new Promise((resolve) => {
        resolve(res.status === 200);
    });
}


/////////////////////////

/*
!! UNUSED FOR NOW !! (no billing address needed with PayPal)
*/
export const getUserBillingPostalAddress = async (): Promise<PostalAddress | undefined> => {

    return new Promise((resolve) => {
        if (billingInfo.address) {
            setTimeout(() => resolve(billingInfo.address), 500);
        }
    });
}
/*
!! UNUSED FOR NOW !! (no billing address needed with PayPal)
*/
export const updateUserBillingAddress = async (adr: PostalAddress): Promise<boolean> => {

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


