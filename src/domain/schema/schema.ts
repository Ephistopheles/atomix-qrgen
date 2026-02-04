import { QrTypeKey } from "../qr/qr";
import type { FormSchema } from "../form/form";

export const qrSchemas: Record<QrTypeKey, FormSchema> = {
  [QrTypeKey.PlainText]: {
    title: "Texto plano",
    fields: [
      {
        key: "text",
        label: "Texto",
        type: "textarea",
        placeholder: "Escribe lo que quieras",
        rules: [{ required: true, message: "El texto es obligatorio" }],
      },
    ],
  },

  [QrTypeKey.Url]: {
    title: "Enlace",
    fields: [
      {
        key: "url",
        label: "URL",
        type: "text",
        placeholder: "https://ejemplo.com",
        rules: [
          { required: true, message: "Ingresa una URL" },
          {
            pattern: /^https?:\/\/.+/i,
            message: "Debe ser una URL válida",
          },
        ],
      },
    ],
  },

  [QrTypeKey.Wifi]: {
    title: "Wi-Fi",
    fields: [
      {
        key: "ssid",
        label: "SSID",
        type: "text",
        placeholder: "Nombre de la red",
        rules: [{ required: true, message: "Ingresa el SSID" }],
      },
      {
        key: "password",
        label: "Contraseña",
        type: "password",
        placeholder: "Contraseña",
        rules: [{ required: true, message: "Ingresa la contraseña" }],
      },
      {
        key: "security",
        label: "Tipo de seguridad",
        type: "select",
        options: [
          { value: "WPA", label: "WPA / WPA2" },
          { value: "WEP", label: "WEP" },
          { value: "nopass", label: "Ninguna" },
        ],
        rules: [{ required: true, message: "Selecciona un tipo de seguridad" }],
      },
    ],
  },

  [QrTypeKey.VCard]: {
    title: "Contacto",
    fields: [
      {
        key: "name",
        label: "Nombre",
        type: "text",
        rules: [{ required: true, message: "Ingresa el nombre" }],
      },
      {
        key: "phone",
        label: "Teléfono",
        type: "text",
        rules: [{ required: true, message: "Ingresa el teléfono" }],
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        rules: [
          { required: true, message: "Ingresa el email" },
          {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email inválido",
          },
        ],
      },
    ],
  },

  [QrTypeKey.Payment]: {
    title: "Pago",
    fields: [
      {
        key: "bank",
        label: "Banco",
        type: "text",
        rules: [{ required: true, message: "Ingresa el banco" }],
      },
      {
        key: "account",
        label: "Número de cuenta",
        type: "text",
        rules: [{ required: true, message: "Ingresa la cuenta" }],
      },
      {
        key: "amount",
        label: "Monto (opcional)",
        type: "number",
      },
    ],
  },

  [QrTypeKey.Event]: {
    title: "Evento",
    fields: [
      {
        key: "title",
        label: "Título",
        type: "text",
        rules: [{ required: true, message: "Ingresa el título" }],
      },
      {
        key: "location",
        label: "Ubicación",
        type: "text",
      },
      {
        key: "start",
        label: "Fecha de inicio",
        type: "date",
        rules: [{ required: true, message: "Selecciona la fecha" }],
      },
      {
        key: "end",
        label: "Fecha de fin",
        type: "date",
        rules: [{ required: true, message: "Selecciona la fecha" }],
      },
    ],
  },
};
