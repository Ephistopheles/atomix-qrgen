import { useEffect, useState } from "preact/hooks";
import { QrTypeKey, type QrDataUnion } from "../../../../domain/types/qr";
import { formRegistry } from "../../../../domain/form/formRegistry";

interface CardContentInputProps {
  selectedType: QrTypeKey | null;
  onChange?: (data: QrDataUnion | null) => void;
}

export default function CardContentInput({
  selectedType,
  onChange,
}: CardContentInputProps) {
  const Form = selectedType ? formRegistry[selectedType] : null;
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (selectedType) {
      setKey((prev) => prev + 1);
      onChange?.(null);
    }
  }, [selectedType]);

  return (
    <section class="space-y-6">
      <article class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Contenido</h2>
        <div class="space-y-4">
          {!Form && (
            <div class="text-gray-500 text-sm">Selecciona un tipo de QR</div>
          )}

          {Form && <Form key={key} onChange={onChange} />}
        </div>
      </article>
    </section>
  );
}
