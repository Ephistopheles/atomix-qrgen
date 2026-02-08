export enum QrTypeKey {
  PlainText = "PT",
  Url = "UL",
  Wifi = "WF",
  VCard = "VC",
  Payment = "PB",
  Event = "EV",
}

export interface TextQrData {
  text: string;
}

export interface UrlQrData {
  url: string;
}

export interface WifiQrData {
  ssid: string;
  password: string;
  security: "WPA" | "WEP" | "nopass";
}

export interface VCardQrData {
  firstName: string;
  lastName: string;
  phone: string;
  mobile: string;
  email: string;
  organization: string;
  title: string;
  website: string;
  address: string;
  note: string;
}

export interface PaymentQrData {
  method: string;
  name: string;
  account: string;
  bank: string;
  amount: number;
  reference: string;
}

export interface EventQrData {
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
}

export type QrDataUnion =
  | TextQrData
  | UrlQrData
  | WifiQrData
  | VCardQrData
  | PaymentQrData
  | EventQrData;

export type QrTypeDataMap = {
  [QrTypeKey.PlainText]: TextQrData;
  [QrTypeKey.Url]: UrlQrData;
  [QrTypeKey.Wifi]: WifiQrData;
  [QrTypeKey.VCard]: VCardQrData;
  [QrTypeKey.Payment]: PaymentQrData;
  [QrTypeKey.Event]: EventQrData;
};
