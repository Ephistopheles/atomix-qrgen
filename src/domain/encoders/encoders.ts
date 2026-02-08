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
  const password = data.security === "nopass" ? "" : data.password.trim();
  return `WIFI:T:${data.security};S:${data.ssid.trim()};P:${password};;`;
};

const encodeVCard = (data: VCardQrData) => {
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];

  const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
  lines.push(`FN:${fullName}`);
  lines.push(`N:${data.lastName.trim()};${data.firstName.trim()};;;`);

  if (data.phone?.trim()) lines.push(`TEL;TYPE=VOICE:${data.phone.trim()}`);
  if (data.mobile?.trim()) lines.push(`TEL;TYPE=CELL:${data.mobile.trim()}`);
  if (data.email?.trim()) lines.push(`EMAIL:${data.email.trim()}`);
  if (data.organization?.trim()) lines.push(`ORG:${data.organization.trim()}`);
  if (data.title?.trim()) lines.push(`TITLE:${data.title.trim()}`);
  if (data.website?.trim()) {
    let website = data.website.trim();
    if (!website.startsWith("http://") && !website.startsWith("https://")) {
      website = "https://" + website;
    }
    lines.push(`URL:${website}`);
  }
  if (data.address?.trim()) lines.push(`ADR:;;${data.address.trim()};;;`);
  if (data.note?.trim()) lines.push(`NOTE:${data.note.trim()}`);

  lines.push("END:VCARD");

  return lines.join("\n");
};

const encodePayment = (data: PaymentQrData) => {
  if (data.method === "crypto") {
    return `${data.account.trim()}?amount=${data.amount}`;
  }

  const parts: string[] = [
    `account=${data.account.trim()}`,
    `name=${data.name.trim()}`,
    `bank=${data.bank.trim()}`,
    `amount=${data.amount}`,
  ];

  if (data.reference?.trim()) {
    parts.push(`reference=${data.reference.trim()}`);
  }

  return parts.join("&");
};

const encodeEvent = (data: EventQrData) => {
  const lines: string[] = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT"];

  lines.push(`SUMMARY:${data.title.trim()}`);
  
  if (data.description?.trim()) {
    lines.push(`DESCRIPTION:${data.description.trim()}`);
  }
  
  lines.push(`LOCATION:${data.location.trim()}`);

  const formatDateTime = (dateTimeStr: string): string => {
    return dateTimeStr.replace(/[-:]/g, "").replace(" ", "T");
  };

  lines.push(`DTSTART:${formatDateTime(data.start)}`);
  lines.push(`DTEND:${formatDateTime(data.end)}`);

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
