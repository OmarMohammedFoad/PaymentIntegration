import motajerEcommerceServices from "./modules";
const order= ()=>{ motajerEcommerceServices.paymentServices.CreateOrder("fawry",{
    "merchantCode": "your code",
    "merchantRefNum": "",
    "customerMobile": "01068630370",
    "customerEmail": "omar@gmail.com",
    "customerName": "omar Muhammad",
    "customerProfileId": "12212",
    "paymentExpiry": "1631138400000",
    "language": "en-gb",
    "chargeItems": [
        {
            "itemId": "6b5fdea340e31b3b0339d4d4ae5",
            "description": "Product Description",
            "price": 2,
            "quantity": 1,
            "imageUrl": "sd"
        },
        {
            "itemId": "97092dd9e9c07888c7eef36",
            "description": "Product Description",
            "price": 750.25,
            "quantity": 3,
            "imageUrl": "sd"
        }
    ],
    "returnUrl": "https://developer.fawrystaging.com",
    "paymentMethod": "",
    "orderWebHookUrl": "",
    "authCaptureModePayment": false,
},
{})}



    
    
console.log(order());




/**
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
 */

export default motajerEcommerceServices;
