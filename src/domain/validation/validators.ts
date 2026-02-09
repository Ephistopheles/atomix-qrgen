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

const isValidUrl = (url: string): boolean => {
  try {
    const urlStr = url.trim();
    const withProtocol = urlStr.startsWith("http://") || urlStr.startsWith("https://") 
      ? urlStr 
      : `https://${urlStr}`;
    new URL(withProtocol);
    return true;
  } catch {
    return false;
  }
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phone.trim().length >= 7 && phoneRegex.test(phone.trim());
};

export const validateTextQr = (data: TextQrData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.text || data.text.trim() === "") {
    errors.text = "El texto es obligatorio";
  } else if (data.text.trim().length < 1) {
    errors.text = "El texto debe tener al menos 1 carácter";
  } else if (data.text.length > 2953) {
    errors.text = "El texto es demasiado largo (máximo 2953 caracteres)";
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
  } else if (!isValidUrl(data.url)) {
    errors.url = "La URL no es válida. Ej: https://ejemplo.com o ejemplo.com";
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
  } else if (data.ssid.trim().length > 32) {
    errors.ssid = "El SSID no puede tener más de 32 caracteres";
  }

  if (data.security !== "nopass") {
    if (!data.password || data.password.trim() === "") {
      errors.password = "La contraseña es obligatoria para redes con seguridad";
    } else if (data.security === "WEP" && data.password.length < 5) {
      errors.password = "La contraseña WEP debe tener al menos 5 caracteres";
    } else if (data.security === "WPA" && data.password.length < 8) {
      errors.password = "La contraseña WPA/WPA2 debe tener al menos 8 caracteres";
    } else if (data.password.length > 63) {
      errors.password = "La contraseña no puede tener más de 63 caracteres";
    }
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

  if (data.phone && data.phone.trim() !== "" && !isValidPhone(data.phone)) {
    errors.phone = "Número de teléfono inválido";
  }

  if (data.mobile && data.mobile.trim() !== "" && !isValidPhone(data.mobile)) {
    errors.mobile = "Número de móvil inválido";
  }

  if (data.email && data.email.trim() !== "" && !isValidEmail(data.email)) {
    errors.email = "Email inválido";
  }

  if (data.website && data.website.trim() !== "" && !isValidUrl(data.website)) {
    errors.website = "Sitio web inválido";
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
  } else if (data.method === "crypto") {
    if (data.account.trim().length < 26) {
      errors.account = "Dirección de criptomoneda inválida (muy corta)";
    }
  } else {
    if (!/^[\d\-\s]+$/.test(data.account.trim())) {
      errors.account = "Número de cuenta inválido (solo números, guiones y espacios)";
    }
  }

  if (!data.bank || data.bank.trim() === "") {
    errors.bank = "El banco o plataforma es obligatorio";
  }

  if (data.amount <= 0) {
    errors.amount = "El monto debe ser mayor a 0";
  } else if (isNaN(data.amount)) {
    errors.amount = "El monto debe ser un número válido";
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

  if (data.start && data.end) {
    const startDate = new Date(data.start);
    const endDate = new Date(data.end);

    if (isNaN(startDate.getTime())) {
      errors.start = "Fecha de inicio inválida";
    }

    if (isNaN(endDate.getTime())) {
      errors.end = "Fecha de fin inválida";
    }

    if (startDate.getTime() >= endDate.getTime()) {
      errors.end = "La fecha de fin debe ser posterior a la de inicio";
    }
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
