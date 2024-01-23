import {
    AcceptedCurrency,
    BillingInfo,
    FixedPrices,
    InvoiceDetails,
    OnGoingInfo,
    OrderInfos,
    PostalAddress
} from "@/type.ts";
import {BILLING_API_ROUTES} from "@utils/routes/BILLING_API_ROUTES.ts";

/**
 * Return the billing details of the user
 * @param token user token
 * @param userId user id
 * @returns BillingInfo the billing details of the user
 */
export const getUserBillingDetails = async (token: string, userId: string): Promise<BillingInfo> => {

    const resp = await fetch(BILLING_API_ROUTES.USER_ORDERS, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        mode: 'cors',
        body: JSON.stringify({user_id: userId})
    });
    const json = await resp.json();
    const billingInfo = mapRespToBillingInfo(json);

    // add the billing details to the user info
    return new Promise((resolve) => {
        setTimeout(() => resolve(billingInfo), 500);
    });
}

/**
 * Map the response from the backend to a BillingInfo object
 * @param resp json response from the backend
 * @returns BillingInfo the billing details of the user
 */
const mapRespToBillingInfo = (resp: any[]): BillingInfo => {
    const paymentInstances = resp.map(item => {
        const invoiceDetails: InvoiceDetails = {
            order_id: item.paypal_order.id,
            amount: parseFloat(item.paypal_order.purchase_units[0].amount.value),
            currency: AcceptedCurrency[item.paypal_order.purchase_units[0].amount.currency_code as keyof typeof AcceptedCurrency],
            recipient: item.paypal_order.purchase_units[0].payee.email_address,
            paymentMethod: 'PayPal',
            invoiceDate: new Date(item.paypal_order.create_time),
            paidDate: new Date(new Date(item.paypal_order.create_time).setMonth(new Date(item.paypal_order.create_time).getMonth() + 1)),
            order_infos: {
                user_id: item.app_order.user_id,
                cluster_name: item.app_order.cluster_name,
                images_storage: item.app_order.images_storage,
                has_monitoring: item.app_order.has_monitoring,
                monitoring_storage: item.app_order.monitoring_storage,
                has_alerting: item.app_order.has_alerting
            }
        };

        const status: 'Paid' | 'Pending' | 'Failed' = 'Paid';

        return {status, invoiceDetails};
    });

    const lastPayment = paymentInstances[paymentInstances.length - 1].invoiceDetails;
    const onGoingInfo: OnGoingInfo = {
        currency: lastPayment.currency,
        actualPrice: lastPayment.amount,
        nextPrice: lastPayment.amount,
        startDate: new Date(lastPayment.invoiceDate),
        endDate: new Date(new Date(lastPayment.invoiceDate).setMonth(new Date(lastPayment.invoiceDate).getMonth() + 1))
    };

    return {onGoingInfo, paymentInstances};
};

/**
 * Return the services prices
 * @param token user token
 */
export const getPrices = async (token: string): Promise<FixedPrices | undefined> => {

    // check if the prices are already in the local storage
    const prices = localStorage.getItem('prices');
    if (prices) {
        return new Promise((resolve) => {
            resolve(JSON.parse(prices));
        });
    } else {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors'
        }
        const resp = await fetch(BILLING_API_ROUTES.PRICES, options);
        const json = await resp.json();
        localStorage.setItem('prices', JSON.stringify(json));

        return new Promise((resolve) => {
            resolve(json);
        });
    }
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
    const resp = await fetch(BILLING_API_ROUTES.ORDER_CREATE, {
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
    const res = await fetch(BILLING_API_ROUTES.ORDER_APPROVE, {
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
        setTimeout(() => resolve(undefined), 500);
    });
}
/*
!! UNUSED FOR NOW !! (no billing address needed with PayPal)
*/
export const updateUserBillingAddress = async (adr: PostalAddress): Promise<boolean> => {

    if (adr) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 500);
        });
    } else {
        return new Promise((resolve) => {
            setTimeout(() => resolve(false), 500);
        });
    }
}


