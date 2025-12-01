"use client";

import { FC, useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  QRCode,
  Row,
  Select,
  TimePicker,
} from "antd";
import styles from "@/styles/qrCodeGenerator.module.css";

const typesOfQr = [
  { value: "PT", label: "Texto plano" },
  { value: "UL", label: "URL / link" },
  { value: "WF", label: "Wi-Fi" },
  { value: "VC", label: "vCard / Contacto" },
  { value: "PB", label: "Pago / Banco" },
  { value: "EC", label: "Evento / Calendar" },
];

const QrCodeGenerator: FC = () => {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [qrValue, setQrValue] = useState<string>("");

  const handleGenerate = async () => {
    try {
      const values = await form.validateFields();
      let valueToEncode = "";

      switch (selectedType) {
        case "PT":
          valueToEncode = values.text;
          break;
        case "UL":
          valueToEncode = values.url;
          break;
        case "WF":
          valueToEncode = `WIFI:T:${values.security};S:${values.ssid};P:${values.password};;`;
          break;
        case "VC":
          valueToEncode = `BEGIN:VCARD\nFN:${values.name}\nTEL:${values.tel}\nEMAIL:${values.email}\nORG:${values.company}\nTITLE:${values.title}\nEND:VCARD`;
          break;
        case "PB":
          valueToEncode = `Banco: ${values.bank}\nCuenta: ${values.account}\nNúmero: ${values.number}`;
          break;
        case "EC":
          valueToEncode = `BEGIN:VEVENT\nSUMMARY:${
            values.title
          }\nDTSTART:${values.date.format("YYYYMMDD")}T${values.time.format(
            "HHmmss"
          )}\nLOCATION:${values.location}\nDESCRIPTION:${
            values.description
          }\nEND:VEVENT`;
          break;
      }

      setQrValue(valueToEncode);
    } catch (err) {
      console.log("Error validando formulario:", err);
    }
  };

  return (
    <Row className={styles.rowContainer} justify="center" align="middle">
      <Col xs={22} sm={20} md={16} lg={12}>
        <Card className={styles.cardContainer}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form form={form} layout="vertical">
                <Form.Item
                  label="Tipo de QR"
                  name="typeQr"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={typesOfQr}
                    onChange={(value) => {
                      setSelectedType(value);
                    }}
                    placeholder="Selecciona el tipo de QR"
                  />
                </Form.Item>

                {selectedType && (
                  <Form.Item>
                    <Button type="primary" onClick={handleGenerate} block>
                      Generar QR
                    </Button>
                  </Form.Item>
                )}

                {/* Texto plano */}
                {selectedType === "PT" && (
                  <Form.Item
                    label="Texto"
                    name="text"
                    rules={[{ required: true, message: "Ingresa un texto" }]}
                  >
                    <Input placeholder="Escribe algo..." />
                  </Form.Item>
                )}

                {/* URL */}
                {selectedType === "UL" && (
                  <Form.Item
                    label="URL"
                    name="url"
                    rules={[
                      {
                        required: true,
                        type: "url",
                        message: "Ingresa una URL válida",
                      },
                    ]}
                  >
                    <Input placeholder="https://ejemplo.com" />
                  </Form.Item>
                )}

                {/* Wi-Fi */}
                {selectedType === "WF" && (
                  <>
                    <Form.Item
                      label="SSID"
                      name="ssid"
                      rules={[{ required: true, message: "Ingresa el SSID" }]}
                    >
                      <Input placeholder="Nombre de la red" />
                    </Form.Item>
                    <Form.Item
                      label="Contraseña"
                      name="password"
                      rules={[
                        { required: true, message: "Ingresa la contraseña" },
                      ]}
                    >
                      <Input.Password placeholder="Contraseña" />
                    </Form.Item>
                    <Form.Item
                      label="Tipo de seguridad"
                      name="security"
                      rules={[{ required: true }]}
                    >
                      <Select
                        options={[
                          { value: "WPA", label: "WPA/WPA2" },
                          { value: "WEP", label: "WEP" },
                          { value: "nopass", label: "Ninguna" },
                        ]}
                      />
                    </Form.Item>
                  </>
                )}

                {/* vCard / Contacto */}
                {selectedType === "VC" && (
                  <>
                    <Form.Item
                      label="Nombre"
                      name="name"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Nombre completo" />
                    </Form.Item>
                    <Form.Item
                      label="Teléfono"
                      name="tel"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="+57 300 1234567" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input placeholder="correo@ejemplo.com" />
                    </Form.Item>
                    <Form.Item label="Empresa" name="company">
                      <Input placeholder="Empresa" />
                    </Form.Item>
                    <Form.Item label="Cargo" name="title">
                      <Input placeholder="Cargo" />
                    </Form.Item>
                  </>
                )}

                {/* Pago / Banco */}
                {selectedType === "PB" && (
                  <>
                    <Form.Item
                      label="Banco"
                      name="bank"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Nombre del banco" />
                    </Form.Item>
                    <Form.Item
                      label="Tipo de cuenta"
                      name="account"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Cuenta corriente / Ahorros" />
                    </Form.Item>
                    <Form.Item
                      label="Número"
                      name="number"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Número de cuenta o QR" />
                    </Form.Item>
                  </>
                )}

                {/* Evento / Calendar */}
                {selectedType === "EC" && (
                  <>
                    <Form.Item
                      label="Título"
                      name="title"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Nombre del evento" />
                    </Form.Item>
                    <Form.Item
                      label="Fecha"
                      name="date"
                      rules={[{ required: true }]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      label="Hora"
                      name="time"
                      rules={[{ required: true }]}
                    >
                      <TimePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item label="Ubicación" name="location">
                      <Input placeholder="Lugar del evento" />
                    </Form.Item>
                    <Form.Item label="Descripción" name="description">
                      <Input.TextArea placeholder="Descripción breve" />
                    </Form.Item>
                  </>
                )}
              </Form>
            </Col>
            <Col span={24}>
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "0.75rem",
                  border: "1px solid #000000",
                  borderRadius: "0.5rem",
                  backgroundColor: "#f9fafb",
                  minHeight: 250, // mismo o un poco más que el QR
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {qrValue ? <QRCode value={qrValue} size={200} /> : null}
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default QrCodeGenerator;
