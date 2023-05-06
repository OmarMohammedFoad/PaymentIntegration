
import UserPaytaps from "../../Interfaces/PaytapsInterfaces/UsersPaytaps"
import ShippingDetails from '../PaytapsInterfaces/ShippingPaytaps';

interface OrderPaytaps {
  profile_id: number;
  tran_type: string;
  tran_class: string;
  cart_id:string;
  cart_currency:string;
  cart_amount:number;
  cart_description:string;
  customer_details: UserPaytaps;
  shipping_details:ShippingDetails;
  paypage_lang:string;
  callback:string;
  return:string;

  
}

export default OrderPaytaps;
