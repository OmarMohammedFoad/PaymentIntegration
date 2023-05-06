import data from "../../Interfaces/FawryInterfaces/Chargeitems";

interface PaymentInterface {
  merchantCode?: string|number;
  orderReferenceCode?: string;
  PRODUCTION_BASE_URL?: string;
  SANDBOX_BASE_URL?: string;
  returnUrl?: string;
  langauge?: string;
  paymentExpiry?: string;
  items?: data[];
  isSandbox?: boolean;

  getBaseUrl?(): string;
  //   authCaptureModePayment(): boolean | string;
  //   getSiganture(): string;
  //   Choose_payement(): string;
  //   buildChargeRequest(): object;
  //   sendChargeRequest(): void;
  //   getSignatureToGetStatus(): string;
  //   getStatus(): Promise<void>;
  //   getsignatureForCancel(): string;
  //   RefundPaidOrder(): void;
}

export default PaymentInterface;
