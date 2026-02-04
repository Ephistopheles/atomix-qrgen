import { useState } from "preact/hooks";
import CardQrType from "../Cards/QrTypes/CardQrType";
import CardContentInput from "../Cards/ContentInputCard/CardContentInput";
import { QrTypeKey } from "../../../domain/types/qr";

export default function QrGenApp() {
  const [type, setType] = useState<QrTypeKey | null>(null);
  const [data, setData] = useState<any>(null);

  console.log(data);
  

  return (
    <>
      <CardQrType selected={type} onSelect={setType} />
      <CardContentInput selectedType={type} onChange={setData} />
    </>
  );
}
