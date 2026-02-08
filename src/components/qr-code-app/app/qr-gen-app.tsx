import { useState } from "preact/hooks";
import CardQrType from "../cards/qr-types/card-qr-type";
import CardContentInput from "../cards/content-input-card/card-content-input";
import CardQrPreview from "../cards/qr-preview/card-qr-preview";
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
