import OrderFawry from "../../Interfaces/FawryInterfaces/OrderFawry";
import OrderPaytaps from "../../Interfaces/PaytapsInterfaces/OrderPayTaps";
import Fawry from "./Fawry";
import Paytaps from "./Paytaps"

function CreateOrder(provider: string, OrderFawryPayload?: OrderFawry|any,OrderPaytapsPayload?:OrderPaytaps|any) {
  switch (provider) {
    case "fawry":
      return new Fawry(OrderFawryPayload).createOrderLink();
    case "PayTaps"||"paytaps"||"Paytaps":
      return new Paytaps(OrderPaytapsPayload).createOrderLink()
    default:
      break;
  }
}

function RefundOrder(provider: string,tran_ref:string,refundAmount:number,referenceNumber:string,reason:string, OrderFawryPayload?: OrderFawry|any,OrderPaytapsPayload?:OrderPaytaps|any) {
  switch (provider) {
    case "fawry":
      return new Fawry(OrderFawryPayload).refundOrder(referenceNumber,refundAmount,reason);
    case "PayTaps"||"paytaps"||"Paytaps":
      return new Paytaps(OrderPaytapsPayload).RefundPayment(tran_ref)
    default:
      break;
  }
}

function GetStatusOrder(provider: string,tran_ref:string, OrderFawryPayload?: OrderFawry|any,OrderPaytapsPayload?:OrderPaytaps|any) {
  switch (provider) {
    case "fawry":
      return new Fawry(OrderFawryPayload).getOrderStatus();
    case "PayTaps"||"paytaps"||"Paytaps":
      return new Paytaps(OrderPaytapsPayload).QueryTransactionByCartID()
    default:
      break;
  }
}

const paymentServices = {
  CreateOrder,  
  RefundOrder,
  GetStatusOrder
};
export default paymentServices;
