"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
class Fawry {
    constructor(orderPayload) {
        this.merchantCode = "";
        this.secureHashKey = "";
        this.orderReferenceCode = "";
        this.returnUrl = "";
        this.langauge = "en-gb";
        this.paymentExpiry = "1631138400000";
        this.items = [];
        this.isSandbox = false;
        this.PRODUCTION_BASE_URL = "https://www.atfawry.com";
        this.SANDBOX_BASE_URL = "https://atfawry.fawrystaging.com";
        this.merchantCode = orderPayload.merchantCode;
        this.secureHashKey = orderPayload.secureHashKey;
        this.orderReferenceCode = orderPayload.orderReferenceCode;
        this.langauge = orderPayload.language;
        this.items = orderPayload.itemsData;
        this.isSandbox = orderPayload.isSandbox;
        this.returnUrl = orderPayload.returnUrl;
        this.payment_method = orderPayload.payment_method;
        this.orderWebHookUrl = orderPayload.orderWebHookUrl;
        this.customerProfileId = orderPayload.customerProfileId;
        this.paymentExpiry = orderPayload.paymentExpiry;
        this.customerMobile = orderPayload.customerMobile;
        this.customerEmail = orderPayload.customerEmail;
        this.customername = orderPayload.customername;
    }
    // return base url
    getBaseUrl() {
        return this.isSandbox ? this.SANDBOX_BASE_URL : this.PRODUCTION_BASE_URL;
    }
    // this function to get the signature of the charge request
    getSiganture(type, referenceNumber, refundAmount, refundReason) {
        switch (type) {
            case "refund":
                return crypto_1.default
                    .createHash("sha256")
                    .update(this.merchantCode + referenceNumber + (refundAmount === null || refundAmount === void 0 ? void 0 : refundAmount.toFixed(2)) + (refundReason || "") + this.secureHashKey)
                    .digest("hex");
            case "checkStatus":
                return crypto_1.default
                    .createHash("sha256")
                    .update(this.merchantCode + this.orderReferenceCode + this.secureHashKey)
                    .digest("hex");
            case "createLink":
            default:
                let concatenated = this.merchantCode + this.orderReferenceCode + (this.customerProfileId || "") + this.returnUrl;
                for (const item of this.items) {
                    const formattedPrice = item.price.toFixed(2);
                    concatenated += item.itemId + item.quantity.toString() + formattedPrice;
                }
                concatenated += this.secureHashKey;
                return crypto_1.default.createHash("sha256").update(concatenated).digest("hex");
        }
    }
    // get order payload
    getOrderPayload() {
        return {
            merchantCode: this.merchantCode,
            orderReferenceCode: this.orderReferenceCode,
            customerMobile: this.customerMobile,
            customerEmail: this.customerEmail,
            customerName: this.customername,
            customerProfileId: this.customerProfileId,
            paymentExpiry: this.paymentExpiry,
            language: this.langauge,
            chargeItems: this.items,
            returnUrl: this.returnUrl,
            paymentMethod: this.payment_method,
            orderWebHookUrl: this.orderWebHookUrl,
            authCaptureModePayment: false,
            signature: this.getSiganture("createLink"),
        };
    }
    // create order link
    createOrderLink() {
        const orderPayload = this.getOrderPayload();
        axios_1.default
            .post(`${this.getBaseUrl()}/fawrypay-api/api/payments/init`, orderPayload)
            .then((response) => {
            console.log("this is response in charge request");
            console.log(response.data);
        })
            .catch((error) => {
            console.log(error.response.data);
        });
    }
    //  check order status
    getOrderStatus() {
        axios_1.default
            .get(`${this.getBaseUrl()}/ECommerceWeb/Fawry/payments/status/v2?merchantCode=${this.merchantCode}&merchantRefNumber=${this.orderReferenceCode}&signature=${this.getSiganture("checkStatus")}`)
            .then((response) => {
            // Get Response Contents
            let type = response.data.type;
            let paymentStatus = response.data.paymentStatus;
            console.log(response.data);
        })
            .catch((error) => {
            console.log(error.response);
        });
    }
    // refund order
    refundOrder(referenceNumber, refundAmount, reason) {
        axios_1.default
            .post(`${this.getBaseUrl()}/ECommerceWeb/Fawry/payments/refund`, {
            merchantCode: this.merchantCode,
            referenceNumber: referenceNumber,
            refundAmount: refundAmount,
            reason: reason,
            signature: this.getSiganture("refund", referenceNumber, refundAmount, reason),
        })
            .then((res) => {
            console.log(res.data);
        })
            .catch((err) => {
            console.log(err.response.data);
        });
    }
}
exports.default = Fawry;
