import { QrTypeKey } from "../types/qr";
import type {
  TextQrData,
  UrlQrData,
  WifiQrData,
  VCardQrData,
  PaymentQrData,
  EventQrData,
} from "../types/qr";

const encodeText = (data: TextQrData) => {
  return data.text.trim();
};

const encodeUrl = (data: UrlQrData) => {
  let url = data.url.trim();

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  return url;
};

const encodeWifi = (data: WifiQrData) => {
  return `WIFI:T:${data.security};S:${data.ssid};P:${data.password || ""};;`;
};

const encodeVCard = (data: VCardQrData) => {
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];

  if (data.firstName || data.lastName) {
    lines.push(`FN:${data.firstName} ${data.lastName}`.trim());
    lines.push(`N:${data.lastName};${data.firstName}`);
  }

  if (data.phone) lines.push(`TEL;TYPE=VOICE:${data.phone}`);
  if (data.mobile) lines.push(`TEL;TYPE=CELL:${data.mobile}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.organization) lines.push(`ORG:${data.organization}`);
  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.address) lines.push(`ADR:;;${data.address}`);
  if (data.note) lines.push(`NOTE:${data.note}`);

  lines.push("END:VCARD");

  return lines.join("\n");
};

const encodePayment = (data: PaymentQrData) => {
  if (data.method === "crypto") {
    return `${data.account}?amount=${data.amount}`;
  }

  const parts: string[] = [
    `account=${data.account}`,
    `name=${data.name}`,
    `bank=${data.bank}`,
    `amount=${data.amount}`,
  ];

  if (data.reference) {
    parts.push(`reference=${data.reference}`);
  }

  return parts.join("&");
};

const encodeEvent = (data: EventQrData) => {
  const lines: string[] = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT"];

  if (data.title) lines.push(`SUMMARY:${data.title}`);
  if (data.description) lines.push(`DESCRIPTION:${data.description}`);
  if (data.location) lines.push(`LOCATION:${data.location}`);

  const formatDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return "";
    return dateTimeStr.replace(/[-:]/g, "").replace(" ", "T");
  };

  if (data.start) lines.push(`DTSTART:${formatDateTime(data.start)}`);
  if (data.end) lines.push(`DTEND:${formatDateTime(data.end)}`);

  lines.push("END:VEVENT", "END:VCALENDAR");

  return lines.join("\n");
};

export const encodeQrData = (
  type: QrTypeKey,
  data:
    | TextQrData
    | UrlQrData
    | WifiQrData
    | VCardQrData
    | PaymentQrData
    | EventQrData,
) => {
  switch (type) {
    case QrTypeKey.PlainText:
      return encodeText(data as TextQrData);
    case QrTypeKey.Url:
      return encodeUrl(data as UrlQrData);
    case QrTypeKey.Wifi:
      return encodeWifi(data as WifiQrData);
    case QrTypeKey.VCard:
      return encodeVCard(data as VCardQrData);
    case QrTypeKey.Payment:
      return encodePayment(data as PaymentQrData);
    case QrTypeKey.Event:
      return encodeEvent(data as EventQrData);
    default:
      return "";
  }
};
