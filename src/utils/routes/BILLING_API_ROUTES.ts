const PREFIX = '/billing-api/';

export enum BILLING_API_ROUTES {
    PRICES = PREFIX + 'order/prices',
    ORDER_CREATE = PREFIX + 'order/create',
    ORDER_APPROVE = PREFIX + 'order/approve',
    USER_ORDERS = '/order-api/orders',
}

