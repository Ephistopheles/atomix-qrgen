import { useState } from "preact/hooks";
import CardQrType from "../Cards/QrTypes/CardQrType";
import CardContentInput from "../Cards/ContentInputCard/CardContentInput";
import { QrTypeKey } from "../../../domain/qr/qr";

export default function QrGenApp() {
  const [type, setType] = useState<QrTypeKey | null>(null);
  const [data, setData] = useState<any>(null);

  return (
    <>
      <CardQrType selected={type} onSelect={setType} />
      <CardContentInput selectedType={type} onChange={setData} />
    </>
  );
}
