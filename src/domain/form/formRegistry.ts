import { QrTypeKey } from "../types/qr";
import TextForm from "../../components/forms/text/TextForm";
import UrlForm from "../../components/forms/url/UrlForm";
import WifiForm from "../../components/forms/wifi/WifiForm";
import VCardForm from "../../components/forms/vCardForm/VCardForm";
import PaymentForm from "../../components/forms/paymentForm/PaymentForm";
import EventForm from "../../components/forms/eventForm/EventForm";

export const formRegistry = {
  [QrTypeKey.PlainText]: TextForm,
  [QrTypeKey.Url]: UrlForm,
  [QrTypeKey.Wifi]: WifiForm,
  [QrTypeKey.VCard]: VCardForm,
  [QrTypeKey.Payment]: PaymentForm,
  [QrTypeKey.Event]: EventForm,
};
