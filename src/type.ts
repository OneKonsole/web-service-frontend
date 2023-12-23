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
    clusterName: string;
    imagesStorage: number;
    monitoringOption: boolean;
    monitoringStorage: number;
    alertingOption: boolean;
}

// ----- Billing -----

export enum AcceptedCurrency {
    USD = '$',
    EUR = '€',
}

export type BillingInfo = {
    address?: PostalAddress;
    onGoingInfo?: OnGoingInfo;
    payPalInfo?: PayPalInfo;
    cardInfo?: CardInfo;
    paymentInstances?: PaymentInstance[];
}

export type FixedPrices = {
    minimum: number;
    alertingOption: number;
    logUnitPrice: number;
    storageUnitPrice: number;
}

export type PaymentInstance = {
    status: 'Paid' | 'Pending' | 'Failed';
    invoiceDetails: InvoiceDetails;
}

export type InvoiceDetails = {
    invoiceId: string;
    amount: number;
    currency: AcceptedCurrency;
    recipient: string;
    paymentMethod: 'PayPal' | 'CreditCard';
    invoiceDate: Date;
    paidDate: Date;
    logQuantity: number;
    storageCapacity: number;
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
    nextEstimatedPrice: number;
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
    kubeVersion: string;
    orderID: string;
    controlPlanes: ControlPlane[];
    nodes: NodeElement[];

}
export type ControlPlane = {
    Connectivity: ControlPlaneElement;
    KubeScheduler: ControlPlaneElement;
    KubeApiServer: ControlPlaneElement;
    KubeControllerManager: ControlPlaneElement;
}

export type ControlPlaneElement = {
    name: string,
    readyNb: number,
    DesiredNumberScheduled: number,
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
