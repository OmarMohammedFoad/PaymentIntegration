import data from "./Chargeitems";

interface OrderFawry {
  merchantCode: string;
  secureHashKey: string;
  merchantRefNum: string;
  language: string;
  chargeItems: data[];
  isSandbox: boolean;
  returnUrl: string;
  paymentMethod: string;
  orderWebHookUrl: string;
  customerProfileId: string;
  paymentExpiry: string;
  customerMobile: string;
  customerEmail: string;
  customerName: string;
}

export default OrderFawry;
