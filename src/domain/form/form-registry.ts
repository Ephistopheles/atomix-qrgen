import { QrTypeKey } from "../types/qr";
import TextForm from "../../components/forms/text/text-form";
import UrlForm from "../../components/forms/url/url-form";
import WifiForm from "../../components/forms/wifi/wifi-form";
import VCardForm from "../../components/forms/v-card-form/v-card-form";
import PaymentForm from "../../components/forms/payment-form/payment-form";
import EventForm from "../../components/forms/event-form/event-form";

export const formRegistry = {
  [QrTypeKey.PlainText]: TextForm,
  [QrTypeKey.Url]: UrlForm,
  [QrTypeKey.Wifi]: WifiForm,
  [QrTypeKey.VCard]: VCardForm,
  [QrTypeKey.Payment]: PaymentForm,
  [QrTypeKey.Event]: EventForm,
};
