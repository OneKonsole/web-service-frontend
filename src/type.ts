// ----- User -----

export type UserInfo = {
    id: string,
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    country?: string;
    role?: string;
    billingInfo?: BillingInfo;
}

export type PostalAddress = {
    name: string;
    country: string;
    stateRegion?: string;
    city: string;
    street: string;
    zipCode: string;
}

// ----- Order -----

export type OrderInfos = {
    user_id: string;
    cluster_name: string;
    images_storage: number;
    has_monitoring: boolean;
    monitoring_storage: number;
    has_alerting: boolean;
}

// ----- Billing -----

export enum AcceptedCurrency {
    USD = 'USD',
    USD_symbol = '$',
    EUR = 'EUR',
    EUR_symbol = '€',
}

export type BillingInfo = {
    address?: PostalAddress;
    onGoingInfo?: OnGoingInfo;
    payPalInfo?: PayPalInfo;
    cardInfo?: CardInfo;
    paymentInstances?: PaymentInstance[];
}

export type FixedPrices = {
    basic: number;
    img_storage_price_unit: number;
    monitoring_option: number;
    monitoring_storage_price_unit: number;
    alerting_option: number;
}

export type PaymentInstance = {
    status: 'Paid' | 'Pending' | 'Failed';
    invoiceDetails: InvoiceDetails;
}

export type InvoiceDetails = {
    order_id: string;
    amount: number;
    currency: AcceptedCurrency;
    recipient: string;
    paymentMethod: 'PayPal' | 'CreditCard';
    invoiceDate: Date;
    paidDate: Date;
    order_infos: OrderInfos;
}

export type PayPalInfo = {
    email: string;
}

export type CardInfo = {
    holderName: string;
    cardType: string;
    cardNumber: string;
    expDate: Date;
    cvv: string;
}

export type OnGoingInfo = {
    currency: AcceptedCurrency;
    actualPrice: number;
    nextPrice: number;
    startDate: Date;
    endDate: Date;
}

// ----- Components -----

export enum InputType {
    text = "text",
    password = "password",
    email = "email",
    number = "number",
    date = "date",
    time = "time",
    datetime = "datetime",
    search = "search",
    tel = "tel",
    url = "url",
    month = "month",
    week = "week",
    select = "select",
    phone = "phone"
}

export type Option = {
    value: string;
    text: string;
}

// ----- Icons -----

export enum SchemaIconType {
    api = "api",
    cm = "ConfigMap",
    scheduler = "scheduler",
    etcd = "etcd",
    graphLoki = "graphLoki",
    prometheus = "prometheus",
    prometheusAlert = "prometheusAlert",
    harbor = "harbor",
    imgStorage = "ImagesStorage",
    monitoringStorage = "MonitoringStorage",
}

// ----- Clusters -----
export type Cluster = {
    name: string;
    status: string;
    kubernetesVersion: string;
    orderId: string;
    controlPlane: ControlPlane[];
    nodes?: NodeElement[];

}
export type ControlPlane = {
    'konnectivity-server': ControlPlaneElement;
    'kube-scheduler': ControlPlaneElement;
    'kube-apiserver': ControlPlaneElement;
    'kube-controller-manager': ControlPlaneElement;
}

export type ControlPlaneElement = {
    name: string,
    readyNumber: number,
    desiredNumberScheduled: number,
}
export type NodeElement = {
    name: string,
    isReady: boolean,
    role: string[],
}

export enum ClusterStatus {
    Provisioning = 'Provisioning',
    CertificateAuthorityRotating = 'CertificateAuthorityRotating',
    Upgrading = 'Upgrading',
    Migrating = 'Migrating',
    Ready = 'Ready',
    NotReady = 'NotReady',
}