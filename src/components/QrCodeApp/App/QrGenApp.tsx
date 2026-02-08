import { useState } from "preact/hooks";
import CardQrType from "../Cards/QrTypes/CardQrType";
import CardContentInput from "../Cards/ContentInputCard/CardContentInput";
import CardQrPreview from "../Cards/QrPreview/CardQrPreview";
import { QrTypeKey, type QrDataUnion } from "../../../domain/types/qr";

export default function QrGenApp() {
  const [type, setType] = useState<QrTypeKey | null>(null);
  const [data, setData] = useState<QrDataUnion | null>(null);

  return (
    <>
      <CardQrType selected={type} onSelect={setType} />
      <CardContentInput selectedType={type} onChange={setData} />
      <CardQrPreview type={type} data={data} />
    </>
  );
}
