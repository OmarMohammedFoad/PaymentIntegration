import axios from "axios";
import crypto from "crypto";
import data from "../../Interfaces/FawryInterfaces/Chargeitems";
import Order from "../../Interfaces/FawryInterfaces/OrderFawry";
import PaymentInterface from "./BaseInterface";

class Fawry implements PaymentInterface {
  merchantCode: string = "";
  secureHashKey: string = "";
  merchantRefNum: string = "";
  returnUrl: string = "";
  langauge: string = "en-gb";
  paymentExpiry: string = "1631138400000";
  items:data[]=[{
    itemId:"",
    description:"",
    price:0,
    quantity:0,
    imageUrl:""
}];
  isSandbox: boolean = false;
  payment_method: string;
  orderWebHookUrl: string;
  customerProfileId: string;
  PRODUCTION_BASE_URL: string = "https://www.atfawry.com";
  SANDBOX_BASE_URL: string = "https://atfawry.fawrystaging.com";
  customerMobile: string;
  customerEmail: string;
  customername: string;

  constructor(orderPayload: Order) {
    this.merchantCode = orderPayload.merchantCode;
    this.secureHashKey = orderPayload.secureHashKey;
    this.merchantRefNum = orderPayload.merchantRefNum;
    this.langauge = orderPayload.language;
    this.items = orderPayload.chargeItems;
    this.isSandbox = orderPayload.isSandbox;
    this.returnUrl = orderPayload.returnUrl;
    this.payment_method = orderPayload.paymentMethod;
    this.orderWebHookUrl = orderPayload.orderWebHookUrl;
    this.customerProfileId = orderPayload.customerProfileId;
    this.paymentExpiry = orderPayload.paymentExpiry;
    this.customerMobile = orderPayload.customerMobile;
    this.customerEmail = orderPayload.customerEmail;
    this.customername = orderPayload.customerName;
  }

  // return base url
  getBaseUrl(): string {
    return this.isSandbox ? this.SANDBOX_BASE_URL : this.PRODUCTION_BASE_URL;
  }

  // this function to get the signature of the charge request
  getSiganture(type: "createLink" | "checkStatus" | "refund", referenceNumber?: string|any, refundAmount?: number, refundReason?: string): string {
    switch (type) {
      case "refund":
        return crypto
          .createHash("sha256")
          .update(this.merchantCode + referenceNumber + refundAmount?.toFixed(2) + (refundReason || "") + this.secureHashKey)
          .digest("hex");
      case "checkStatus":
        return crypto
          .createHash("sha256")
          .update(this.merchantCode + this.merchantRefNum + this.secureHashKey)
          .digest("hex");
      case "createLink":
      default:
        let concatenated =  this.merchantCode + this.merchantRefNum + (this.customerProfileId || "") + this.returnUrl;
        
      
        for (const item of this.items) {
          
            
                const formattedPrice = item.price.toFixed(2);
                concatenated += item.itemId + item.quantity.toString() + formattedPrice;
              }

              concatenated += "d2cf92d7-3c58-42d7-960b-c90591779c52";

              let hash = crypto.createHash("sha256").update(concatenated).digest("hex")
              
              return hash;
      }
  }

  

  // get order payload
  getOrderPayload(): object {
    return {
            "merchantCode":this.merchantCode,
            "merchantRefNum":this.merchantRefNum,
            "customerMobile":this.customerMobile,
            "customerEmail":this.customerEmail,
            "customerName":this.customername,
            "customerProfileId":this.customerProfileId,
            "paymentExpiry": this.paymentExpiry,
            "language": this.langauge, 
            "chargeItems":this.items,
            // "selectedShippingAddress":selectedShippingAddress === undefined ?"":selectedShippingAddress,
            "returnUrl":this.returnUrl,
            "paymentMethod":"",
            // 
            "orderWebHookUrl":"",
            // add this to sandbox function
            "authCaptureModePayment":false,
            "signature": this.getSiganture("createLink")

                
        
        }    
  }

  // create order link
  createOrderLink() {
    const orderPayload = this.getOrderPayload();
    console.log(orderPayload);
    
    axios
      .post("https://atfawry.fawrystaging.com/fawrypay-api/api/payments/init", orderPayload)
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
    axios
      .get(
        `${this.getBaseUrl()}/ECommerceWeb/Fawry/payments/status/v2?merchantCode=${this.merchantCode}&merchantRefNumber=${
          this.merchantRefNum
        }&signature=${this.getSiganture("checkStatus")}`
      )
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
  refundOrder(referenceNumber: string, refundAmount: number, reason: string) {
    axios
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

  // cancel order
}

export default Fawry;
