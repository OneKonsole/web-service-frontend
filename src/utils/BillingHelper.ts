import {PaymentInstance} from "@/type.ts";
import jsPDF from "jspdf";
import {getPrices} from "@/requests/billingRequests.ts";

/**
 * Convert a payment instance to a pdf invoice
 * @param paymentInstance : paymentInstance to convert
 * @returns {jsPDF} : the pdf invoice
 * TODO : generate a real pdf invoice
 */
export const paymentInstanceToPdf = (paymentInstance: PaymentInstance): Blob | null => {

    const doc = new jsPDF();
    const billingDetails = billingDetailsStr(paymentInstance);

    if (billingDetails === undefined) {
        return null;
    }
    doc.text(billingDetails, 10, 10);
    return doc.output('blob');
}

/**
 * Return the billing details as a string to display
 * @param paymentInstance : paymentInstance to display
 */
export const billingDetailsStr = (paymentInstance: PaymentInstance): string | undefined => {
    const currency = paymentInstance.invoiceDetails.currency;
    const fixedPrices = getPrices();

    if (fixedPrices === undefined) {
        return undefined;
    }

    return `Fixed Price : ${currency} ${fixedPrices.minimum}
Storage :
  - Capacity : ${paymentInstance.invoiceDetails.storageCapacity} Go
  - Price : ${currency} ${fixedPrices.storageUnitPrice}/Go
Options :
- Alerting : ${currency} ${fixedPrices.alertingOption}
- Monitoring :
  - Log quantity : ${paymentInstance.invoiceDetails.logQuantity}
  - Price : ${currency} ${fixedPrices.logUnitPrice}/log`;

}