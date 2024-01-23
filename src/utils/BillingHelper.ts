import {PaymentInstance} from "@/type.ts";
import jsPDF from "jspdf";
import {getPrices} from "@utils/requests/billingRequests.ts";

/**
 * Convert a payment instance to a pdf invoice
 * @param paymentInstance : paymentInstance to convert
 * @param token : user token
 * @returns {jsPDF} : the pdf invoice
 * TODO : generate a real pdf invoice
 */
export const paymentInstanceToPdf = async (paymentInstance: PaymentInstance, token: string): Promise<Blob | null> => {
    const doc = new jsPDF();

    // Style settings
    const titleFontSize = 16;
    const regularFontSize = 12;
    const titleFont = 'helvetica';
    const regularFont = 'courier';
    const titleFontStyle = 'bold';
    const regularFontStyle = 'normal';
    const lineSpacing = 7;
    const leftMargin = 10;

    return new Promise((resolve) => {
        billingDetailsStr(paymentInstance, token).then((resp) => {
            if (resp) {
                const lines = resp.split('\n');

                doc.setFont(titleFont, titleFontStyle);
                doc.setFontSize(titleFontSize);
                doc.text('Invoice', leftMargin, 20);

                doc.setFont(regularFont, regularFontStyle);
                doc.setFontSize(regularFontSize);

                let currentLinePosition = 30; // Starting Y position for details
                lines.forEach((line) => {
                    doc.text(line, leftMargin, currentLinePosition);
                    currentLinePosition += lineSpacing;
                });
            }
            resolve(doc.output('blob'));
        }).catch((err) => {
            console.log(err);
        });
    });
}

/**
 * Return the billing details as a string to display
 * @param paymentInstance : paymentInstance to display
 * @param token : user token
 */
export const billingDetailsStr = async (paymentInstance: PaymentInstance, token: string): Promise<string | undefined> => {
    const currency = paymentInstance.invoiceDetails.currency;

    return new Promise((resolve) => {

        getPrices(token).then((resp) => {
            if (resp) {
                let ret = `Cluster name : ${paymentInstance.invoiceDetails.order_infos.cluster_name}
Fixed Price : ${currency} ${resp.basic}   
Images storage :
  - Capacity : ${paymentInstance.invoiceDetails.order_infos.images_storage} Go
  - Price : ${currency} ${resp.img_storage_price_unit}/Go`;

                if (paymentInstance.invoiceDetails.order_infos.has_monitoring) {
                    ret += `\nMonitoring :
- Capacity : ${paymentInstance.invoiceDetails.order_infos.monitoring_storage} Go
- Price : ${currency} ${resp.monitoring_storage_price_unit}/Go`;
                }

                if (paymentInstance.invoiceDetails.order_infos.has_alerting) {
                    ret += `\nAlerting : ${currency} ${resp.alerting_option}`;
                }
                resolve(ret);
            } else {
                resolve(undefined);
            }

        }).catch((err) => {
            console.log(err);
            resolve(undefined);
        });
    });
}