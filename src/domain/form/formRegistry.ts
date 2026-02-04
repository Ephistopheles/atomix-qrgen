import { QrTypeKey } from "../types/qr";
import WifiForm from "../../components/forms/wifi/WifiForm";


export const formRegistry = {
  // [QrTypeKey.PlainText]: TextForm,
  [QrTypeKey.Wifi]: WifiForm,
  // [QrTypeKey.VCard]: VCardForm,
  // [QrTypeKey.Payment]: PaymentForm,
  // [QrTypeKey.Event]: EventForm,
};