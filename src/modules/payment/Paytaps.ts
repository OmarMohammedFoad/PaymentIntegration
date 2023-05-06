import axios from 'axios';
import OrderPaytaps from '../../Interfaces/PaytapsInterfaces/OrderPayTaps';
import UserPaytaps from "../../Interfaces/PaytapsInterfaces/UsersPaytaps"
import ShippingPaytaps from '../../Interfaces/PaytapsInterfaces/ShippingPaytaps';
class PayTaps
{
    
    profile_id:number;
    tran_type:string;
    tran_class:string;
    cart_id:string;
    cart_currency:string;
    cart_amount:number;
    cart_description:string;
    customer_details:UserPaytaps;
    shipping_details:ShippingPaytaps;
    paypage_lang:string="en";
    callback:string="";
    retrun:string="";

    constructor(orderpayload:OrderPaytaps) 
    {
        this.profile_id = orderpayload.profile_id;
        this.tran_type=orderpayload.tran_type;
        this.tran_class=orderpayload.tran_class;
        this.cart_id=orderpayload.cart_id;
        this.cart_currency=orderpayload.cart_currency;
        this.cart_amount=orderpayload.cart_amount;
        this.cart_description=orderpayload.cart_description;
        this.customer_details=orderpayload.customer_details;
        this.shipping_details=orderpayload.shipping_details; 
        this.paypage_lang=orderpayload.paypage_lang;
        this.callback=orderpayload.callback;
        this.retrun=orderpayload.return;

    }
    
    


    getOrderPayload():object
    {
        return{ 
    profile_id:this.profile_id ,
    tran_type: this.tran_type,
    tran_class: this.tran_class,
    cart_id: this.cart_id,
    cart_currency: this.cart_currency,
    cart_amount:this.cart_amount,
    cart_description: this.cart_description,
    paypage_lang: this.paypage_lang,
    customer_details:this.customer_details ,
    shipping_details:this.shipping_details,
    callback: this.callback,
    return: this.retrun
}
        }
    
    createOrderLink() {
        const orderPayload = this.getOrderPayload();
        
        
        axios.post("https://secure-egypt.paytabs.com/payment/request",orderPayload,{headers:{"authorization":""}})
          .then((response) => {
            console.log("this is response in charge request");
            console.log(response.data);
          })
          .catch((error) => {
            console.log("Error fatal");
            
            console.log(error.response.data);
          });
      }


      QueryTransactionByCartID()
      {
        console.log(this.profile_id);
        console.log(this.cart_id);
        axios.post("https://secure-egypt.paytabs.com/payment/query",{profile_id:this.profile_id,cart_id:this.cart_id},{headers:{"authorization":""}}) .then((response) => {
            console.log("this is response in charge request");
            console.log(response.data);
          })
          .catch((error) => {
            console.log("Error fatal");
            
            console.log(error.response.data);
          });
      }
      QueryTransactionByTranRef(tran_ref:string)
      {
        console.log(this.profile_id);
        console.log(this.cart_id);
        axios.post("https://secure-egypt.paytabs.com/payment/query",{profile_id:this.profile_id,tran_ref:tran_ref},{headers:{"authorization":"SHJN2JJKNK-JD26ZDJBD6-D6DKMM2LTK"}}) .then((response) => {
            console.log("this is response in charge request");
            console.log(response.data);
          })
          .catch((error) => {
            console.log("Error fatal");
            
            console.log(error.response.data);
          });
      }



      /* cancel payments method */

      RefundPayment(tran_ref:string)
      {
        console.log(this.profile_id);
        console.log(this.cart_id);
        axios.post("https://secure-egypt.paytabs.com/payment/request",{profile_id:this.profile_id,tran_type:"refund",tran_class:this.tran_class,cart_id:this.cart_id
        ,cart_currency:this.cart_currency,cart_amount:this.cart_amount,cart_description:this.cart_description,tran_ref:tran_ref
    },{headers:{"authorization":""}}) .then((response) => {
            console.log("this is response in charge request");
            console.log(response.data);
          })
          .catch((error) => {
            console.log("Error fatal");
            
            console.log(error.response.data);
          });
      }


      VoidPayment(tran_ref:string)
      {
        console.log(this.profile_id);
        console.log(this.cart_id);
        axios.post("https://secure-egypt.paytabs.com/payment/request",{profile_id:this.profile_id,tran_type:"void",tran_class:this.tran_class,cart_id:this.cart_id
        ,cart_currency:this.cart_currency,cart_amount:this.cart_amount,cart_description:this.cart_description,tran_ref:tran_ref
    },{headers:{"authorization":""}}) .then((response) => {
            console.log("this is response in charge request");
            console.log(response.data);
          })
          .catch((error) => {
            console.log("Error fatal");
            
            console.log(error.response.data);
          });
      }


      




      




}





export default PayTaps