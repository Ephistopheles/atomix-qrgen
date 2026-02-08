import { QrTypeKey } from "../types/qr";
import type {
  TextQrData,
  UrlQrData,
  WifiQrData,
  VCardQrData,
  PaymentQrData,
  EventQrData
} from "../types/qr";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateTextQr = (data: TextQrData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.text || data.text.trim() === "") {
    errors.text = "El texto es obligatorio";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateUrlQr = (data: UrlQrData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.url || data.url.trim() === "") {
    errors.url = "La URL es obligatoria";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateWifiQr = (data: WifiQrData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.ssid || data.ssid.trim() === "") {
    errors.ssid = "El SSID es obligatorio";
  }

  if (
    data.security !== "nopass" &&
    (!data.password || data.password.trim() === "")
  ) {
    errors.password = "La contraseña es obligatoria para redes con seguridad";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateVCardQr = (data: VCardQrData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.firstName || data.firstName.trim() === "") {
    errors.firstName = "El nombre es obligatorio";
  }

  if (!data.lastName || data.lastName.trim() === "") {
    errors.lastName = "El apellido es obligatorio";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validatePaymentQr = (data: PaymentQrData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.method || data.method.trim() === "") {
    errors.method = "El método de pago es obligatorio";
  }

  if (!data.name || data.name.trim() === "") {
    errors.name = "El nombre del destinatario es obligatorio";
  }

  if (!data.account || data.account.trim() === "") {
    errors.account = "La cuenta o dirección es obligatoria";
  }

  if (!data.bank || data.bank.trim() === "") {
    errors.bank = "El banco o plataforma es obligatorio";
  }

  if (data.amount <= 0) {
    errors.amount = "El monto debe ser mayor a 0";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateEventQr = (data: EventQrData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "El título es obligatorio";
  }

  if (!data.location || data.location.trim() === "") {
    errors.location = "La ubicación es obligatoria";
  }

  if (!data.start || data.start.trim() === "") {
    errors.start = "La fecha de inicio es obligatoria";
  }

  if (!data.end || data.end.trim() === "") {
    errors.end = "La fecha de fin es obligatoria";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateQrData = (
  type: QrTypeKey,
  data:
    | TextQrData
    | UrlQrData
    | WifiQrData
    | VCardQrData
    | PaymentQrData
    | EventQrData
    | null,
): ValidationResult => {
  if (!data) {
    return { isValid: false, errors: {} };
  }

  switch (type) {
    case QrTypeKey.PlainText:
      return validateTextQr(data as TextQrData);
    case QrTypeKey.Url:
      return validateUrlQr(data as UrlQrData);
    case QrTypeKey.Wifi:
      return validateWifiQr(data as WifiQrData);
    case QrTypeKey.VCard:
      return validateVCardQr(data as VCardQrData);
    case QrTypeKey.Payment:
      return validatePaymentQr(data as PaymentQrData);
    case QrTypeKey.Event:
      return validateEventQr(data as EventQrData);
    default:
      return { isValid: false, errors: {} };
  }
};
